// proj3.js - JavaScript program implementing if-else, switch, array, and loop

document.addEventListener("DOMContentLoaded", function() {
    const outputDiv = document.getElementById("output");

    // Sample data: User roles
    const roles = ["Guest", "User", "Moderator", "Admin"];

    // Function to determine user privileges
    function getUserPrivileges(role) {
        let message;
        
        // If-else statement
        if (role === "Guest") {
            message = "You have limited access. Please log in for more options.";
        } else if (role === "User") {
            message = "Welcome back! You have standard user privileges.";
        } else if (role === "Moderator") {
            message = "You can manage user comments and posts.";
        } else if (role === "Admin") {
            message = "You have full access to the system.";
        } else {
            message = "Invalid role selected.";
        }
        return message;
    }

    // Function to process role selection using a switch statement
    function processRoleSelection(index) {
        let selectedRole;
        switch (index) {
            case 0:
                selectedRole = roles[0];
                break;
            case 1:
                selectedRole = roles[1];
                break;
            case 2:
                selectedRole = roles[2];
                break;
            case 3:
                selectedRole = roles[3];
                break;
            default:
                selectedRole = "Unknown";
        }
        return selectedRole;
    }

    // Function to display privileges for all roles using a loop
    function displayAllPrivileges() {
        outputDiv.innerHTML = "";
        for (let i = 0; i < roles.length; i++) {
            let role = processRoleSelection(i);
            let privileges = getUserPrivileges(role);
            let paragraph = document.createElement("p");
            paragraph.textContent = `${role}: ${privileges}`;
            outputDiv.appendChild(paragraph);
        }
    }

    // Run the function to display all privileges
    displayAllPrivileges();

    // Log data to console
    console.log("Roles available:", roles);
});
