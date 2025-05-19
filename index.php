<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>StoneHenge</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Header -->
  <header>
    <!-- Non-editable Title -->
    <h1 id="pageTitle"><?php echo $pageTitle; ?></h1>
    <p id="pageDescription"><?php echo $pageDescription; ?></p>
  </header>


  <hr>

  <!-- Main Content -->
  <main>
    <section class="articles" id="articleSection">
      <!-- Articles will be loaded here -->
    </section>
  </main>

  <hr>

  <!-- Footer -->
  <footer>
    <!-- Non-editable Footer -->
    <p id="footerText"><?php echo $footerText; ?></p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
