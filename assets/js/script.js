var formEl = document.querySelector("#task-form");
var taskToDo = document.querySelector("#tasks-to-do");


var createTask = function(event){    
event.preventDefault()
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

//create a list item
var listItem = document.createElement("li");
listItem.className = "task-item";

//create a div to hold the task and add to list
var taskInfo = document.createElement("div");
//give it a class
taskInfo.className = "task-info";
//add HTML content
taskInfo.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span className='task-info'>" + taskTypeInput + "</span>";

listItem.appendChild(taskInfo);

//add entire list item to list
taskToDo.appendChild(listItem);
};

formEl.addEventListener("submit", createTask)