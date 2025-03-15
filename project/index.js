document.addEventListener("DOMContentLoaded", function () {
    let progress = document.querySelector(".progress");
    let loadingText = document.getElementById("loading-text");
    let load = 0;

    let interval = setInterval(() => {
        load++;
        progress.style.width = load + "%";
        loadingText.textContent = "Loading " + load + "%";

        if (load >= 100) {
            clearInterval(interval);
            document.getElementById("preloader").style.display = "none";
        }
    }, 55); 
});
