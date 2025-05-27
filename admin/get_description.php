<?php
header('Content-Type: application/json');
require_once 'db.php'; // make sure this path is correct relative to your file

try {
    $stmt = $pdo->prepare("SELECT description FROM site_meta WHERE id = 1 LIMIT 1");
    $stmt->execute();
    $data = $stmt->fetch();

    if ($data) {
        echo json_encode(['success' => true, 'description' => $data['description']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Description not found']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'DB query failed']);
}
