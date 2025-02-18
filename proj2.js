document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("userForm");
    const resultDisplay = document.getElementById("result");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        // Get user input
        const name = document.getElementById("name").value.trim();
        const age = parseInt(document.getElementById("age").value.trim(), 10);

        // Validate input
        if (!name || isNaN(age) || age <= 0) {
            resultDisplay.textContent = "Please enter a valid name and age.";
            console.error("Invalid input provided.");
            return;
        }

        // Perform a basic calculation (age in months)
        const ageInMonths = age * 12;

        // Provide a greeting message
        const message = `Hello, ${name}! You are approximately ${ageInMonths} months old.`;

        // Display results dynamically
        resultDisplay.textContent = message;

        // Log to console
        console.log("User Input:", { name, age });
        console.log("Calculated Age in Months:", ageInMonths);
    });
});
