// ======== To-Do List Script with LocalStorage ========

// DOM elements
const input = document.getElementById('new-task');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// ⬅ Load tasks from storage on page load
window.addEventListener('DOMContentLoaded', loadTasks);

// Save current list to localStorage
function saveTasks() {
    const tasks = [];

    list.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.user-text')?.textContent || "",
            completed: li.classList.contains('completed')
        });
    });

    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('todoTasks') || "[]");

    stored.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Create a <li> element
function createTaskElement(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    li.innerHTML = `
        <div>
            <button class="check button-size" title="Check Task as Completed">
                <div class="icon-move"><i class="fa-solid fa-check" id="font-a"></i></div>
            </button>
        </div>
        <span class="user-text">${text}</span>
        <div>
            <button class="edit button-size" title="Edit Task">
                <div class="icon-move"><i class="fa-solid fa-paintbrush" id="font-a"></i></div>
            </button>
            <button class="delete button-size" title="Delete Task">
                <div class="icon-move"><i class="fa-solid fa-trash-can" id="font-a"></i></div>
            </button>
        </div>
    `;

    list.appendChild(li);
}

// Add a new task
function addTask() {
    const text = input.value.trim();
    if (text === '') return;

    createTaskElement(text);
    input.value = '';
    input.focus();

    saveTasks(); // Save after adding
}

// Add button + Enter key
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// List interaction handler
list.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const li = btn.closest('li');

    // Check / Complete
    if (btn.classList.contains('check')) {
        li.classList.toggle('completed');
        saveTasks();
    }

    // Delete
    if (btn.classList.contains('delete')) {
        li.remove();
        saveTasks();
    }

    // Edit
    if (btn.classList.contains('edit')) {
        const oldText = li.querySelector('.user-text').textContent;

        li.innerHTML = `
            <div>
                <button class="check button-size" title="Check Task as Completed">
                    <div class="icon-move"><i class="fa-solid fa-check" id="font-a"></i></div>
                </button>
            </div>
            <input type="text" class="edit-input" value="${oldText}">
            <div>
                <button class="save button-size" title="Save Task Edit"><div class="icon-move"><i class="fa-solid fa-box-archive" id="font-a"></i></div></button>
                <button class="delete button-size" title="Delete Task"><div class="icon-move"><i class="fa-solid fa-trash-can" id="font-a"></i></div></button>
            </div>
        `;

        // After creating the edit mode HTML:
        const editField = li.querySelector('.edit-input');

        editField.focus();
        editField.setSelectionRange(oldText.length, oldText.length);

        // Allow saving edits with Enter key
        editField.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                li.querySelector('.save').click();
            }
        });
    }

    // Save edited text
    if (btn.classList.contains('save')) {
        const newText = li.querySelector('.edit-input').value.trim();

        if (newText === '') {
            li.remove();
        } else {
            li.innerHTML = `
                <div>
                    <button class="check button-size" title="Check Task as Completed">
                        <div class="icon-move"><i class="fa-solid fa-check" id="font-a"></i></div>
                    </button>
                </div>
                <span class="user-text">${newText}</span>
                <div>
                    <button class="edit button-size" title="Edit Task">
                        <div class="icon-move"><i class="fa-solid fa-paintbrush" id="font-a"></i></div>
                    </button>
                    <button class="delete button-size" title="Delete Task">
                        <div class="icon-move"><i class="fa-solid fa-trash-can" id="font-a"></i></div>
                    </button>
                </div>
            `;
        }

        saveTasks();
    }
});