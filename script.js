const madre = document.getElementById('madre');
const sho = document.getElementById('sho');
const memory = document.getElementById('memory');
const gallery = document.getElementById('gallery');

const audio = document.getElementById('background-audio');
let audioFadingIn = false;
let audioFadingOut = false;
let fadeInterval = null;

function setVisibility(element, visible) {
    element.classList.toggle('visible', visible);
    element.style.opacity = visible ? 1 : 0;
    element.style.pointerEvents = visible ? 'auto' : 'none';
}

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;
    const maxDisplacement = window.innerHeight * 0.5;
    const displacement = scrollProgress * maxDisplacement;

    // Move GIFs while visible
    madre.style.transform = `translate(-50%, calc(-50% - ${displacement}px))`;
    sho.style.transform = `translate(-50%, calc(-50% + ${displacement}px))`;

    // --- GIF Opacity Choreography ---
    if (scrollProgress < 0.2) {
        madre.style.opacity = 1;
        sho.style.opacity = 0;
        setVisibility(memory, false);
    } else if (scrollProgress < 0.3) {
        madre.style.opacity = 1 - (scrollProgress - 0.2) * 10; // faster fade
        sho.style.opacity = (scrollProgress - 0.2) * 10;
        setVisibility(memory, false);
    } else {
        madre.style.opacity = 0;
        sho.style.opacity = 0;
        // Memory visible for shorter duration
        setVisibility(memory, scrollProgress < 0.35);
    }

    // --- Gallery Appearance & Audio Control ---
    // Starts fading in immediately after memory
    if (scrollProgress >= 0.33 && scrollProgress <= 0.35) {
        gallery.style.opacity = (scrollProgress - 0.33) / 0.02; // fade in quickly
        setVisibility(gallery, true);
    } else if (scrollProgress > 0.35) {
        setVisibility(gallery, true);
        gallery.style.opacity = 1;
        fadeInAudio(audio, 2000); // fade in over 2 seconds
    } else {
        setVisibility(gallery, false);
        gallery.style.opacity = 0;
        fadeOutAudio(audio, 1000); // fade out over 1 second when scrolling away
    }
});

function fadeInAudio(audio, duration = 2000) {
    if (!audioFadingIn && audio.paused) {
        // Clear any existing fade out
        if (fadeInterval) {
            clearInterval(fadeInterval);
            fadeInterval = null;
        }
        audioFadingIn = true;
        audioFadingOut = false;
        audio.volume = 0;
        audio.play().then(() => {
            console.log("Audio started playing successfully");
        }).catch(err => {
            console.log("Audio play failed:", err);
        });
        const stepTime = 50; // interval in ms
        const step = stepTime / duration;
        let vol = 0;
        fadeInterval = setInterval(() => {
            vol += step;
            if (vol >= 1) {
                audio.volume = 1;
                clearInterval(fadeInterval);
                fadeInterval = null;
                audioFadingIn = false;
                console.log("Audio fade-in complete, volume at:", audio.volume);
            } else {
                audio.volume = vol;
            }
        }, stepTime);
    }
}

function fadeOutAudio(audio, duration = 1000) {
    if (!audioFadingOut && !audio.paused) {
        // Clear any existing fade in
        if (fadeInterval) {
            clearInterval(fadeInterval);
            fadeInterval = null;
        }
        audioFadingOut = true;
        audioFadingIn = false;
        const stepTime = 50; // interval in ms
        const step = stepTime / duration;
        let vol = audio.volume;
        fadeInterval = setInterval(() => {
            vol -= step;
            if (vol <= 0) {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeInterval);
                fadeInterval = null;
                audioFadingOut = false;
                console.log("Audio fade-out complete, paused");
            } else {
                audio.volume = vol;
            }
        }, stepTime);
    }
}

// Add event listeners to monitor audio status
audio.addEventListener('play', () => {
    console.log("Audio is now playing");
});

audio.addEventListener('pause', () => {
    console.log("Audio paused");
});

audio.addEventListener('error', (e) => {
    console.log("Audio error:", e);
});