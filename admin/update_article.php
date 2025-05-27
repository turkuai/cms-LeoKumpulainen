<?php
require_once 'db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['id'])) {
    echo json_encode(['success' => false, 'message' => 'Missing ID']);
    exit;
}

$id = (int) $_POST['id'];
$fields = [];

if (isset($_POST['title'])) $fields['title'] = $_POST['title'];
if (isset($_POST['content'])) $fields['content'] = $_POST['content'];
if (isset($_POST['image_url'])) $fields['image_url'] = $_POST['image_url'];

if (empty($fields)) {
    echo json_encode(['success' => false, 'message' => 'No fields to update']);
    exit;
}

try {
    $sets = [];
    $params = [];
    foreach ($fields as $key => $val) {
        $sets[] = "$key = :$key";
        $params[$key] = $val;
    }
    $params['id'] = $id;

    $sql = "UPDATE articles SET " . implode(', ', $sets) . " WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
