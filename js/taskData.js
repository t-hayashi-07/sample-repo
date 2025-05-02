/**
 * taskData.js - Handles data storage and retrieval for the ToDo list application
 * Manages localStorage interactions and provides CRUD operations for tasks
 */

const TaskData = (() => {
    const STORAGE_KEY = 'todoTasks';
    
    /**
     * Get all tasks from localStorage
     * @returns {Array} Array of task objects
     */
    const getTasks = () => {
        const tasksJSON = localStorage.getItem(STORAGE_KEY);
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    };
    
    /**
     * Save tasks to localStorage
     * @param {Array} tasks - Array of task objects to save
     */
    const saveTasks = (tasks) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    };
    
    /**
     * Add a new task
     * @param {string} title - Task title
     * @param {string} priority - Task priority (high, medium, low)
     * @returns {Object} The newly created task
     */
    const addTask = (title, priority) => {
        const tasks = getTasks();
        
        const newTask = {
            id: Date.now().toString(),
            title: title,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks(tasks);
        
        return newTask;
    };
    
    /**
     * Update an existing task
     * @param {string} taskId - ID of the task to update
     * @param {Object} updates - Object containing properties to update
     * @returns {Object|null} Updated task or null if not found
     */
    const updateTask = (taskId, updates) => {
        const tasks = getTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) return null;
        
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        saveTasks(tasks);
        
        return tasks[taskIndex];
    };
    
    /**
     * Toggle the completed status of a task
     * @param {string} taskId - ID of the task to toggle
     * @returns {Object|null} Updated task or null if not found
     */
    const toggleTaskCompletion = (taskId) => {
        const tasks = getTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) return null;
        
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks(tasks);
        
        return tasks[taskIndex];
    };
    
    /**
     * Delete a task
     * @param {string} taskId - ID of the task to delete
     * @returns {boolean} True if task was deleted, false if not found
     */
    const deleteTask = (taskId) => {
        const tasks = getTasks();
        const initialLength = tasks.length;
        
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        
        if (filteredTasks.length === initialLength) {
            return false; // Task not found
        }
        
        saveTasks(filteredTasks);
        return true;
    };
    
    /**
     * Filter tasks by status
     * @param {string} filter - Filter type ('all', 'active', 'completed')
     * @returns {Array} Filtered array of tasks
     */
    const filterTasks = (filter) => {
        const tasks = getTasks();
        
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'all':
            default:
                return tasks;
        }
    };
    
    return {
        getTasks,
        addTask,
        updateTask,
        toggleTaskCompletion,
        deleteTask,
        filterTasks
    };
})();
