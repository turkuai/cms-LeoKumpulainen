document.addEventListener('DOMContentLoaded', () => {
  setupTitleEditor();
  setupDescriptionEditor();
  setupFooterEditor();
  setupQuickLinksEditor();
  setupSimpleArticles();
});

// === TITLE ===
function setupTitleEditor() {
  const titleEl = document.getElementById('siteTitle');
  const editBtn = document.getElementById('editTitleBtn');

  // ⬇️ Fetch current title from DB
  fetch('get_title.php')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        titleEl.textContent = data.title;
      } else {
        titleEl.textContent = '[Title not found]';
        console.error('Failed to load title:', data.message);
      }
    })
    .catch(() => {
      titleEl.textContent = '[Network error]';
    });

  // Handle title edit
  editBtn.addEventListener('click', () => {
    const newTitle = prompt('Enter new title:', titleEl.textContent);
    if (newTitle && newTitle.trim() !== '') {
      fetch('save_title.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'title=' + encodeURIComponent(newTitle.trim()),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            titleEl.textContent = newTitle.trim();
          } else {
            alert('Failed to save title: ' + data.message);
          }
        })
        .catch(() => alert('Network error'));
    }
  });
}



// === DESCRIPTION ===
function setupDescriptionEditor() {
  const descEl = document.getElementById('siteDescription');
  const editBtn = document.getElementById('editDescriptionBtn');

  if (!descEl || !editBtn) return;

  editBtn.addEventListener('click', () => {
    const newDesc = prompt('Enter new description:', descEl.textContent);
    if (newDesc !== null && newDesc.trim() !== '') {
      descEl.textContent = newDesc.trim();

      fetch('save_description.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'description=' + encodeURIComponent(newDesc.trim())
      })
      .then(res => res.json())
      .then(data => {
        if (!data.success) alert('Failed to save: ' + data.message);
      })
      .catch(() => alert('Network error'));
    }
  });
}


// === ARTICLES ===
function setupSimpleArticles() {
  const container = document.getElementById("articlesContainer");
  const addBtn = document.getElementById("addArticleBtn");
  let articles = [];

  function renderArticles() {
    container.innerHTML = '';
    articles.forEach(({ id, title, content, image_url }) => {
      const article = document.createElement("div");
      article.className = "article";

      const contentDiv = document.createElement("div");
      contentDiv.className = "article-text";

      const h2 = document.createElement("h2");
      h2.textContent = title;

      const editTitleBtn = document.createElement("button");
      editTitleBtn.textContent = "Edit Title";
      editTitleBtn.onclick = () => {
        const newTitle = prompt("Edit title:", h2.textContent);
        if (newTitle) {
          fetch('update_article.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ id, title: newTitle })
          }).then(res => res.json()).then(data => {
            if (data.success) {
              h2.textContent = newTitle;
            } else {
              alert('Failed to update title: ' + data.message);
            }
          });
        }
      };

      const p = document.createElement("p");
      p.textContent = content;

      const editTextBtn = document.createElement("button");
      editTextBtn.textContent = "Edit Text";
      editTextBtn.onclick = () => {
        const newText = prompt("Edit text:", p.textContent);
        if (newText) {
          fetch('update_article.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ id, content: newText })
          }).then(res => res.json()).then(data => {
            if (data.success) {
              p.textContent = newText;
            } else {
              alert('Failed to update content: ' + data.message);
            }
          });
        }
      };

      const imgWrapper = document.createElement("div");
      imgWrapper.className = "article-image";

      const img = document.createElement("img");
      img.src = image_url;
      img.alt = "Article Image";

      const editImgBtn = document.createElement("button");
      editImgBtn.textContent = "Edit Image";
      editImgBtn.onclick = () => {
        const newImg = prompt("Edit image URL:", img.src);
        if (newImg) {
          fetch('update_article.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ id, image_url: newImg })
          }).then(res => res.json()).then(data => {
            if (data.success) {
              img.src = newImg;
            } else {
              alert('Failed to update image: ' + data.message);
            }
          });
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️ Delete Article";
      deleteBtn.onclick = () => {
        fetch('delete_article.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ id })
        }).then(res => res.json()).then(data => {
          if (data.success) {
            articles = articles.filter(a => a.id !== id);
            renderArticles();
          } else {
            alert('Failed to delete article: ' + data.message);
          }
        });
      };

      contentDiv.appendChild(h2);
      contentDiv.appendChild(editTitleBtn);
      contentDiv.appendChild(p);
      contentDiv.appendChild(editTextBtn);

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(editImgBtn);

      article.appendChild(contentDiv);
      article.appendChild(imgWrapper);
      article.appendChild(deleteBtn);

      container.appendChild(article);
    });
  }

  function fetchArticles() {
    fetch('get_articles.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          articles = data.articles;
          renderArticles();
        } else {
          alert('Failed to load articles: ' + data.message);
        }
      })
      .catch(() => alert('Network error'));
  }

  addBtn.addEventListener("click", () => {
    const title = prompt("Enter title:");
    const content = prompt("Enter content:");
    const image_url = prompt("Enter image URL:");
    if (!title || !content || !image_url) return;

    fetch('save_article.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ title, content, image_url })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          articles.push({ id: data.id, title, content, image_url });
          renderArticles();
        } else {
          alert('Failed to save article: ' + data.message);
        }
      })
      .catch(() => alert('Network error'));
  });

  fetchArticles(); // Initial load
}


// === FOOTER ===
function setupFooterEditor() {
  const footerEl = document.getElementById('footerText');
  const editBtn = document.getElementById('editFooterBtn');

  if (!footerEl || !editBtn) return;

  // ⬇️ Fetch from DB
  fetch('get_footer.php')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        footerEl.textContent = data.footer;
      } else {
        footerEl.textContent = '[Footer not found]';
        console.error('Footer fetch failed:', data.message);
      }
    })
    .catch(() => {
      footerEl.textContent = '[Network error]';
    });

  editBtn.addEventListener('click', () => {
    const newFooter = prompt('Edit footer text:', footerEl.textContent);
    if (newFooter !== null && newFooter.trim() !== '') {
      footerEl.textContent = newFooter.trim();

      fetch('save_footer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'footer=' + encodeURIComponent(newFooter.trim())
      })
        .then(res => res.json())
        .then(data => {
          if (!data.success) alert('Failed to save: ' + data.message);
        })
        .catch(() => alert('Network error'));
    }
  });
}


// === QUICK LINKS ===
function setupQuickLinksEditor() {
  const list = document.getElementById('quickLinksList');
  const addBtn = document.getElementById('addQuickLinkBtn');
  if (!list || !addBtn) return;

  let links = [];

  function renderLinks() {
    list.innerHTML = '';
    links.forEach(({ id, text, url }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.textContent = text;
      a.target = '_blank';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        fetch('delete_quicklink.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ id })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              links = links.filter(link => link.id !== id);
              renderLinks();
            } else {
              alert('Failed to delete link: ' + data.message);
            }
          })
          .catch(() => alert('Network error'));
      });

      li.appendChild(a);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  function fetchLinks() {
    fetch('get_quicklinks.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          links = data.links;
          renderLinks();
        } else {
          alert('Failed to load quick links: ' + data.message);
        }
      })
      .catch(() => alert('Network error'));
  }

  addBtn.addEventListener('click', () => {
    const text = prompt('Enter link text:');
    const url = prompt('Enter link URL:');
    if (text && url) {
      fetch('add_quicklink.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ text, url })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            links.push({ id: data.id, text, url });
            renderLinks();
          } else {
            alert('Failed to save link: ' + data.message);
          }
        })
        .catch(() => alert('Network error'));
    }
  });

  fetchLinks(); // Initial fetch on load
}

