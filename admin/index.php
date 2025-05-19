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
<h1 id="siteTitle">Your Website Title</h1>
<button id="editTitleBtn"> Edit Title</button>

<p id="siteDescription">A brief description of the website goes here.</p>
<button id="editDescriptionBtn"> Edit Description</button>

</header>

  <hr>

  <!-- Main Content -->
  <main>
  <button id="addArticleBtn">Add Article</button>
  <div id="articlesContainer"></div>
  </main>

  <hr>

<!-- === FOOTER SECTION === -->
<footer>
  <p id="footerText">Default footer text</p>
  <button id="editFooterBtn">Edit Footer</button>
</footer>

<!-- === QUICK LINKS === -->
<div class="quick-links-editor">
  <h3>Links</h3>
  <ul id="quickLinksList"></ul>
  <button id="addQuickLinkBtn"> Add Link</button>
</div>


  <script src="admin.js"></script>
</body>
</html>
