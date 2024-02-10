import { renderTasks } from "./renderTasks.js";

export const fetchAndRenderTasks = (tasks) => {
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos", {
    method: "get",
  });
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      tasks = response.todos;
      renderTasks(tasks);
    });
};

export const fetchPost = (tasks) => {
  const buttonElement = document.getElementById("add-button");

  const textInputElement = document.getElementById("text-input");

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
      fetchAndRenderTasks(tasks);
    })
    .then((date) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
      textInputElement.value = "";
    })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался");
      } else if (error.message === "Запрос некорректный") {
        alert("Запрос некорректный");
      } else alert("Что-то пошло не так!");
    });
};

export const deleteTask = (id, tasks) => {
  const fetchPromise = fetch("https://wedev-api.sky.pro/api/todos/" + id, {
    method: "delete",
  });
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      tasks = response.todos;
      renderTasks(tasks);
    });
};
