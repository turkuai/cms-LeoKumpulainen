<?php
require_once 'db.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT footer FROM site_meta WHERE id = 1");
    $row = $stmt->fetch();
    echo json_encode(['success' => true, 'footer' => $row['footer'] ?? '']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
