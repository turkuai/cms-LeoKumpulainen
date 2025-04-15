
// Get references to the elements by their IDs
const editBtn = document.getElementById('button');
const saveBtn = document.createElement('button');
const cancelBtn = document.createElement('button');
const editContainer = document.createElement('div');
const titleName = document.getElementById('title_name');
const titleP = document.getElementById('title_p');

window.addEventListener("load", function(){
    let saveName = localStorage.getItem("editHeading");
    let saveDesc = localStorage.getItem("editParagraph");

    if (saveName)
    {
        document.getElementById("title_name").innerText = saveName;
    }

    if (saveDesc)
    {
        document.getElementById("title_p").innerText = saveDesc;
    }

});

// Function to enter edit mode
function enterEditMode() {
  // Create input fields for editing
  const editHeading = document.createElement('input');
  const editParagraph = document.createElement('textarea');
  
  // Pre-fill the input fields with current text
  editHeading.value = titleName.textContent;
  editParagraph.value = titleP.textContent;

  // Add Save and Cancel buttons
  saveBtn.textContent = 'Save';
  cancelBtn.textContent = 'Cancel';

  // Add event listeners for Save and Cancel
  saveBtn.addEventListener('click', function() {
    titleName.textContent = editHeading.value;
    titleP.textContent = editParagraph.value;

    localStorage.setItem("editHeading", editHeading.value);
    localStorage.setItem("editParagraph", editParagraph.value);
    editContainer.remove(); // Remove the editing container after saving
  });

  cancelBtn.addEventListener('click', function() {
    editContainer.remove(); // Remove the editing container without saving
  });

  // Add the input fields and buttons to the edit container
  editContainer.innerHTML = ''; // Clear previous content if any
  editContainer.appendChild(editHeading);
  editContainer.appendChild(editParagraph);
  editContainer.appendChild(saveBtn);
  editContainer.appendChild(cancelBtn);

  // Add the edit container to the footer section
  document.querySelector('.footer .left').appendChild(editContainer);
}

// Attach the function to the button click event
editBtn.addEventListener('click', enterEditMode);

const logoImg = document.getElementById('logoImg');
const logoUpload = document.getElementById('logoUpload');
const editLogoBtn = document.getElementById('editLogoBtn');

// Load stored logo if available
window.addEventListener("load", function () {
  const savedLogo = localStorage.getItem("logoImage");
  if (savedLogo) {
    logoImg.src = savedLogo;
  }
});

// Trigger file input on button click
editLogoBtn.addEventListener("click", () => {
  logoUpload.click();
});

// Convert image to Base64 and save to localStorage
logoUpload.addEventListener("change", function () {
  const file = logoUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64String = e.target.result;
    logoImg.src = base64String;
    localStorage.setItem("logoImage", base64String);
  };
  reader.readAsDataURL(file);
});


// === LINK MANAGEMENT SYSTEM ===
const socialContainer = document.querySelector('.footer .social');
const linkList = document.createElement('ul');
const addLinkBtn = document.createElement('button');
linkList.style.listStyle = 'none';
linkList.style.padding = 0;

// Style the button
addLinkBtn.textContent = 'Add Link';
addLinkBtn.style.position = 'fixed';
addLinkBtn.style.bottom = '20px';
addLinkBtn.style.right = '20px';
addLinkBtn.style.padding = '10px 15px';
addLinkBtn.style.backgroundColor = '#333';
addLinkBtn.style.color = 'white';
addLinkBtn.style.border = 'none';
addLinkBtn.style.borderRadius = '5px';
addLinkBtn.style.cursor = 'pointer';
addLinkBtn.style.zIndex = '1000';

document.body.appendChild(addLinkBtn);
socialContainer.appendChild(linkList);

// Load stored links from localStorage
function loadLinks() {
  const links = JSON.parse(localStorage.getItem('footerLinks')) || [];
  linkList.innerHTML = '';
  links.forEach(({ title, url }, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = title;
    a.href = url;
    a.target = '_blank';
    a.style.marginRight = '10px';
    li.appendChild(a);

    // Optional: Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.style.marginLeft = '5px';
    removeBtn.style.color = 'red';
    removeBtn.style.border = 'none';
    removeBtn.style.background = 'transparent';
    removeBtn.style.cursor = 'pointer';
    removeBtn.addEventListener('click', () => {
      links.splice(index, 1);
      localStorage.setItem('footerLinks', JSON.stringify(links));
      loadLinks();
    });

    li.appendChild(removeBtn);
    linkList.appendChild(li);
  });
}

// Add a new link
addLinkBtn.addEventListener('click', () => {
  const title = prompt('Enter the link title:');
  if (!title) return;
  const url = prompt('Enter the URL:');
  if (!url) return;

  const links = JSON.parse(localStorage.getItem('footerLinks')) || [];
  links.push({ title, url });
  localStorage.setItem('footerLinks', JSON.stringify(links));
  loadLinks();
});

// Load on start
loadLinks();
