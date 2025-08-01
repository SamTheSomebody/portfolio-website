<script lang="ts">
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';

	let container: HTMLDivElement;
	let app: PIXI.Application;
	let mouseX = 0;
	let mouseY = 0;

	onMount(() => {
		if (container) {
			// Initialize PixiJS
			app = new PIXI.Application({
				width: window.innerWidth,
				height: window.innerHeight,
				backgroundColor: 0x000000,
				resolution: window.devicePixelRatio || 1,
				autoDensity: true
			});

			container.appendChild(app.view as HTMLCanvasElement);

			// Create interactive particles
			createInteractiveParticles();

			// Handle resize
			const handleResize = () => {
				app.renderer.resize(window.innerWidth, window.innerHeight);
			};
			window.addEventListener('resize', handleResize);

			// Handle mouse movement
			const handleMouseMove = (event: MouseEvent) => {
				mouseX = event.clientX;
				mouseY = event.clientY;
			};
			window.addEventListener('mousemove', handleMouseMove);

			return () => {
				window.removeEventListener('resize', handleResize);
				window.removeEventListener('mousemove', handleMouseMove);
			};
		}
	});

	function createInteractiveParticles() {
		interface InteractiveParticle extends PIXI.Graphics {
			velocity: { x: number; y: number };
			originalX: number;
			originalY: number;
		}
		
		const particles: InteractiveParticle[] = [];
		const particleCount = 30;

		for (let i = 0; i < particleCount; i++) {
			const particle = new PIXI.Graphics() as InteractiveParticle;
			particle.beginFill(0x667eea, 0.8);
			particle.drawCircle(0, 0, Math.random() * 4 + 2);
			particle.endFill();

			particle.x = Math.random() * app.screen.width;
			particle.y = Math.random() * app.screen.height;
			particle.originalX = particle.x;
			particle.originalY = particle.y;
			particle.velocity = {
				x: (Math.random() - 0.5) * 1,
				y: (Math.random() - 0.5) * 1
			};

			particles.push(particle);
			app.stage.addChild(particle);
		}

		// Animation loop
		app.ticker.add(() => {
			particles.forEach(particle => {
				// Calculate distance from mouse
				const dx = mouseX - particle.x;
				const dy = mouseY - particle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const maxDistance = 150;

				if (distance < maxDistance) {
					// Repel particles from mouse
					const force = (maxDistance - distance) / maxDistance;
					particle.x -= dx * force * 0.02;
					particle.y -= dy * force * 0.02;
				} else {
					// Return to original position
					const returnForce = 0.05;
					particle.x += (particle.originalX - particle.x) * returnForce;
					particle.y += (particle.originalY - particle.y) * returnForce;
				}

				// Add some natural movement
				particle.x += particle.velocity.x;
				particle.y += particle.velocity.y;

				// Wrap around screen
				if (particle.x < 0) particle.x = app.screen.width;
				if (particle.x > app.screen.width) particle.x = 0;
				if (particle.y < 0) particle.y = app.screen.height;
				if (particle.y > app.screen.height) particle.y = 0;
			});
		});
	}
</script>

<div bind:this={container} class="interactive-particles"></div>

<style>
	.interactive-particles {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
	}
</style> 