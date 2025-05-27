<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || 
    !isset($_POST['title'], $_POST['content'], $_POST['image_url'])) {
    echo json_encode(['success' => false, 'message' => 'Missing data']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO articles (title, content, image_url) VALUES (?, ?, ?)");
    $stmt->execute([$_POST['title'], $_POST['content'], $_POST['image_url']]);
    $id = $pdo->lastInsertId();
    echo json_encode(['success' => true, 'id' => $id]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
