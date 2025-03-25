// objects.js

// Define a Task class using ES6 syntax
class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }

    // Mark task as completed
    markCompleted() {
        this.completed = true;
    }

    // Update task details
    updateDetails(newTitle, newDescription) {
        this.title = newTitle;
        this.description = newDescription;
    }

    // Get task summary
    getSummary() {
        return `${this.title}: ${this.description} [${this.completed ? 'Completed' : 'Pending'}]`;
    }
}

// Export the class if using module system (optional if embedding in the browser)
// export default Task;
