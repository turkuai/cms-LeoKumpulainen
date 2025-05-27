<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php'; // Make sure this sets up a valid $pdo object

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT title FROM site_meta WHERE id = 1");
    $row = $stmt->fetch();

    if ($row) {
        echo json_encode(['success' => true, 'title' => $row['title']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Title not found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
