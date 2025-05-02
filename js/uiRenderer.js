/**
 * uiRenderer.js - Handles UI rendering for the ToDo list application
 * Responsible for generating HTML and updating the DOM
 */

const UIRenderer = (() => {
    const taskList = document.getElementById('tasks');
    
    /**
     * Create HTML for a single task item
     * @param {Object} task - Task object
     * @returns {string} HTML string for the task
     */
    const createTaskHTML = (task) => {
        const priorityLabel = {
            'high': '優先度: 高',
            'medium': '優先度: 中',
            'low': '優先度: 低'
        };
        
        return `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <span class="task-priority priority-${task.priority}">${priorityLabel[task.priority]}</span>
                </div>
                <div class="task-actions">
                    <button class="delete-btn">削除</button>
                </div>
            </li>
        `;
    };
    
    /**
     * Render all tasks to the DOM
     * @param {Array} tasks - Array of task objects
     */
    const renderTasks = (tasks) => {
        if (!taskList) return;
        
        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="empty-list">タスクがありません</li>';
            return;
        }
        
        const tasksHTML = tasks.map(task => createTaskHTML(task)).join('');
        taskList.innerHTML = tasksHTML;
    };
    
    /**
     * Update a single task in the DOM
     * @param {Object} task - Updated task object
     */
    const updateTaskElement = (task) => {
        if (!taskList) return;
        
        const taskElement = document.querySelector(`.task-item[data-id="${task.id}"]`);
        if (!taskElement) return;
        
        taskElement.outerHTML = createTaskHTML(task);
    };
    
    /**
     * Remove a task from the DOM
     * @param {string} taskId - ID of the task to remove
     */
    const removeTaskElement = (taskId) => {
        if (!taskList) return;
        
        const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
        if (taskElement) {
            taskElement.remove();
            
            if (taskList.children.length === 0) {
                taskList.innerHTML = '<li class="empty-list">タスクがありません</li>';
            }
        }
    };
    
    /**
     * Update active filter button
     * @param {string} filter - Current filter ('all', 'active', 'completed')
     */
    const updateFilterButtons = (filter) => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            if (button.dataset.filter === filter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    };
    
    /**
     * Show a temporary notification message
     * @param {string} message - Message to display
     * @param {string} type - Message type ('success', 'error')
     */
    const showNotification = (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.querySelector('.container').appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    };
    
    /**
     * Clear the task input form
     */
    const clearTaskForm = () => {
        document.getElementById('task-title').value = '';
        document.getElementById('task-priority').value = 'medium';
    };
    
    return {
        renderTasks,
        updateTaskElement,
        removeTaskElement,
        updateFilterButtons,
        showNotification,
        clearTaskForm
    };
})();
