// Scroll-based GIF positioning
const madre = document.getElementById('madre');
const sho = document.getElementById('sho');

addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // Calculate displacement based on scroll
    // When scrollProgress is 0 (top), GIFs are together
    // When scrollProgress increases, GIFs move apart
    const maxDisplacement = window.innerWidth * 0.3; // 30% of screen width
    const displacement = scrollProgress * maxDisplacement;

    // Move madre to the left and sho to the right using transforms
    madre.style.transform = `translateY(-50%) translateX(calc(-50% - ${displacement}px))`;
    sho.style.transform = `translateY(-50%) translateX(calc(-50% + ${displacement}px))`;
});