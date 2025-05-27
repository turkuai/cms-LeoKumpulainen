<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db.php'; // Make sure this sets up a valid $pdo object

header('Content-Type: application/json');

echo json_encode getTitle();
