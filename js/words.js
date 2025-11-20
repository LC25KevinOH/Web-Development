document.addEventListener("DOMContentLoaded", () => {
    const phrases = document.querySelectorAll(".phrase");

    phrases.forEach(phrase => {
        phrase.addEventListener("click", () => {
            const translation = phrase.nextElementSibling;

            // Toggle the translation visibility
            translation.style.display = 
                translation.style.display === "flex" ? "none" : "flex";
                translation.style.flexDirection = "column";
        });
    });
});