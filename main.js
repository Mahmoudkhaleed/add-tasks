let userIn = document.querySelector(".input");
let tasksdiv = document.querySelector(".tasks");
let add = document.querySelector(".add");


let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getElementsFromLS()


add.onclick = function() {
  if (userIn.value !== "") {
    addTasksToArray(userIn.value);
    userIn.value = '';
    addElementsToPageFrom(arrayOfTasks);
    addTasksToLocalStorageFrom(arrayOfTasks)
  }
}

function addTasksToArray(tasktext) {
  const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  }
  arrayOfTasks.push(task);
}


function addElementsToPageFrom(arrayOfTasks) {
  tasksdiv.innerHTML = '';

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = 'new';
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    if (task.completed) {
      div.className = 'new done';
    }
    let del = document.createElement("input");
    del.className = "del";
    del.value = "delete";
    del.type = "button"
    div.append(del);
    tasksdiv.prepend(div);
  })
}

tasksdiv.addEventListener('click', (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    delTaskWith(e.target.parentElement.getAttribute("data-id"))
  }
  
  if (e.target.classList.contains('new')) {
   addchangetolocal(e.target.getAttribute("data-id"));
   
    e.target.classList.toggle("done")
  }
})

function addTasksToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getElementsFromLS() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks)
  }
  
}

function delTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
  addTasksToLocalStorageFrom(arrayOfTasks)
}

function addchangetolocal(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false 
    }
  }
  addTasksToLocalStorageFrom(arrayOfTasks)
}
