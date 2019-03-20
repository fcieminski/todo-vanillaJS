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
