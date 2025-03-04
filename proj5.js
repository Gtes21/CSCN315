document.addEventListener("DOMContentLoaded", function () {
    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = "imageOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "80px";  // Adjusted to be below the navbar
    overlay.style.left = "50%";
    overlay.style.transform = "translateX(-50%)";  // Centers horizontally
    overlay.style.width = "90%";  // Takes up most of the body but not full screen
    overlay.style.maxWidth = "600px";  // Ensures it's not too large
    overlay.style.backgroundColor = "rgba(255, 255, 255, 0.95)";  // Light background for contrast
    overlay.style.padding = "10px";
    overlay.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    overlay.style.borderRadius = "10px";
    overlay.style.display = "none";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    // Create the overlay image (Using CreateElement())
    const overlayImage = document.createElement("img");
    overlayImage.style.width = "100%";  // Ensures it scales within the box
    overlayImage.style.borderRadius = "8px";
    overlay.appendChild(overlayImage); //appendChild()

    // Close overlay when clicked
    overlay.addEventListener("click", function () {
        overlay.style.display = "none";
    });

    document.body.appendChild(overlay);

    // Add click event to all images
    document.querySelectorAll(".clickable-image").forEach(image => {
        image.addEventListener("click", function () {
            overlayImage.src = this.dataset.altSrc || this.src;
            overlay.style.display = "flex";
        });
    });
});
