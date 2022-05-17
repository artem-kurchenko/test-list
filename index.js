const tasks = [
  'Сделать проектную работу',
  'Полить цветы',
  // `<img src="somelink" onerror="alert('вас взломали')" />`,
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Погулять с собакой',
  'Разобраться в замыканиях',
  'Решить задачу на Codewars',
];

const todosListElement = document.querySelector('.todos__list');
const todosFormElement = document.querySelector('.todos__form');
const todosTemplateElement = document.querySelector('.todo-template');
const todosInputElement = document.querySelector('.todos__input');


let editingItem = null;

function renderList(data) {
  data.forEach((item) => renderItem(item))
}

function renderItem(value) {
  // let taskTemplate = `<li class="todo">
  //  <p class="todo__text">
  //      ${value}
  //  </p>
  //  <button class="button todo__btn todo__btn_type_edit">
  //  </button>
  //  <button class="todo__btn button todo__btn_type_copy">
  //  </button>
  //  <button class="todo__btn button todo__btn_type_remove"> 
  //  </button>
  //  </li>`; 
  todosListElement.insertAdjacentHTML('beforeend', taskTemplate)
  const taskTemplate = document.querySelector(".todo-template").content;
  const taskNode = taskTemplate.cloneNode(true);
  taskNode.querySelector(".todo__text").textContent = value;
  taskNode.querySelector(".todo__btn_type_copy").addEventListener('click', (args) => {
    let taskElement = args.target.closest(".todo").cloneNode(true);
    todosListElement.appendChild(taskElement);

  })
  taskNode.querySelector(".todo__btn_type_remove").addEventListener('click', (args) => {
    let taskElement = args.target.closest(".todo");
    taskElement.remove();
  })
  taskNode.querySelector(".todo__btn_type_edit").addEventListener('click', (args) => {
    let taskElement = args.target.closest('.todo');
    let valueElement = taskElement.querySelector('.todo__text');
    todosInputElement.value = valueElement.textContent;
    todosFormElement.querySelector(".todos__submit-btn").textContent = "Сохранить";
    editingItem = valueElement;
  })
  todosListElement.appendChild(taskNode)
}



todosFormElement.addEventListener("submit", (args) => {
  args.preventDefault();
  let value = todosInputElement.value;
  if (!value || value === "" || value.trim(" ") === "") {
    alert('Nothing to add')
    return;
  }

  if (!editingItem)
    renderItem(value)
  else {
    editingItem.textContent = value;
    let submitBtn = todosFormElement.querySelector(".todos__submit-btn")
    submitBtn.textContent = "Добавить";
    editingItem = null;
  }

})


renderList(tasks);
