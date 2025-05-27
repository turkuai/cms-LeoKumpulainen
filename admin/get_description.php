<?php
header('Content-Type: application/json');
require_once 'db.php'; // make sure this path is correct relative to your file

echo json_encode getDesc();
