// Get elements from DOM
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

//
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

// Add item Function
function onAddItemSubmit(e) {
  // Prevent Default (Submit and Reload)
  e.preventDefault();
  // Get input value
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);

    itemToEdit.classList.remove("edit-mode");

    itemToEdit.remove();

    isEditMode = false;
  } else {
    if (checkItemExist(newItem)) {
      alert("That item already exists");
      itemInput.value = "";
      return;
    }
  }

  // Run add item to dom function
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  // Run Check UI
  checkUI();
  // Clear input field
  itemInput.value = "";
}

// Add item to DOM
function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  // Call createButton Function
  const button = createButton("remove-item btn-link text-red");

  // Append button to li
  li.appendChild(button);

  // Append li to DOM
  itemList.appendChild(li);
}

// Add item to storage function
function addItemToStorage(item) {
  // Initialize variable
  const itemsFromStorage = getItemsFromStorage();

  // Add parsed items to array
  itemsFromStorage.push(item);

  // convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Get items from storage
function getItemsFromStorage() {
  // Initialize variable
  let itemsFromStorage;
  // Check is there are items in storage
  if (localStorage.getItem("items") === null) {
    // If no items in storage, set var to empty array
    itemsFromStorage = [];
    // If there are items in storage, parse the items
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

// Create button function
function createButton(classes) {
  // Create new button
  const button = document.createElement("button");
  // Append classes to button
  button.className = classes;
  // Call createIcon Function
  const icon = createIcon("fa-solid fa-xmark");
  // Append icon to button
  button.appendChild(icon);
  // return created button
  return button;
}

// Create icon function
function createIcon(classes) {
  // Create new icon
  const icon = document.createElement("i");
  // Append classes to icon
  icon.className = classes;
  // return created icon
  return icon;
}

// onClickItem function
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

// Function to check for duplicates
function checkItemExist(item) {
  // Get items from storage
  const itemsFromStorage = getItemsFromStorage();
  // If item is in storage return true, else return false
  return itemsFromStorage.includes(item);
}

// Set item to edit mode
function setItemToEdit(item) {
  // Change isEdit to true
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((item) => item.classList.remove("edit-mode"));

  // Add edit mode class for styling
  item.classList.add("edit-mode");
  // change button text for edit mode
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  formBtn.style.backgroundColor = "#228b22";
  itemInput.value = item.textContent;
}

// Remove item function
function removeItem(item) {
  console.log(item);

  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);
    // Check UI
    checkUI();
  }
}

// Remove item from storage function
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Clear items function
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from local storage
  localStorage.removeItem("items");
  // Run Check UI
  checkUI();
}

// Filter Items Function
function filterItems(e) {
  // Get input value from filter field
  const text = e.target.value.toLowerCase();
  // Get all list items
  const items = itemList.querySelectorAll("li");
  // Loop over items
  items.forEach((item) => {
    // Get item text
    const itemName = item.firstChild.textContent.toLowerCase();
    // Compare items
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Check UI
function checkUI() {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i>Add Item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// Initialize App
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
