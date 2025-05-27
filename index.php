<?php
$titleData = json_decode(file_get_contents('http://localhost/bogdan-harjoitus/admin/get_title.php'), true);
$descData = json_decode(file_get_contents('http://localhost/bogdan-harjoitus/admin/get_description.php'), true);
$footerData = json_decode(file_get_contents('http://localhost/bogdan-harjoitus/admin/get_footer.php'), true);
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
