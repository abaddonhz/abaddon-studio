let userEntered = false;

document.addEventListener('DOMContentLoaded', () => {
    const enterScreen = document.getElementById('enter-screen');
    const card = document.getElementById('profile-card');
    const video = document.getElementById('background-video');
    const music = document.getElementById('background-music');

    video.src = 'media/background.mp4';
    video.muted = true;
    video.loop = true;
    video.load();
    video.play().catch(() => {});

    enterScreen?.addEventListener('click', () => {
        userEntered = true;
        enterScreen.classList.add('is-hidden');

        video.currentTime = 0;
        video.play().catch(() => {});

        music.currentTime = 0;
        music.volume = 0.55;
        music.play().catch(() => {});
    });

    if (window.VanillaTilt && card) {
        VanillaTilt.init(card, {
            glare: true,
            'max-glare': 0.10,
            gyroscope: false,
            scale: 1.012,
            max: 4,
            speed: 700
        });
    }
});
