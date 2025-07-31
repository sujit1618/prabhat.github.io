document.addEventListener("DOMContentLoaded", function() {
    // Get the current file name from the URL
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1) || "index.html";

    // Create an h1 element and set its text
    const h1 = document.createElement("h1");
    h1.textContent = fileName;

    // Append the h1 to the body
    document.body.prepend(h1);
});