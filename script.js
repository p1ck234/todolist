const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const textInputElement = document.getElementById("text-input");

let tasks = [];

const fetchAndRenderTasks = () => {
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos", {
    method: "get",
  });
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      tasks = response.todos;
      renderTasks();
    });
};

const renderTasks = () => {
  const tasksHtml = tasks
    .map((task) => {
      return `
          <li class="task">
            <p class="task-text">
              ${task.text
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")}
              <button data-id="${
                task.id
              }" class="button delete-button">Удалить</button>
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

      const id = deleteButton.dataset.id;

      const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos/" + id, {
        method: "delete",
      });
      fetchPromise
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          tasks = response.todos;
          renderTasks();
        });
    });
  }
};
fetchAndRenderTasks();
renderTasks();

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Задача добавляется...";
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos", {
    method: "post",
    body: JSON.stringify({
      text: textInputElement.value,
    }),
  });
  fetchPromise
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      if (response.status === 400) {
        throw new Error("Запрос некорректный");
      }
    })
    .then((response) => {
      fetchAndRenderTasks();
    })
    .then((date) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      textInputElement.value = "";
    })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался");
        return;
      }
      if (error.message === "Запрос некорректный") {
        alert("Запрос некорректный");
        return;
      }
      alert("Кажется что-то пошло не так!");
    });
  renderTasks();
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
