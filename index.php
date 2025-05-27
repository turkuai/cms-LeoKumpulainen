<?php

require_once 'admin/db.php'; // Make sure this sets up a valid $pdo object

$titleData = getTitle();
$descData = getDesc();
$footerData = getFooter();

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php echo htmlspecialchars($titleData['title'] ?? 'StoneHenge'); ?></title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1 id="pageTitle"><?php echo htmlspecialchars($titleData['title'] ?? '[Title not found]'); ?></h1>
    <p id="pageDescription"><?php echo htmlspecialchars($descData['description'] ?? '[Description not found]'); ?></p>
  </header>

  <hr>

  <main>
    <section class="articles" id="articleSection"></section>

    <section class="quick-links">
      <h2>Quick Links</h2>
      <ul id="quickLinksList"></ul>
    </section>
  </main>

  <hr>

  <footer>
    <p id="footerText"><?php echo htmlspecialchars($footerData['footer'] ?? '[Footer not found]'); ?></p>
  </footer>

  <script src="readonly.js"></script>
</body>
</html>
