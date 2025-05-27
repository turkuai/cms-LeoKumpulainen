<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$text = trim($_POST['text'] ?? '');
$url = trim($_POST['url'] ?? '');

if ($text === '' || $url === '') {
    echo json_encode(['success' => false, 'message' => 'Missing text or URL']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO quick_links (text, url) VALUES (:text, :url)");
    $stmt->execute(['text' => $text, 'url' => $url]);
    $id = $pdo->lastInsertId();

    echo json_encode(['success' => true, 'id' => $id]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
