<?php
require_once 'db.php';  // Include your PDO connection

try {
    // Fetch title + description
    $stmt = $pdo->prepare("SELECT title, description FROM site_meta WHERE id = 1 LIMIT 1");
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $title = isset($row['title']) ? htmlspecialchars($row['title']) : '[Title not found]';
    $description = isset($row['description']) ? htmlspecialchars($row['description']) : '[Description not found]';
} catch (Exception $e) {
    $title = '[Error: ' . htmlspecialchars($e->getMessage()) . ']';
    $description = '[Error: ' . htmlspecialchars($e->getMessage()) . ']';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>StoneHenge</title>
  <link rel="stylesheet" href="admin-style.css">
</head>
<body>

<header>
  <!-- Editable Title -->
  <h1 id="siteTitle"><?= $title ?></h1>
  <button id="editTitleBtn">Edit Title</button>

  <!-- Editable Description -->
  <p id="siteDescription"><?= $description ?></p>
  <button id="editDescriptionBtn">Edit Description</button>
</header>

<hr>

<main>
  <button id="addArticleBtn">Add Article</button>
  <div id="articlesContainer"></div>
</main>

<hr>

<footer>
  <p id="footerText"></p>
  <button id="editFooterBtn">Edit Footer</button>
</footer>

<div class="quick-links-editor">
  <h3>Links</h3>
  <ul id="quickLinksList"></ul>
  <button id="addQuickLinkBtn">Add Link</button>
</div>

<script src="admin.js"></script>
</body>
</html>
