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

    // Create the overlay image (Using createElement())
    const overlayImage = document.createElement("img");
    overlayImage.style.width = "40%";  // Reduced size to 40% of screen width
    overlayImage.style.maxHeight = "50%";  // Prevents it from being too large
    overlayImage.style.border = "3px solid white";
    overlayImage.style.boxShadow = "0px 0px 10px white";
    overlayImage.style.opacity = "0.9";
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
