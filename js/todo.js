/*  
Project Name: To-Do App (JS)
Project URI: 
Description: I have made the To-Do app for educational purposes only. You are free to use or modify it with your projects without any warranty. Give me a thumbs-up, If you like it. Enjoy!
Author: Abdul Samad
Author URI: https://getabdulsamad.com/
Tags: Mobile-friendly, All-Devices-Supported. 
*/
let todoForm = document.getElementById('todoForm');
let todoField = document.getElementById('todoField');
let todoList = document.getElementById('todoList');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(todoField.value == '') {
        swal('Please enter your item');
        return false;
    }
    addItem(todoField.value);
    document.getElementById("itemsTitle").innerHTML = "Your Listed Items:";
})

//ToDo AddNew Item Function
function addItem(todoAdd) {
    let today = new Date();
    let date = String(today.getDate()).padStart(2, '0');
    //let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let yyyy = today.getFullYear();

    // If you want to output of month as number then you have to replace of the first span value with mm. Don't forget to uncomment mm code above.  
    // If you want to include year in your output just copy '<span>' + yyyy + '</span>' and paste with below code after last '</span>' closing tag.
    // Don't forget to include + operator before pasting year code.
    today = '<span>' + monthNames[today.getMonth()] + '</span>' + '<span>' + date + '</span>';
    
    let todoHTML = `<li class="listItem">
                    <div class="itemEntry">
                        <span id="tdtime">${today}</span>
                        <span id="tdValue">${todoAdd}</span> 
                    </div>
                    <div class="itemActions">
                        <button class="fa fa-pencil" aria-hidden="true" onclick="updateItem(this)">Update</button>
                        <button class="fa fa-check-circle" aria-hidden="true" onclick="doneItem(this)">Done</button>
                        <button class="fa fa-trash" aria-hidden="true" onclick="deleteItem(this)">Delete</button>
                    </div>
                    </li>`;
    todoList.insertAdjacentHTML('beforeend', todoHTML);
    todoField.value = '';
    todoField.focus();
}

//ToDo Done Item Function
function doneItem(todoDone) {
    todoDone.parentNode.parentNode.classList.add('itemDone');
    let tdValue = todoDone.parentNode.parentNode.querySelector('#tdValue').innerText;
    if (tdValue) {
        todoDone.parentNode.parentNode.querySelector('#tdValue').innerHTML = tdValue.strike();
        todoDone.disabled = true;
        todoDone.setAttribute("id", "doneItem");

        let checkDone = todoDone.parentNode.querySelector('button:first-child');
        if (checkDone) {
            checkDone.disabled = true;
            checkDone.setAttribute("id", "doneItem");
        }
    }
    todoField.focus();
}

//ToDo Edit Item Function
function updateItem(todoEdit, el) {
    swal("Write something here:", {
        content: "input",
        buttons: ["Cancel", true],
      })
      .then((value) => {
        if(value) {
            todoEdit.parentNode.parentNode.querySelector('#tdValue').innerHTML = value;
        }
        todoField.focus();
      });
}

//ToDo Delete Item Function
function deleteItem(todoDelete, el) {
    todoDelete.parentElement.parentElement.remove();
    todoField.focus();
}

//ToDo Grid Customizer
function gridCustomizer(todoGrid) {
    todoList.classList.add('grid');
    todoList.classList.remove('list');
    todoField.focus();
}

//ToDo List Customizer
function listCustomizer(czrList) {
    todoList.classList.add('list');
    todoList.classList.remove('grid');
    todoField.focus();
}

//Onload Checking Items
function onLoadItems() {
    if (!todoList.hasChildNodes()) { 
        document.getElementById("itemsTitle").innerHTML = "No Listed Items Today!";
    } 
  }
onLoadItems();