(() => {
    const colors = ['#ffffff', '#ffffff', '#d71920', '#ffffff', '#b30009'];
    const particles = [];
    const maxParticles = 110;
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;

    function spawn(x, y) {
        if (particles.length >= maxParticles) return;

        const star = document.createElement('span');
        const isCross = Math.random() > 0.35;
        const size = isCross ? 6 + Math.random() * 4 : 2 + Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];

        star.style.position = 'fixed';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9000';
        star.style.transform = 'translate(-50%, -50%)';
        star.style.opacity = '1';
        star.style.filter = `drop-shadow(0 0 5px ${color})`;

        if (isCross) {
            star.style.background = `linear-gradient(${color},${color}) center/1px 100% no-repeat, linear-gradient(90deg,${color},${color}) center/100% 1px no-repeat`;
        } else {
            star.style.borderRadius = '50%';
            star.style.background = color;
        }

        document.body.appendChild(star);

        const p = {
            el: star,
            x,
            y,
            vx: (Math.random() - 0.5) * 0.55,
            vy: 0.45 + Math.random() * 0.8,
            life: 1,
            decay: 0.018 + Math.random() * 0.018,
            rot: Math.random() * 180,
            spin: (Math.random() - 0.5) * 3
        };

        particles.push(p);
    }

    function animate() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            p.rot += p.spin;

            if (p.life <= 0) {
                p.el.remove();
                particles.splice(i, 1);
                continue;
            }

            p.el.style.left = `${p.x}px`;
            p.el.style.top = `${p.y}px`;
            p.el.style.opacity = `${Math.max(0, p.life)}`;
            p.el.style.transform = `translate(-50%, -50%) rotate(${p.rot}deg) scale(${0.7 + p.life * 0.45})`;
        }
        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (event) => {
        if (event.buttons) return;
        const now = performance.now();
        const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
        if (distance < 5 || now - lastSpawn < 10) return;

        lastX = event.clientX;
        lastY = event.clientY;
        lastSpawn = now;

        const count = Math.min(3, Math.max(1, Math.floor(distance / 14)));
        for (let i = 0; i < count; i++) {
            spawn(event.clientX + (Math.random() - 0.5) * 8, event.clientY + (Math.random() - 0.5) * 8);
        }
    });

    animate();
})();
