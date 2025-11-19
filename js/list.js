// ======== To-Do List Script ========

const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Add a new task
function addTask() {
  const text = input.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <div>
      <button class="check button-size" title="Check"><div class="icon-move"><i class="fa-solid fa-check" id="font-a"></i></div></button>
    </div>
    <span class="user-text">${text}</span>
    <div>
      <button class="edit button-size" title="Edit"><div class="icon-move"><i class="fa-solid fa-paintbrush" id="font-a"></i></div></button>
      <button class="delete button-size" title="Delete"><div class="icon-move"><i class="fa-solid fa-trash-can" id="font-a"></i></div></button>
    </div>
  `;

  list.appendChild(li);
  input.value = '';
  input.focus();
}

// Handle add button click or Enter key
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Handle mark as complete action
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('check')) {
    const li = e.target.closest('li');
    li.classList.toggle('completed');
  }
});

// Handle edit and delete actions
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.closest('li').remove();
  }

  if (e.target.classList.contains('edit')) {
    const li = e.target.closest('li');
    const span = li.querySelector('span');
    const oldText = span.textContent;
    li.innerHTML = `
      <div>
        <button class="check button-size" title="Check"><div class="icon-move"><i class="fa-solid fa-check" id="font-a"></i></div></button>
      </div>
      <input type="text" class="edit-input" value="${oldText}" />
      <div>
        <button class="save button-size" title="Save"><div class="icon-move"><i class="fa-solid fa-box-archive" id="font-a"></i></div></button>
        <button class="delete button-size" title="Delete"><div class="icon-move"><i class="fa-solid fa-trash-can" id="font-a"></i></div></button>
      </div>
    `;
    li.querySelector('.edit-input').focus();
  }

  if (e.target.classList.contains('save')) {
    const li = e.target.closest('li');
    const newText = li.querySelector('.edit-input').value.trim();
    if (newText === '') {
      li.remove();
      return;
    }
    li.innerHTML = `
      <div>
        <button class="check button-size" title="Check"><div class="icon-move"><i class="fa-solid fa-check" id="font-a"></i></div></button>
      </div>
      <span class="user-text">${newText}</span>
      <div>
        <button class="edit button-size" title="Edit"><div class="icon-move"><i class="fa-solid fa-paintbrush" id="font-a"></i></div></button>
        <button class="delete button-size" title="Delete"><div class="icon-move"><i class="fa-solid fa-trash-can" id="font-a"></i></div></button>
      </div>
    `;
  }
});