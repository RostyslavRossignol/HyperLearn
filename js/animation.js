export function initLandingAnimation() {
	const canvas = document.getElementById("network-canvas");
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	let width = window.innerWidth;
	let height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	let particles = [];

	// Цвет частиц (Indigo-500) - делаем чуть ярче
	const colorRGB = "129, 140, 248"; // indigo-400

	const config = {
		// Увеличили количество частиц
		particleCount: window.innerWidth < 768 ? 50 : 120,
		// Увеличили дистанцию соединения
		connectionDistance: 200,
		speed: 0.6,
	};

	class Particle {
		constructor() {
			this.reset();
		}

		reset() {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.vx = (Math.random() - 0.5) * config.speed;
			this.vy = (Math.random() - 0.5) * config.speed;
			// Сделали точки КРУПНЕЕ (от 2 до 6 пикселей)
			this.size = Math.random() * 4 + 2;
		}

		update() {
			this.x += this.vx;
			this.y += this.vy;

			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			// Повысили непрозрачность точек
			ctx.fillStyle = `rgba(${colorRGB}, 0.8)`;
			ctx.fill();
		}
	}

	function initParticles() {
		particles = [];
		for (let i = 0; i < config.particleCount; i++) {
			particles.push(new Particle());
		}
	}

	function animate() {
		ctx.clearRect(0, 0, width, height);

		for (let i = 0; i < particles.length; i++) {
			let p = particles[i];
			p.update();
			p.draw();

			for (let j = i; j < particles.length; j++) {
				let p2 = particles[j];
				let dx = p.x - p2.x;
				let dy = p.y - p2.y;
				let dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < config.connectionDistance) {
					ctx.beginPath();
					let opacity = 1 - dist / config.connectionDistance;
					// Линии ТОЛЩЕ и ЯРЧЕ
					ctx.strokeStyle = `rgba(${colorRGB}, ${opacity * 0.6})`;
					ctx.lineWidth = 2; // Было 1
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(p2.x, p2.y);
					ctx.stroke();
				}
			}
		}
		requestAnimationFrame(animate);
	}

	window.addEventListener("resize", () => {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
		initParticles();
	});

	initParticles();
	animate();
}
