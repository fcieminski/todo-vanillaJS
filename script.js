const todoList = document.querySelector(".todo-list");
const addNewTodoNode = document.querySelector(".new-todo");

const tasksPromise = () =>
  fetch("tasks.json")
    .then(response => response.json())
    .then(data => data.tasks);

const refreshTasks = () => {
  tasksPromise().then(tasks => {
    console.log(tasks);
    todoList.innerHTML = "";
    tasks.forEach(task => {
      const taskNode = document.createElement("li");
      const viewNode = document.createElement("div");
      viewNode.classList.add("view");
      const inputNode = document.createElement("input");
      inputNode.classList.add("toggle");
      inputNode.setAttribute("type", "checkbox");
      inputNode.setAttribute("value", task.id);
      if (task.isDone) {
        taskNode.classList.add("completed");
        inputNode.setAttribute("checked", "");
      }
      labelNode = document.createElement("label");
      labelNode.textContent = task.title;
      destroyButton = document.createElement("button");
      destroyButton.classList.add("destroy");
      destroyButton.setAttribute("data-task-id", task.id);

      taskNode.appendChild(viewNode);
      viewNode.appendChild(inputNode);
      viewNode.appendChild(labelNode);
      viewNode.appendChild(destroyButton);
      todoList.appendChild(taskNode);
    });
  });
};

refreshTasks();

const addTask = task =>
  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  });

addNewTodoNode.addEventListener("keyup", event => {
  if (event.code === "Enter" && event.target.value.length > 0) {
    const task = {};
    task.title = event.target.value;
    task.isDone = false;
    addTask(task)
      .then(() => refreshTasks())
      .then(() => (event.target.value = ""));
  }
});

const removeTask = taskId =>
  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });

todoList.addEventListener("click", event => {
  if (event.target.classList.contains("destroy")) {
    console.log("działa");
    const taskId = event.target.getAttribute("data-task-id");
    removeTask(taskId).then(() => refreshTasks());
  }
});
