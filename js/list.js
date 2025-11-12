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
    <span>${text}</span>
    <div>
      <button class="edit" title="Edit">✏️</button>
      <button class="delete" title="Delete">🗑️</button>
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
      <input type="text" class="edit-input" value="${oldText}" />
      <div>
        <button class="save" title="Save">💾</button>
        <button class="delete" title="Delete">🗑️</button>
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
      <span>${newText}</span>
      <div>
        <button class="edit" title="Edit">✏️</button>
        <button class="delete" title="Delete">🗑️</button>
      </div>
    `;
  }
});