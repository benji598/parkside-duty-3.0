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


$app->run();
