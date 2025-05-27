<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php'; // sets up $pdo
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_POST['title'])) {
    echo json_encode(['success' => false, 'message' => 'Title not provided']);
    exit;
}

$title = trim($_POST['title']);

try {
    $stmt = $pdo->prepare("UPDATE site_meta SET title = :title WHERE id = 1");
    $stmt->execute(['title' => $title]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
