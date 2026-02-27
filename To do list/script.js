// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

// Initialize tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
window.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    // Validate input
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Check for duplicate tasks
    if (tasks.some(task => task.text.toLowerCase() === taskText.toLowerCase())) {
        alert('This task already exists!');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    // Add to tasks array
    tasks.push(newTask);
    
    // Save to localStorage
    saveTasks();
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
    
    // Re-render tasks
    renderTasks();
}

function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyMessage.classList.add('show');
        return;
    }
    
    emptyMessage.classList.remove('show');
    
    // Create HTML for each task
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    // Find task and toggle completed status
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    // Remove task from array
    tasks = tasks.filter(t => t.id !== id);
    
    // Save to localStorage
    saveTasks();
    
    // Re-render tasks
    renderTasks();
}

function saveTasks() {
    // Save tasks to localStorage as JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function escapeHtml(text) {
    // Escape HTML special characters to prevent XSS
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
