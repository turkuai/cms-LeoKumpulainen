document.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  loadQuickLinks();
});

function loadArticles() {
  const container = document.getElementById("articleSection");

  fetch('http://localhost/bogdan-harjoitus/admin/get_articles.php')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        data.articles.forEach(({ title, content, image_url }) => {
          const article = document.createElement("div");
          article.className = "article";

          const h2 = document.createElement("h2");
          h2.textContent = title;

          const p = document.createElement("p");
          p.textContent = content;

          const img = document.createElement("img");
          img.src = image_url;
          img.alt = title;

          article.appendChild(h2);
          article.appendChild(p);
          if (image_url) article.appendChild(img);

          container.appendChild(article);
        });
      } else {
        container.innerHTML = "<p>Failed to load articles.</p>";
      }
    })
    .catch(() => {
      container.innerHTML = "<p>Network error loading articles.</p>";
    });
}

function loadQuickLinks() {
  const list = document.getElementById("quickLinksList");
  if (!list) return;

  fetch('http://localhost/bogdan-harjoitus/admin/get_quicklinks.php') // Fix this URL!
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        data.links.forEach(({ text, url }) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = url;
          a.textContent = text;
          a.target = "_blank";
          li.appendChild(a);
          list.appendChild(li);
        });
      } else {
        list.innerHTML = "<li>Failed to load quick links.</li>";
      }
    })
    .catch(() => {
      list.innerHTML = "<li>Quick links failed to load.</li>";
    });
}

