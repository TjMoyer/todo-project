// ---- 01 | Variables  ---- //

const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const lis = listUl.children;


// ---- 02 | Functions  ---- //

// function to create buttons
const createButton = name => {
  let button = document.createElement('button');
  button.className = name.toLowerCase();
  button.textContent = name;
  return button;
}

// function to 'disable' buttons
const disableButton = button => {
  button.disabled = true;
  button.style.backgroundColor = '#D2E7EE';
  button.style.borderColor = '#EFEFEF';
}

// function to 'enable' buttons
const activateButton = button => {
  button.disabled = false;
  button.style.cssText = '';
}

// function to attach the 3 functionality buttons
const attachListItemButtons = li => {
  li.appendChild(createButton('Up'));
  li.appendChild(createButton('Down'));
  li.appendChild(createButton('Remove'));
}

/*
  This function does a few things
  1. Creates buttons on list elements if they don't exist
  2. Disables Up / Down buttons depending on their order
*/
const checkButtons = list => {
  for (let i = 0; i < lis.length; i += 1) {
    let children = lis[i].children;

    if(children.length === 0){
      attachListItemButtons(lis[i]);
    }

    if(i === 0){
      disableButton(children[0]);
    } else {
      activateButton(children[0]);
    }

    if(i + 1 === lis.length){
      disableButton(lis[i].children[1]);
    } else {
      activateButton(children[1]);
    }

  }
}

// Create New List Item
const addItem = () => {
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  listUl.appendChild(li);
  addItemInput.value = '';
  checkButtons(listUl);
}

// ---- 03 | Listeners  ---- //


// Add Item to List
addItemButton.addEventListener('click', () => { addItem(); });
addItemInput.addEventListener('keypress', event => {
  if(event.which === 13 || event.keyCode === 13){
    addItem();
  }
});

// Move List Items Around
listUl.addEventListener('click', (event) => {
  if(event.target.tagName === 'BUTTON'){
    if(event.target.className === 'remove'){
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    }
    if(event.target.className === 'up'){
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if(prevLi){
        ul.insertBefore(li, prevLi);
      }
    }
    if(event.target.className === 'down'){
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      if(nextLi){
        ul.insertBefore(nextLi, li);
      }
    }
    checkButtons(event.target.parentNode.parentNode);
  }
});

// Show / Hide List
toggleList.addEventListener('click', () => {
  if ( listDiv.style.display === 'none' ) {
    listDiv.style.display = 'block';
    toggleList.textContent = 'Hide List';
  } else {
    listDiv.style.display = 'none';
    toggleList.textContent = 'Show List';
  }
});

// Adjust Description
descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML = descriptionInput.value + ":";
  descriptionP.value = '';
});


// ---- 04 | Initialize ---- //

checkButtons(lis);
