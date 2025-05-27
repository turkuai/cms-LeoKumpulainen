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

function getTitle() {
    global $pdo;
    try {
        $stmt = $pdo->query("SELECT title FROM site_meta WHERE id = 1");
        $row = $stmt->fetch();

        if ($row) {
            return (['success' => true, 'title' => $row['title']]);
        } else {
            return (['success' => false, 'message' => 'Title not found']);
        }
    } catch (Exception $e) {
        return (['success' => false, 'message' => $e->getMessage()]);
    }
}

function getDesc() {
    global $pdo;
    try {
    $stmt = $pdo->prepare("SELECT description FROM site_meta WHERE id = 1 LIMIT 1");
    $stmt->execute();
    $data = $stmt->fetch();

    if ($data) {
        return (['success' => true, 'description' => $data['description']]);
    } else {
        return (['success' => false, 'message' => 'Description not found']);
    }
    } catch (PDOException $e) {
        return (['success' => false, 'message' => 'DB query failed']);
    }
}

function getFooter() {
    global $pdo;
    try {
    $stmt = $pdo->query("SELECT footer FROM site_meta WHERE id = 1");
    $row = $stmt->fetch();
    return (['success' => true, 'footer' => $row['footer'] ?? '']);
    } catch (Exception $e) {
        return (['success' => false, 'message' => $e->getMessage()]);
    }

}
?>
