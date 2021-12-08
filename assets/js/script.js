//select the form element
var formEl = document.querySelector("#task-form");
// selects unordered list
var taskToDo = document.querySelector("#tasks-to-do");
var taskInProgress = document.querySelector('#tasks-in-progress');
var completedTasks = document.querySelector('#tasks-completed')
var taskID = 0;
//selected kanban board 
var pageContent = document.querySelector('#page-content')


function taskForm (event){    
event.preventDefault()
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

var isEdit = formEl.hasAttribute("data-task-id");



if (!taskNameInput || !taskTypeInput){
    alert ("Please fill out the form");
    return false;
}

formEl.reset();

//has data attribute, so get task id and call fxn to complete edit
if (isEdit){
var taskId = formEl.getAttribute("data-task-id");
completeEditTask(taskNameInput, taskTypeInput, taskId)
} else {
    //package the data as an object
var taskDataObj = {
    name: taskNameInput, 
    type: taskTypeInput
};
createTask(taskDataObj)
}
};

function createTask (taskDataObj){
//create a list item
var listItem = document.createElement("li");
listItem.className = "task-item";

//add task id as a custom attribute
listItem.setAttribute('data-task-id', taskID)

//create a div to hold the task and add to list
var taskInfo = document.createElement("div");
//give it a class
taskInfo.className = "task-info";
//add HTML content
taskInfo.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItem.appendChild(taskInfo);

var taskActions = createTaskAction(taskID)
listItem.appendChild(taskActions)

//add entire list item to list
taskToDo.appendChild(listItem);

//increase the task counter for unique ID
taskID++;
}

function createTaskAction (taskID){
var actionContainer = document.createElement("div");
actionContainer.className = "task-actions";

//create edit buttons
var editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.className = "btn edit-btn";
editButton.setAttribute('data-task-id', taskID)

//create delete button
var deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.className = "btn delete-btn";
deleteButton.setAttribute('data-task-id', taskID)

//create select options
var statusSelect = document.createElement('select');
statusSelect.className = "select-status";
statusSelect.setAttribute("name", "status-change");
statusSelect.setAttribute("data-task-id", taskID)

//append btns to task
actionContainer.appendChild(editButton);
actionContainer.appendChild(deleteButton);
actionContainer.appendChild(statusSelect);

var statusChoices = ["To Do", "In-Progress", "Completed"];

for (var i=0; i < statusChoices.length; i++){
    // create option Element
    var statusOption = document.createElement("option");
    statusOption.textContent = statusChoices[i];
    statusOption.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelect.appendChild(statusOption)
}
return actionContainer;
}

function taskButtonHandler (event){

//get target element
var targetEl = event.target
var taskIdEl = targetEl.getAttribute("data-task-id");
//get edit event
if (targetEl.matches(".edit-btn")){
    editTask(taskIdEl);
}

//delete button was clicked
if (targetEl.matches(".delete-btn")){
    deleteTask(taskIdEl)
}

};

function deleteTask (taskIdEl){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskIdEl + "']")
    taskSelected.remove();
};

function editTask (taskIdEl){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskIdEl + "']");
    //get contetnt from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskName);
    console.log(taskType)

    //obtain the values
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task"

    formEl.setAttribute("data-task-id", taskIdEl)
}

function completeEditTask (taskName, taskType, taskId){
    //finds the matching tak list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

function taskStatusChangeHandler (event){
    
//get the taskID
var taskId = event.target.getAttribute('data-task-id');

//get current selected options value and convert to Lowercase
var statusValue = event.target.value.toLowerCase();

//find parent task item based on the ID
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

//if statement to place task in appropriate area
if (statusValue === 'to do'){
    taskToDo.appendChild(taskSelected);
} else if (statusValue === 'in-progress') {
    taskInProgress.appendChild(taskSelected);
} else if (statusValue === 'completed'){
    completedTasks.appendChild(taskSelected);
}
}

formEl.addEventListener("submit", taskForm)
pageContent.addEventListener("click", taskButtonHandler);
pageContent.addEventListener('change', taskStatusChangeHandler)