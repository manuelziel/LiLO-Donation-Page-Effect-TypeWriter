"use strict";
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('effectContainer');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    class ThankYouTypewriter {
        constructor(elementId) {
            this.element = document.getElementById(elementId);
            this.initTypewriter();
        }

        initTypewriter() {
            const typewriter = new Typewriter(this.element, {
                loop: true,
                delay: 60,
                deleteSpeed:1
            });

            typewriter
                .pauseFor(500)
                .typeString('Du bist offiziell unser <strong>Held</strong> des Tages!')
                .pauseFor(2000)
                .deleteChars(21)
                .typeString('<strong>GROßARTIG!</strong>')
                .pauseFor(2000)
                .deleteAll()
                .typeString('Zusammen bauen wir eine bessere Ortenau.')
                .pauseFor(2000)
                .deleteChars(21)
                .typeString('eine lebenswerte Ortenau.')
                .pauseFor(2000)
                .deleteAll()
                .typeString('Jede Spende trägt zur Veränderung bei.')
                .pauseFor(2000)
                .deleteAll()
                .typeString('<strong>Danke</strong> für Deine Unterstützung!')
                .pauseFor(2000)
                .deleteAll()
                .typeString('<strong>Gemeinsam</strong> können wir noch mehr erreichen.')
                .pauseFor(2000)
                .deleteChars(31)
                .typeString('stärken wir unsere Stimme.')
                .pauseFor (2000)
                .deleteChars(26)
                .typeString('kämpfen wir für mehr Gerechtigkeit!')
                .pauseFor (2000)
                .deleteAll()
                .start();
        }
    }

    new ThankYouTypewriter('info');

    var requestFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = random(1, 5);
            this.speedX = random(-1.5, 1);
            this.speedY = random(-1.5, 1);
            this.color = `hsl(${parseInt(random(0, 360), 10)}, 60%, 80%)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= 0.99;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    let particles = [];

    function handleParticles() {
        for (let i = 0; i < 3; i++) {
            particles.push(new Particle(canvas.width / 2, canvas.height / 2));
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.3) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
});