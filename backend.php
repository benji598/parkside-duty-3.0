<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Nyholm\Psr7\Factory\Psr17Factory;

require __DIR__ . '/vendor/autoload.php';
require 'db.php';

$psr17Factory = new Psr17Factory();
AppFactory::setResponseFactory($psr17Factory);
$app = AppFactory::create();

//Get Basic Sub User List
$app->get('/api/data', function (Request $request, Response $response, array $args) {
    global $conn;

    $result = $conn->query("SELECT * FROM sub_users");
    $data = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});

//Get Sub Users
$app->get('/api/sub-users/{dutyId}', function (Request $request, Response $response, array $args) {
    global $conn;
    $dutyId = $args['dutyId'];

    $stmt = $conn->prepare("
        SELECT su.id as sub_user_id, 
               su.firstname, 
               su.lastname, 
               su.phone,
               ccd_duty.setting_1 as duty_message,
               ccd_cover.setting_1 as cover_message,
               ccd_meeting1.setting_1 as meeting_1,
               ccd_meeting2.setting_1 as meeting_2
        FROM sub_user_duty_assignment as suda
        JOIN sub_users as su ON suda.sub_user_id = su.id
        CROSS JOIN (SELECT setting_1 FROM core_config_data WHERE name = 'duty_message') as ccd_duty
        CROSS JOIN (SELECT setting_1 FROM core_config_data WHERE name = 'cover_message') as ccd_cover
        CROSS JOIN (SELECT setting_1 FROM core_config_data WHERE name = 'meeting_1') as ccd_meeting1
        CROSS JOIN (SELECT setting_1 FROM core_config_data WHERE name = 'meeting_2') as ccd_meeting2
        WHERE suda.duty_id = ?
    ");

    $stmt->bind_param("i", $dutyId);
    $stmt->execute();
    $result = $stmt->get_result();
    $subUsers = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($subUsers));
    return $response->withHeader('Content-Type', 'application/json');
});

// Get Duty Types
$app->get('/api/duty-types', function (Request $request, Response $response, array $args) {
    global $conn;
    $result = $conn->query("SELECT * FROM duty_type");
    $dutyTypes = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($dutyTypes));
    return $response->withHeader('Content-Type', 'application/json');
});

// Get Duty Details (when you click a duty)
$app->get('/api/duty/{dutyId}', function (Request $request, Response $response, array $args) {
    global $conn;
    $dutyId = $args['dutyId'];
    $stmt = $conn->prepare("SELECT * FROM duty_type WHERE id = ?");
    $stmt->bind_param("i", $dutyId);
    $stmt->execute();
    $result = $stmt->get_result();
    $duty = $result->fetch_assoc();

    if (!$duty) {
        return $response->withStatus(404)->withHeader('Content-Type', 'application/json')->write(json_encode(['error' => 'Duty not found']));
    }

    $response->getBody()->write(json_encode($duty));
    return $response->withHeader('Content-Type', 'application/json');
});


// Fetch All Sub Users
$app->get('/api/sub-users', function (Request $request, Response $response, array $args) {
    global $conn;
    $query = "
        SELECT su.id, su.firstname, su.lastname, su.phone, GROUP_CONCAT(dt.name ORDER BY dt.name ASC SEPARATOR ', ') AS duties,
        GROUP_CONCAT(dt.id ORDER BY dt.name ASC SEPARATOR ',') AS duty_ids
        FROM sub_users su
        LEFT JOIN sub_user_duty_assignment suda ON su.id = suda.sub_user_id
        LEFT JOIN duty_type dt ON suda.duty_id = dt.id
        GROUP BY su.id
    ";
    $result = $conn->query($query);
    $subUsers = $result->fetch_all(MYSQLI_ASSOC);

    $response->getBody()->write(json_encode($subUsers));
    return $response->withHeader('Content-Type', 'application/json');
});

// Fetch Messages and Meetings
$app->get('/api/messages-meetings', function (Request $request, Response $response, array $args) {
    global $conn;
    $messagesAndMeetings = [];
    // Messages
    $queryMessages = "SELECT name, setting_1 FROM core_config_data WHERE name IN ('duty_message', 'cover_message')";
    $resultMessages = $conn->query($queryMessages);
    while ($row = $resultMessages->fetch_assoc()) {
        $messagesAndMeetings[$row['name']] = $row['setting_1'];
    }
    // Meetings
    $queryMeetings = "SELECT name, setting_1 FROM core_config_data WHERE name IN ('meeting_1', 'meeting_2')";
    $resultMeetings = $conn->query($queryMeetings);
    while ($row = $resultMeetings->fetch_assoc()) {
        $messagesAndMeetings[$row['name']] = $row['setting_1'];
    }

    $response->getBody()->write(json_encode($messagesAndMeetings));
    return $response->withHeader('Content-Type', 'application/json');
});

//admin update sub user
$app->post('/api/update-sub-user', function (Request $request, Response $response, array $args) {
    global $conn;

    // Parsing JSON body from the request
    $data = json_decode($request->getBody()->getContents(), true);

    $id = $data['id'] ?? null;
    $firstname = $data['firstname'] ?? null;
    $lastname = $data['lastname'] ?? null;
    $phone = $data['phone'] ?? null;
    $duties = $data['duties'] ?? [];

    if (!$id || !$firstname || !$lastname || !$phone) {
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json')->write(json_encode(['error' => 'Missing information']));
    }

    // Update the sub-user information
    $stmt = $conn->prepare("UPDATE sub_users SET firstname = ?, lastname = ?, phone = ? WHERE id = ?");
    $stmt->bind_param("sssi", $firstname, $lastname, $phone, $id);
    $stmt->execute();

    // Update duties if provided
    if (!empty ($duties)) {
        // First, clear existing duties
        $conn->query("DELETE FROM sub_user_duty_assignment WHERE sub_user_id = $id");

        // insert new duties
        foreach ($duties as $dutyId) {
            $stmt = $conn->prepare("INSERT INTO sub_user_duty_assignment (sub_user_id, duty_id) VALUES (?, ?)");
            $stmt->bind_param("ii", $id, $dutyId);
            $stmt->execute();
        }
    }

    $response->getBody()->write(json_encode(['success' => true]));
    return $response->withHeader('Content-Type', 'application/json');
});

// Delete sub user
$app->post('/api/delete-sub-user', function (Request $request, Response $response, array $args) {
    global $conn;

    // Parsing JSON body from the request
    $data = json_decode($request->getBody()->getContents(), true);

    $id = $data['id'] ?? null;

    if (!$id) {
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json')->write(json_encode(['error' => 'Missing sub-user ID']));
    }

    // Delete the sub-user
    $stmt = $conn->prepare("DELETE FROM sub_users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Optionally, also delete any related duty assignments
    $stmt = $conn->prepare("DELETE FROM sub_user_duty_assignment WHERE sub_user_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $response->getBody()->write(json_encode(['success' => true]));
    return $response->withHeader('Content-Type', 'application/json');
});




$app->run();
