// final.js – Consolidated JavaScript for all pages

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------
    // 1. Dropdown Navigation
    // ----------------------
    const toggle = document.getElementById("collectionToggle");
    const menu = document.getElementById("collectionMenu");
    if (toggle && menu) {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
      });
      window.addEventListener("click", (e) => {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
          menu.style.display = "none";
        }
      });
    }
  
    // ----------------------
    // 2. Image Overlay
    // ----------------------
    if (document.querySelector(".clickable-image")) {
      const overlay = document.createElement("div");
      overlay.id = "imageOverlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      overlay.style.display = "none";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = "1000";
  
      const overlayImage = document.createElement("img");
      overlayImage.style.maxWidth = "90%";
      overlayImage.style.maxHeight = "90%";
      overlay.appendChild(overlayImage);
  
      overlay.addEventListener("click", () => {
        overlay.style.display = "none";
      });
  
      document.body.appendChild(overlay);
  
      document.querySelectorAll(".clickable-image").forEach(image => {
        image.addEventListener("click", () => {
          overlayImage.src = image.dataset.altSrc || image.src;
          overlay.style.display = "flex";
        });
      });
    }
  
    // ----------------------
    // 3. Form Validation (User Form)
    // ----------------------
    const form = document.forms?.registrationForm;
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const errors = [];
        const { fullName, username, email, password, confirmPassword, phoneNumber, dob, agreeTerms } = form;
        const err = document.getElementById("formErrors");
  
        if (!/^[A-Za-z\s]+$/.test(fullName.value)) errors.push("Full name invalid");
        if (!/^[A-Za-z][A-Za-z0-9]{5,14}$/.test(username.value)) errors.push("Username invalid");
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email.value)) errors.push("Email invalid");
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password.value)) errors.push("Password invalid");
        if (password.value !== confirmPassword.value) errors.push("Passwords don't match");
        if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber.value)) errors.push("Phone format invalid");
        if (!dob.value || new Date().getFullYear() - new Date(dob.value).getFullYear() < 18) errors.push("Must be 18+");
        if (!agreeTerms.checked) errors.push("You must agree to terms");
  
        if (errors.length > 0) {
          err.innerHTML = errors.join("<br>");
          return;
        }
        alert("Registration Successful!");
      });
    }
  
    // ----------------------
    // 4. Cookie-Based Customization (Customize Page)
    // ----------------------
    function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        bgColor: params.get('bgColor'),
        textColor: params.get('textColor'),
        fontSize: params.get('fontSize'),
        fontFamily: params.get('fontFamily')
      };
    }
  
    function setCookie(name, value, days) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }
  
    function getCookie(name) {
      return document.cookie.split('; ').reduce((acc, cur) => {
        const [k, v] = cur.split('=');
        return k === name ? decodeURIComponent(v) : acc;
      }, null);
    }
  
    function applyPreferences(prefs) {
      if (prefs.bgColor) document.body.style.backgroundColor = prefs.bgColor;
      if (prefs.textColor) document.body.style.color = prefs.textColor;
      if (prefs.fontSize) document.body.style.fontSize = prefs.fontSize;
      if (prefs.fontFamily) document.body.style.fontFamily = prefs.fontFamily;
    }
  
    if (document.getElementById("customForm")) {
      const prefs = getQueryParams();
      if (prefs.bgColor || prefs.textColor || prefs.fontSize || prefs.fontFamily) {
        applyPreferences(prefs);
        Object.entries(prefs).forEach(([k, v]) => v && setCookie(k, v, 7));
      } else {
        applyPreferences({
          bgColor: getCookie("bgColor"),
          textColor: getCookie("textColor"),
          fontSize: getCookie("fontSize"),
          fontFamily: getCookie("fontFamily")
        });
      }
    }
  
    // ----------------------
    // 5. Cat API (Fetch & XHR)
    // ----------------------
    if (document.getElementById("loadCats")) {
      const fetchCatImg = document.getElementById("fetchCat");
      const xhrCatImg = document.getElementById("xhrCat");
      const fetchError = document.getElementById("fetchError");
      const xhrError = document.getElementById("xhrError");
  
      document.getElementById("loadCats").addEventListener("click", () => {
        fetch("https://api.thecatapi.com/v1/images/search")
          .then(res => res.json())
          .then(data => fetchCatImg.src = data[0].url)
          .catch(() => fetchError.textContent = "😿 Unable to fetch cat");
  
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.thecatapi.com/v1/images/search");
        xhr.onload = () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            xhrCatImg.src = data[0].url;
          } else {
            xhrError.textContent = "🙀 XMLHttpRequest failed";
          }
        };
        xhr.onerror = () => xhrError.textContent = "😿 Network error (XHR)";
        xhr.send();
      });
    }
  
    // ----------------------
    // 6. ES6 Class (Task Manager)
    // ----------------------
    if (document.getElementById("createTask")) {
      class Task {
        constructor(title, description) {
          this.title = title;
          this.description = description;
          this.completed = false;
        }
  
        markCompleted() {
          this.completed = true;
        }
  
        updateDetails(title, description) {
          this.title = title;
          this.description = description;
        }
  
        getSummary() {
          return `${this.title}: ${this.description} [${this.completed ? 'Completed' : 'Pending'}]`;
        }
      }
  
      const taskArray = [];
      const taskList = document.getElementById("taskList");
  
      function renderTasks() {
        taskList.innerHTML = "";
        taskArray.forEach((task, i) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${task.title}</strong> - ${task.description} [${task.completed ? '✅' : '❌'}]
            <button onclick="markComplete(${i})">Complete</button>
            <button onclick="updateTask(${i})">Edit</button>
            <button onclick="alert('${task.getSummary()}')">Summary</button>`;
          taskList.appendChild(li);
        });
      }
  
      window.markComplete = i => {
        taskArray[i].markCompleted();
        renderTasks();
      };
      window.updateTask = i => {
        const newTitle = prompt("New title:", taskArray[i].title);
        const newDesc = prompt("New description:", taskArray[i].description);
        if (newTitle && newDesc) {
          taskArray[i].updateDetails(newTitle, newDesc);
          renderTasks();
        }
      };
  
      document.getElementById("createTask").addEventListener("click", () => {
        const title = document.getElementById("taskTitle").value;
        const desc = document.getElementById("taskDesc").value;
        if (title && desc) {
          taskArray.push(new Task(title, desc));
          renderTasks();
        }
      });
    }
    
    // ----------------------
    // 7. Experience Page Toggle
    // ----------------------
    document.querySelectorAll(".experience-box").forEach(box => {
      const summary = box.querySelector(".summary");
      const details = box.querySelector(".details");

      details.style.display = "none";
      summary.style.cursor = "pointer";

      summary.addEventListener("click", () => {
        details.style.display = details.style.display === "none" ? "block" : "none";
      });
    });
  });
  
  //change background color into dark mode in index.
  function changeColor() {
    document.body.classList.toggle("dark");
  }