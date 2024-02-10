import { deleteTask } from "./api.js";
export const renderTasks = (tasks) => {
  const listElement = document.getElementById("list");
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
      deleteTask(id, tasks);
    });
  }
};
