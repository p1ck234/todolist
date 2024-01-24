const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");

let tasks = [];

const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos", {
  method: "get",
});
fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((response) => {
    tasks = response.todos;
    renderTasks();
  });
});
const renderTasks = () => {
  const tasksHtml = tasks
    .map((task, index) => {
      return `
          <li class="task">
            <p class="task-text">
              ${task.text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")}
              <button data-index="${index}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
    })
    .join("");

  listElement.innerHTML = tasksHtml;
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteButton.innerHTML = "Задача удаляется...";

      setTimeout(() => {
        const index = deleteButton.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
      }, 1000);
    });
  }
};

renderTasks();

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  tasks.push({
    text: textInputElement.value,
  });
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos", {
    method: "post",
    body: JSON.stringify({
      text: textInputElement.value,
    }),
  });
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((response) => {
      tasks = response.todos;
      renderTasks();
    });
  });

  renderTasks();

  textInputElement.value = "";
});
const pageTitle = document.getElementById("page-title");
pageTitle.addEventListener("click", () => {
  pageTitle.textContent = "3";
  setTimeout(() => {
    pageTitle.textContent = "2";
    setTimeout(() => {
      pageTitle.textContent = "1";
      setTimeout(() => {
        pageTitle.textContent = "Список задач";
      }, 1000);
    }, 1000);
  }, 1000);
});
