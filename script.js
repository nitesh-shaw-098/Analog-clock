var second = 0;
var minute = 0;
var hour = 0;
var d = new Date();

setInterval(
    function() {
        d = new Date();
        second = d.getSeconds() * 6;
        minute = d.getMinutes() * 6;
        hour =d.getHours() * 30 + Math.round(minute / 12);
        document.getElementById("second-hand").style.transform = "rotate(" + second + "deg)";
        document.getElementById("minute-hand").style.transform = "rotate(" + minute + "deg)";
        document.getElementById("hour-hand").style.transform = "rotate(" + hour + "deg)";
    }, 1000
)

// PARTICLE BACKGROUND
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth = canvas.parentElement.offsetWidth;
      canvas.height = canvas.offsetHeight = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // bounce inside circle
        const centerX = canvas.width/2;
        const centerY = canvas.height/2;
        const distFromCenter = Math.sqrt(
          (this.x - centerX) ** 2 + (this.y - centerY) ** 2
        );

        if (distFromCenter + this.radius > canvas.width/2) {
          this.speedX *= -1;
          this.speedY *= -1;
        }

        this.draw();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 40; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 1;
        let speedY = (Math.random() - 0.5) * 1;
        particles.push(new Particle(x, y, radius, speedX, speedY));
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();