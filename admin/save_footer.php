<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_POST['footer'])) {
    echo json_encode(['success' => false, 'message' => 'Footer text not provided']);
    exit;
}

$footer = trim($_POST['footer']);

try {
    $stmt = $pdo->prepare("UPDATE site_meta SET footer = :footer WHERE id = 1");
    $stmt->execute(['footer' => $footer]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
