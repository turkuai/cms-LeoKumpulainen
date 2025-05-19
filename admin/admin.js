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

  if (!titleEl || !editBtn) return;

  editBtn.addEventListener('click', () => {
    const newTitle = prompt('Enter new title:', titleEl.textContent);
    if (newTitle !== null && newTitle.trim() !== '') {
      titleEl.textContent = newTitle.trim();
      // TODO: Send to database with fetch()
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
      // TODO: Send to database with fetch()
    }
  });
}

// === ARTICLES ===
function setupSimpleArticles() {
  const container = document.getElementById("articlesContainer");
  const addBtn = document.getElementById("addArticleBtn");

  addBtn.addEventListener("click", () => {
    const title = prompt("Enter title:");
    const text = prompt("Enter content:");
    const image = prompt("Enter image URL:");

    if (!title || !text || !image) return;

    const article = document.createElement("div");
    article.className = "article";

    const content = document.createElement("div");
    content.className = "article-text";

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const editTitleBtn = document.createElement("button");
    editTitleBtn.textContent = "Edit Title";
    editTitleBtn.onclick = () => {
      const newTitle = prompt("Edit title:", h2.textContent);
      if (newTitle) h2.textContent = newTitle;
    };

    const p = document.createElement("p");
    p.textContent = text;

    const editTextBtn = document.createElement("button");
    editTextBtn.textContent = "Edit Text";
    editTextBtn.onclick = () => {
      const newText = prompt("Edit text:", p.textContent);
      if (newText) p.textContent = newText;
    };

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "article-image";

    const img = document.createElement("img");
    img.src = image;
    img.alt = "Article Image";

    const editImgBtn = document.createElement("button");
    editImgBtn.textContent = "Edit Image";
    editImgBtn.onclick = () => {
      const newImg = prompt("Edit image URL:", img.src);
      if (newImg) img.src = newImg;
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Delete Article";
    deleteBtn.onclick = () => {
      container.removeChild(article);
    };

    content.appendChild(h2);
    content.appendChild(editTitleBtn);
    content.appendChild(p);
    content.appendChild(editTextBtn);

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(editImgBtn);

    article.appendChild(content);     // Text left
    article.appendChild(imgWrapper); // Image right
    article.appendChild(deleteBtn);

    container.appendChild(article);
  });
}

// === FOOTER ===
function setupFooterEditor() {
  const footerEl = document.getElementById('footerText');
  const editBtn = document.getElementById('editFooterBtn');

  if (!footerEl || !editBtn) return;

  editBtn.addEventListener('click', () => {
    const newFooter = prompt('Edit footer text:', footerEl.textContent);
    if (newFooter !== null && newFooter.trim() !== '') {
      footerEl.textContent = newFooter.trim();
      // TODO: Send to database with fetch()
    }
  });
}

// === QUICK LINKS ===
function setupQuickLinksEditor() {
  const list = document.getElementById('quickLinksList');
  const addBtn = document.getElementById('addQuickLinkBtn');

  if (!list || !addBtn) return;

  const links = [];

  function renderLinks() {
    list.innerHTML = '';

    links.forEach(({ text, url }, index) => {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = url;
      a.textContent = text;
      a.target = '_blank';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => {
        links.splice(index, 1);
        renderLinks();
        // TODO: delete from DB
      });

      li.appendChild(a);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  addBtn.addEventListener('click', () => {
    const text = prompt('Enter link text:');
    const url = prompt('Enter link URL:');

    if (text && url) {
      links.push({ text, url });
      renderLinks();
      // TODO: save to DB
    }
  });

  renderLinks(); // initial render
}
