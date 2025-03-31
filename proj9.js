// proj9.js

// Function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        bgColor: params.get('bgColor'),
        textColor: params.get('textColor'),
        fontSize: params.get('fontSize')
    };
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to get a cookie by name
function getCookie(name) {
    const cookieArr = document.cookie.split('; ');
    for (let c of cookieArr) {
        const [key, val] = c.split('=');
        if (key === name) return decodeURIComponent(val);
    }
    return null;
}

// Function to apply preferences to the page
function applyPreferences(prefs) {
    if (prefs.bgColor) document.body.style.backgroundColor = prefs.bgColor;
    if (prefs.textColor) document.body.style.color = prefs.textColor;
    if (prefs.fontSize) document.body.style.fontSize = prefs.fontSize;
}

// Main logic to run on page load
document.addEventListener("DOMContentLoaded", () => {
    const prefsFromQuery = getQueryParams();

    // If user submitted the form with new preferences, apply and store them
    if (prefsFromQuery.bgColor || prefsFromQuery.textColor || prefsFromQuery.fontSize) {
        applyPreferences(prefsFromQuery);

        // Save in cookies (7 days)
        if (prefsFromQuery.bgColor) setCookie('bgColor', prefsFromQuery.bgColor, 7);
        if (prefsFromQuery.textColor) setCookie('textColor', prefsFromQuery.textColor, 7);
        if (prefsFromQuery.fontSize) setCookie('fontSize', prefsFromQuery.fontSize, 7);
    } else {
        // No query params — check cookies
        const savedPrefs = {
            bgColor: getCookie('bgColor'),
            textColor: getCookie('textColor'),
            fontSize: getCookie('fontSize')
        };
        applyPreferences(savedPrefs);
    }
});
