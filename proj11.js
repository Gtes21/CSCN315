// proj11.js

// This script loads two random cat images using a third-party API: https://thecatapi.com
// It demonstrates both fetch() and XMLHttpRequest for comparison.

// DOM loaded event
document.addEventListener("DOMContentLoaded", () => {
    const fetchCatImg = document.getElementById("fetchCat");
    const xhrCatImg = document.getElementById("xhrCat");
    const fetchError = document.getElementById("fetchError");
    const xhrError = document.getElementById("xhrError");
  
    const loadCatsBtn = document.getElementById("loadCats");
    loadCatsBtn.addEventListener("click", () => {
      loadCatWithFetch();       // Load cat using fetch()
      loadCatWithXHR();         // Load cat using XMLHttpRequest
    });
  
    // -----------------------------
    // FETCH EXAMPLE
    // Modern way to retrieve data from APIs.
    // Easier syntax using Promises and built-in error handling.
    // -----------------------------
    function loadCatWithFetch() {
      fetchError.textContent = "";
      fetchCatImg.src = "";
  
      fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => {
          if (!response.ok) {
            throw new Error("Fetch failed");
          }
          return response.json();
        })
        .then(data => {
          fetchCatImg.src = data[0].url;
        })
        .catch(err => {
          console.error("Fetch Error:", err);
          fetchError.textContent = "😿 Unable to fetch cat using fetch()";
        });
    }
  
    // -----------------------------
    // XHR EXAMPLE
    // Older method using XMLHttpRequest.
    // Requires more lines of code and manual event handling.
    // Still supported for compatibility with older systems.
    // -----------------------------
    function loadCatWithXHR() {
      xhrError.textContent = "";
      xhrCatImg.src = "";
  
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.thecatapi.com/v1/images/search");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          xhrCatImg.src = data[0].url;
        } else {
          xhrError.textContent = "🙀 XMLHttpRequest failed.";
        }
      };
      xhr.onerror = function () {
        xhrError.textContent = "😿 Network error (XHR)";
      };
      xhr.send();
    }
  });
  