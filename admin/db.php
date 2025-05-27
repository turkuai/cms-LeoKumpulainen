<?php
foreach (parse_ini_file('.env') as $key => $value) {
  $_ENV[$key] = $value;
}

$host = $_ENV['DB_HOST'];
$db   = $_ENV['DB_NAME'];              // Your database name
$user = $_ENV['DB_USERNAME'];              // Your confirmed MySQL username
$pass = $_ENV['DB_PASSWORD'];   // Replace with the actual password (keep private)
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Best practice
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>
