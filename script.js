import { fetchAndRenderTasks, fetchPost } from "./api.js";
import { renderTasks } from "./renderTasks.js";

const buttonElement = document.getElementById("add-button");
const textInputElement = document.getElementById("text-input");

let tasks = [];

fetchAndRenderTasks(tasks);

buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Задача добавляется...";
  fetchPost(tasks);
  renderTasks(tasks);
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
