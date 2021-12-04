var buttonEl = document.querySelector("#save-task");
var taskToDo = document.querySelector("#tasks-to-do");


var createTask = function(){    
var listItem = document.createElement("li");
listItem.className = "task-item";
listItem.textContent = "New Task!";
taskToDo.appendChild(listItem);
};

buttonEl.addEventListener("click", createTask)