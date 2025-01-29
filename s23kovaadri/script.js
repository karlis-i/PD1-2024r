function scrollGallery(target) {
    let i = 0;

    // set initial image + text
    target.style.backgroundImage = `url('images/${images[i]}')`;
    let text_target = document.getElementById(images[i].substring(0, images[i].length - 4));
    text_target.classList.add("visible");
    target.classList.add("visible");
    text_target.style.display = "block";
    
    // loop through rest
    setInterval(() => {
        text_target.classList.remove("visible");
        target.classList.remove("visible");

        setTimeout(() => {
            text_target.style.display = "none";
        }, 1000);

        i++;
        if (i >= images.length) {
            i = 0;
        }

        setTimeout(() => {
            target.style.backgroundImage = `url('images/${images[i]}')`;
            text_target = document.getElementById(images[i].substring(0, images[i].length - 4));
            text_target.style.display = "block";
            setTimeout(() => {
                text_target.classList.add("visible");
                target.classList.add("visible");
            }, 10); // add a delay so the fade animation doesn't play when the object doesn't exist
        }, 1000); // length of anim
    }, 16000); // interval between gallery entries
}

images = ['office.png', 'ups.jpg', 'athlete.png', 'reporter.png', 'security.jpg'];
let target = document.querySelector(".gallery-container");

scrollGallery(target);