<?php
require_once 'db.php';
header('Content-Type: application/json');

require_once 'db.php'; // Make sure this sets up a valid $pdo object

echo json_encode getFooter();