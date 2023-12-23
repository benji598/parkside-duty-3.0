<?php

function deleteSubUserFromDuty($conn, $sub_user_id, $duty_id) {
    $stmt = $conn->prepare("DELETE FROM sub_user_duty_assignment WHERE sub_user_id = ? AND duty_id = ?");
    $stmt->bind_param("ii", $sub_user_id, $duty_id);
    $stmt->execute();
    $deleted = $stmt->affected_rows;
    $stmt->close();
    return $deleted;
}

function editSubUserDuty($conn, $sub_user_id, $duty_id, $new_duty_id) {
    $stmt = $conn->prepare("UPDATE sub_user_duty_assignment SET duty_id = ? WHERE sub_user_id = ? AND duty_id = ?");
    $stmt->bind_param("iii", $new_duty_id, $sub_user_id, $duty_id);
    $stmt->execute();
    $updated = $stmt->affected_rows;
    $stmt->close();
    return $updated;
}

function addSubUserToDuty($conn, $sub_user_id, $duty_id) {
    $stmt = $conn->prepare("INSERT INTO sub_user_duty_assignment (sub_user_id, duty_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $sub_user_id, $duty_id);
    $stmt->execute();
    $inserted = $stmt->affected_rows;
    $stmt->close();
    return $inserted;
}
