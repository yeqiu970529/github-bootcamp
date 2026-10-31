const STORAGE_KEY = "todo-list-items";
const THEME_STORAGE_KEY = "todo-theme";
const FILTER_STORAGE_KEY = "todo-filter";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

let todos = loadTodos();
let currentFilter = getInitialFilter();

function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getInitialFilter() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);

  if (savedFilter === "all" || savedFilter === "active" || savedFilter === "completed") {
    return savedFilter;
  }

  return "all";
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return systemThemeQuery.matches ? "dark" : "light";
}

// 這裡用 localStorage 記住使用者的深色模式偏好。
function applyTheme(theme, persist = false) {
  document.documentElement.dataset.theme = theme;

  const isDarkTheme = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDarkTheme));
  themeToggle.setAttribute(
    "aria-label",
    isDarkTheme ? "切換至淺色模式" : "切換至深色模式",
  );
  themeToggle.querySelector(".theme-toggle__icon").textContent = isDarkTheme ? "☀️" : "🌙";
  themeToggle.querySelector(".theme-toggle__label").textContent = isDarkTheme ? "淺色模式" : "深色模式";

  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function updateEmptyState(filteredTodos) {
  if (filteredTodos.length > 0) {
    emptyState.hidden = true;
    return;
  }

  emptyState.hidden = false;

  if (todos.length === 0) {
    emptyState.textContent = "還沒有任何待辦事項,新增一個吧!";
    return;
  }

  if (currentFilter === "active") {
    emptyState.textContent = "目前沒有未完成的待辦事項。";
    return;
  }

  if (currentFilter === "completed") {
    emptyState.textContent = "目前沒有已完成的待辦事項。";
    return;
  }

  emptyState.textContent = "這個篩選條件目前沒有符合的項目。";
}

function renderFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderTodos() {
  list.replaceChildren();

  const filteredTodos = getFilteredTodos();
  filteredTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("is-completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成：${todo.text}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", `刪除：${todo.text}`);
    deleteButton.title = "刪除待辦事項";
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  renderFilterButtons();
  updateEmptyState(filteredTodos);

  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    localStorage.setItem(FILTER_STORAGE_KEY, currentFilter);
    renderTodos();
  });
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});

systemThemeQuery.addEventListener("change", (event) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return;
  }

  applyTheme(event.matches ? "dark" : "light");
});

applyTheme(getInitialTheme());
renderTodos();