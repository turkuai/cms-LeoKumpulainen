<?php
require_once 'db.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT id, text, url FROM quick_links ORDER BY id ASC");
    $links = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'links' => $links]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

