/**
 * eventHandlers.js - Sets up event listeners for the ToDo list application
 * Connects UI actions to data operations
 */

const EventHandlers = (() => {
    let currentFilter = 'all';
    
    /**
     * Initialize all event listeners
     */
    const init = () => {
        const taskForm = document.getElementById('task-form');
        if (taskForm) {
            taskForm.addEventListener('submit', handleTaskFormSubmit);
        }
        
        const taskList = document.getElementById('tasks');
        if (taskList) {
            taskList.addEventListener('click', handleTaskListClick);
        }
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    };
    
    /**
     * Handle task form submission
     * @param {Event} event - Form submit event
     */
    const handleTaskFormSubmit = (event) => {
        event.preventDefault();
        
        const titleInput = document.getElementById('task-title');
        const prioritySelect = document.getElementById('task-priority');
        
        if (!titleInput || !prioritySelect) return;
        
        const title = titleInput.value.trim();
        const priority = prioritySelect.value;
        
        if (title === '') {
            UIRenderer.showNotification('タスク名を入力してください', 'error');
            return;
        }
        
        const newTask = TaskData.addTask(title, priority);
        
        UIRenderer.clearTaskForm();
        
        if (currentFilter === 'all' || (currentFilter === 'active' && !newTask.completed)) {
            const filteredTasks = TaskData.filterTasks(currentFilter);
            UIRenderer.renderTasks(filteredTasks);
        }
        
        UIRenderer.showNotification('タスクが追加されました');
    };
    
    /**
     * Handle clicks on the task list (checkboxes and delete buttons)
     * @param {Event} event - Click event
     */
    const handleTaskListClick = (event) => {
        const taskItem = event.target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = taskItem.dataset.id;
        
        if (event.target.classList.contains('task-checkbox')) {
            const updatedTask = TaskData.toggleTaskCompletion(taskId);
            
            if (updatedTask) {
                if ((currentFilter === 'active' && updatedTask.completed) || 
                    (currentFilter === 'completed' && !updatedTask.completed)) {
                    UIRenderer.removeTaskElement(taskId);
                } else {
                    UIRenderer.updateTaskElement(updatedTask);
                }
                
                UIRenderer.showNotification(
                    updatedTask.completed ? 'タスクを完了しました' : 'タスクを未完了に戻しました'
                );
            }
        }
        
        if (event.target.classList.contains('delete-btn')) {
            const deleted = TaskData.deleteTask(taskId);
            
            if (deleted) {
                UIRenderer.removeTaskElement(taskId);
                UIRenderer.showNotification('タスクを削除しました');
            }
        }
    };
    
    /**
     * Handle filter button clicks
     * @param {Event} event - Click event
     */
    const handleFilterClick = (event) => {
        const filter = event.target.dataset.filter;
        if (!filter) return;
        
        currentFilter = filter;
        
        UIRenderer.updateFilterButtons(filter);
        
        const filteredTasks = TaskData.filterTasks(filter);
        UIRenderer.renderTasks(filteredTasks);
    };
    
    return {
        init
    };
})();
