const madre = document.getElementById('madre');
const sho = document.getElementById('sho');
const memory = document.getElementById('memory');

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // vertical displacement
    const maxDisplacement = window.innerHeight * 0.3;
    const displacement = scrollProgress * maxDisplacement;

    madre.style.transform = `translate(-50%, calc(-50% - ${displacement}px))`;
    sho.style.transform = `translate(-50%, calc(-50% + ${displacement}px))`;

    // opacity choreography
    if (scrollProgress < 0.3) {
        madre.style.opacity = 1;
        sho.style.opacity = 0;
        memory.style.opacity = 0;
    } else if (scrollProgress < 0.45) {
        // Memory text fades in from 0.3 to 0.45
        madre.style.opacity = 1 - (scrollProgress - 0.3) * 6.67;
        sho.style.opacity = (scrollProgress - 0.3) * 6.67;
        memory.style.opacity = (scrollProgress - 0.3) * 6.67;
    } else if (scrollProgress <= 0.55) {
        // Memory text is fully clear in the middle (0.45 to 0.55)
        madre.style.opacity = 0;
        sho.style.opacity = 1;
        memory.style.opacity = 1;
    } else {
        // Memory text fades out after 0.55
        madre.style.opacity = 0;
        sho.style.opacity = 1 - (scrollProgress - 0.55) * 2.22;
        memory.style.opacity = 1 - (scrollProgress - 0.55) * 2.22;
    }
});
