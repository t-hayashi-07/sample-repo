/**
 * app.js - Main application initialization for the ToDo list application
 * Coordinates between other modules
 */

const App = (() => {
    /**
     * Initialize the application
     */
    const init = () => {
        const tasks = TaskData.getTasks();
        UIRenderer.renderTasks(tasks);
        
        EventHandlers.init();
        
        console.log('ToDo List Application initialized');
    };
    
    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', App.init);
