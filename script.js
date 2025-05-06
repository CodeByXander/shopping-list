// Get elements from DOM
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

// Add item Function
function addItem(e) {
  // Prevent Default (Submit and Reload)
  e.preventDefault();
  // Get input value
  const newItem = itemInput.value;
  console.log(newItem);
  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  // Call createButton Function
  const button = createButton("remove-item btn-link text-red");

  // Append button to li
  li.appendChild(button);

  // Append li to DOM
  itemList.appendChild(li);

  // Clear input field
  itemInput.value = "";
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
