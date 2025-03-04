document.addEventListener("DOMContentLoaded", function () {
    // Create overlay container
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

    // Create the overlay image
    const overlayImage = document.createElement("img");
    overlayImage.style.maxWidth = "90%";
    overlayImage.style.maxHeight = "90%";
    overlay.appendChild(overlayImage);

    // Close overlay when clicked
    overlay.addEventListener("click", function () {
        overlay.style.display = "none";
    });

    document.body.appendChild(overlay);

    // Add click event to all images
    document.querySelectorAll(".clickable-image").forEach(image => {
        image.addEventListener("click", function () {
            overlayImage.src = this.src;
            overlay.style.display = "flex";
        });
    });
});
