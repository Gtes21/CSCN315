document.addEventListener("DOMContentLoaded", function () {
    // Requirement #1: Handling User Interests with Checkboxes & Textbox
    const interestList = document.getElementById("interestList");
    const interests = new Set();

    document.querySelectorAll(".interest").forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                interests.add(this.value);
            } else {
                interests.delete(this.value);
            }
            updateInterestList();
        });
    });

    document.getElementById("addInterest").addEventListener("click", function () {
        const customInterest = document.getElementById("customInterest").value.trim();
        if (customInterest && !interests.has(customInterest)) {
            interests.add(customInterest);
            updateInterestList();
            document.getElementById("customInterest").value = "";
        }
    });

    document.getElementById("clearInterests").addEventListener("click", function () {
        interests.clear();
        updateInterestList();
    });

    function updateInterestList() {
        interestList.innerHTML = "";
        interests.forEach(interest => {
            const li = document.createElement("li");
            li.textContent = interest;
            interestList.appendChild(li);
        });
    }

    // Requirement #2: Phone Number Validation with Regex
    document.getElementById("validatePhone").addEventListener("click", function () {
        const phoneInput = document.getElementById("phoneNumber").value.trim();
        const phoneFeedback = document.getElementById("phoneFeedback");
        const phoneRegex = /^\d{10}$/;  // Allows only 10-digit numbers

        if (phoneRegex.test(phoneInput)) {
            phoneFeedback.textContent = "✅ Valid phone number!";
            phoneFeedback.style.color = "green";
        } else {
            phoneFeedback.textContent = "❌ Invalid phone number. Enter 10 digits only.";
            phoneFeedback.style.color = "red";
        }
    });

    // Requirement #3: File Upload & Display Contents
    document.getElementById("readFile").addEventListener("click", function () {
        const fileInput = document.getElementById("fileUpload").files[0];
        const fileContents = document.getElementById("fileContents");

        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fileContents.textContent = e.target.result;
            };
            reader.readAsText(fileInput);
        } else {
            fileContents.textContent = "❌ No file selected.";
        }
    });
});
