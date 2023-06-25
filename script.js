"use strict";

// NAV SECTION

const modeMenu = document.querySelector(".mode-menu");
const lightMode = document.querySelector(".light-mode");
const darkMode = document.querySelector(".dark-mode");

modeMenu.addEventListener("click", () => {
  lightMode.classList.toggle("hidden");
  darkMode.classList.toggle("hidden");
  document.body.classList.toggle("dark-mode");
});

// TODO BOX
const form = document.getElementById("form");
const inputText = document.getElementById("input-text");
const todoBox = document.querySelector(".todo-box");
const todoCount = document.querySelector(".todo-count");
const linkItem = document.querySelector(".link-item");
const link = document.querySelectorAll(".link");
const selecAll = document.querySelector(".select-all");
const selecActive = document.querySelector(".select-active");
const selectCompleted = document.querySelector(".select-completed");
const clearAll = document.querySelector(".clear-all");
const footer = document.querySelector("footer");

let todos = [];
let itemcount = 0;

const UpdateCount = (el) => {
  itemcount = el.length;
  todoCount.textContent = itemcount;
};
const init = (el) => {
  renderTodo(el);
  UpdateCount(el);
};

const renderTodo = (selected) => {
  todoBox.innerHTML = "";

  selected.forEach((todo, index) => {
    const { text, completed } = todo;
    const checkedClass = completed ? "active-circle" : "";
    const styletxt = completed ? "active-txt" : "";

    const html = `<div class="box flex" data-box=${index}>
      <div class="box-info flex">
          <div class="circle ${checkedClass}" data-circle=${index}></div>
          <p class="todo-txt ${styletxt}" data-index=${index}>${text}</p>
      </div>
      <img src="./images/icon-cross.svg" alt="" class="delete-todo" data-del=${index}>
    </div>`;

    todoBox.insertAdjacentHTML("afterbegin", html);
  });
};

//EVENT HANDLER SECTION
// FORM SECTION
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = inputText.value.trim();
  if (!inputVal) return;

  todos.push({ text: inputVal, completed: false });
  renderTodo(todos);
  itemcount++;
  todoCount.textContent = itemcount;
  footer.style.borderRadius = "0 0 8px 8px";
  inputText.value = "";
  inputText.blur();
});

// FILTERING ELEMENT
selecAll.addEventListener("click", function () {
  init(todos);
});

selecActive.addEventListener("click", function () {
  const activeTodo = todos.filter((todo) => !todo.completed);
  init(activeTodo);
});

selectCompleted.addEventListener("click", function () {
  const completedTodos = todos.filter((todo) => todo.completed);
  init(completedTodos);
});

// Event Delagation
todoBox.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete-todo")) {
    const { del } = el.dataset;
    todos.splice(del, 1);
    itemcount--;
    todoCount.textContent = itemcount;
    renderTodo(todos);
  }

  if (el.classList.contains("circle")) {
    const { circle } = el.dataset;
    todos[circle].completed = !todos[circle].completed;
    el.classList.toggle("active-circle");
    const todotxt = document.querySelector(`.todo-txt[data-index='${circle}']`);
    if (el.classList.contains("active-circle")) {
      todotxt.classList.add("active-txt");
    } else {
      todotxt.classList.remove("active-txt");
    }
  }
});

// LINK ITEM
linkItem.addEventListener("click", (e) => {
  const el = e.target.closest(".link");
  link.forEach((l) => l.classList.remove("active"));
  el?.classList.add("active");
});

// clear all array and inner html
clearAll.addEventListener("click", () => {
  todos = [];
  todoBox.innerHTML = "";
  itemcount = 0;
  todoCount.textContent = itemcount;
});
