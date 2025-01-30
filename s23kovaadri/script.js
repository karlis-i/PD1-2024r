function scrollGallery(target) {
    let i = 0;

    // Set initial image + text.
    target.style.backgroundImage = `url('images/${images[i]}')`;
    let text_target = document.getElementById(images[i].substring(0, images[i].length - 4));

    text_target.classList.add("visible");
    target.classList.add("visible");
    text_target.style.display = "block";
    
    // Loop through rest.
    setInterval(() => {
        // Plays fade out animation.
        text_target.classList.remove("visible");
        target.classList.remove("visible");

        // Hide previously active text after animation finishes.
        setTimeout(() => {
            // Changing opacity instead of 'display' makes the text stack, making a massive text container.
            // As changing opacity doesn't fully hide the text, we make use of 'display' to remove it.
            text_target.style.display = "none";
        }, 1000);

        i++;
        if (i >= images.length) {
            i = 0;
        }

        // Set next image + text entry
        setTimeout(() => {
            target.style.backgroundImage = `url('images/${images[i]}')`;
            text_target = document.getElementById(images[i].substring(0, images[i].length - 4));
            text_target.style.display = "block";
            
            // Plays fade in animation
            setTimeout(() => {
                // Source: ChatGPT. If element's 'display' property is set to 'block' as the opacity changes then animation doesn't work.
                // To circumvent this we append the class responsible for the animation a non-specific time after setting 'display'. 
                text_target.classList.add("visible");
                target.classList.add("visible");
            }, 10);
        }, 1000); // Length of animation.
    }, 16000); // Interval between gallery entries.
}

images = ['office.png', 'ups.jpg', 'athlete.png', 'reporter.png', 'security.jpg'];
let target = document.querySelector(".gallery-container");

scrollGallery(target);