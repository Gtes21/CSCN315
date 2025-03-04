document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms.registrationForm;
    const errorDisplay = document.getElementById("formErrors");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        try {
            errorDisplay.innerHTML = ""; // Clear previous errors
            let errors = [];

            // Validate Full Name
            if (!/^[A-Za-z\s]+$/.test(form.fullName.value.trim())) {
                errors.push("Full Name must contain only letters and spaces.");
            }

            // Validate Username (6-15 alphanumeric, cannot start with a number)
            if (!/^[A-Za-z][A-Za-z0-9]{5,14}$/.test(form.username.value.trim())) {
                errors.push("Username must be 6-15 characters, start with a letter, and contain only letters & numbers.");
            }

            // Validate Email
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email.value.trim())) {
                errors.push("Invalid email format.");
            }

            // Validate Password (8-20 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special)
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(form.password.value)) {
                errors.push("Password must be 8-20 chars, including an uppercase, a lowercase, a digit, and a special character.");
            }

            // Confirm Password Match
            if (form.password.value !== form.confirmPassword.value) {
                errors.push("Passwords do not match.");
            }

            // Validate Phone Number (Format: 123-456-7890)
            if (!/^\d{3}-\d{3}-\d{4}$/.test(form.phoneNumber.value.trim())) {
                errors.push("Phone number must be in 123-456-7890 format.");
            }

            // Validate Date of Birth (User must be 18+)
            let dob = new Date(form.dob.value);
            let age = new Date().getFullYear() - dob.getFullYear();
            if (age < 18 || isNaN(age)) {
                errors.push("You must be at least 18 years old.");
            }

            // Validate Agree to Terms Checkbox
            if (!form.agreeTerms.checked) {
                errors.push("You must agree to the terms and conditions.");
            }

            if (errors.length > 0) {
                throw new Error(errors.join("<br>"));
            }

            alert("Registration Successful!");
        } catch (error) {
            errorDisplay.innerHTML = error.message;
            console.error("Form Validation Error:", error.message);
        }
    });
});
