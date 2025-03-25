// objects.js

// Task class for managing individual tasks
class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }

    // Mark this task as completed
    markCompleted() {
        this.completed = true;
    }

    // Update the task title and description
    updateDetails(newTitle, newDescription) {
        this.title = newTitle;
        this.description = newDescription;
    }

    // Return a summary of the task
    getSummary() {
        return `${this.title}: ${this.description} [${this.completed ? '✅ Completed' : '❌ Pending'}]`;
    }
}
