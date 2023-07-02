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
const clearCompleted = document.querySelector(".clear-completed");
const footer = document.querySelector("footer");

const Task = class {
  constructor(description) {
    this.description = description;
    this.isCompleted = false;
  }
 

};

const TodoList = class {
  constructor() {
    this.todos = [];
    this.itemcount = 0;

  }
  addTodo(todo) {
    this.todos.push(todo);
  }
  removeTodo(index) {
    this.todos.splice(index, 1);
  }
  increment() {
    this.itemcount++;
    todoCount.textContent = this.itemcount;
  }
  decrement() {
    this.itemcount--;
    todoCount.textContent = this.itemcount;
  }
  updateTodoCount(todo) {
    this.itemcount = todo.length;
    todoCount.textContent = this.itemcount;
  }
  toggleCompleted(index) {
    this.todos[index].isCompleted = !this.todos[index].isCompleted;
  }
  init(todo){
    todolist.renderTodo(todo);
    todolist.updateTodoCount(todo)
  }
  renderTodo(todolist) {
    todoBox.innerHTML = "";
    console.log(todolist);
    todolist.forEach((todo, index) => {
      const { description, isCompleted } = todo;
      const checkedClass = isCompleted ? "active-circle" : "";
      const styletxt = isCompleted ? "active-txt" : "";

      const html = `<div class="box flex" data-box=${index}>
      <div class="box-info flex">
          <div class="circle ${checkedClass}" data-circle=${index}></div>
          <p class="todo-txt ${styletxt}" data-index=${index}>${description}</p>
      </div>
      <img src="./images/icon-cross.svg" alt="" class="delete-todo" data-del=${index}>
    </div>`;

      todoBox.insertAdjacentHTML("afterbegin", html);
    });
  }
};

const todolist = new TodoList();
const todoArr = todolist.todos;
// FORM SECTION
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputVal = inputText.value.trim();
  if (!inputVal) return;
  const newTask = new Task(inputVal);
  todolist.addTodo(newTask);
  todolist.renderTodo(todoArr)
  todolist.increment();
  footer.style.borderRadius = "0 0 8px 8px";
  inputText.value = "";
  inputText.blur();
});

// // FILTERING ELEMENT
selecAll.addEventListener("click", function () {
  todolist.renderTodo(todoArr);
});

selecActive.addEventListener("click", function () {
  const activeTodo = todoArr.filter((todo) => !todo.isCompleted);
  todolist.init(activeTodo);
});

selectCompleted.addEventListener("click", function () {
  const completedTodos = todoArr.filter((todo) => todo.isCompleted);
  todolist.init(completedTodos);
});

// selecting the todo box
todoBox.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("delete-todo")) {
    const { del } = el.dataset;
    todolist.removeTodo(del);
    todolist.decrement();
    todolist.renderTodo(todoArr);
  }

  if (el.classList.contains("circle")) {
    const { circle } = el.dataset;
    todolist.toggleCompleted(circle);
    el.classList.toggle("active-circle");
    const todotxt = document.querySelector(`.todo-txt[data-index='${circle}']`);
    if (el.classList.contains("active-circle")) {
      todotxt.classList.add("active-txt");
    } else {
      todotxt.classList.remove("active-txt");
    }
  }
});
// clear all todolist
clearCompleted.addEventListener("click", () => {
  const completedtodos = todoArr.filter(todo => todo.isCompleted);
  completedtodos.forEach(complete => {
    const index = todoArr.indexOf(complete)
    todolist.removeTodo(index)
  })
  todolist.init(todoArr);
});

// LINK ITEM
linkItem.addEventListener("click", (e) => {
  const el = e.target.closest(".link");
  link.forEach((l) => l.classList.remove("active"));
  el?.classList.add("active");
});





