<?php
header('Content-Type: application/json');
require_once 'db.php';  // Use your existing PDO connection

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_POST['description']) || trim($_POST['description']) === '') {
    echo json_encode(['success' => false, 'message' => 'Description is required']);
    exit;
}

$description = trim($_POST['description']);

try {
    $stmt = $pdo->prepare("UPDATE site_meta SET description = ? WHERE id = 1");
    $stmt->execute([$description]);

    echo json_encode(['success' => true, 'description' => $description]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
