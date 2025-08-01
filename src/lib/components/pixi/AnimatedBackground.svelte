<script lang="ts">
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';

	let container: HTMLDivElement;
	let app: PIXI.Application;

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

			// Create animated background
			createAnimatedBackground();

			// Handle resize
			const handleResize = () => {
				app.renderer.resize(window.innerWidth, window.innerHeight);
			};
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	function createAnimatedBackground() {
		// Create particles
		interface Particle extends PIXI.Graphics {
			velocity: { x: number; y: number };
		}
		
		const particles: Particle[] = [];
		const particleCount = 50;

		for (let i = 0; i < particleCount; i++) {
			const particle = new PIXI.Graphics() as Particle;
			particle.beginFill(0xffffff, 0.6);
			particle.drawCircle(0, 0, Math.random() * 3 + 1);
			particle.endFill();

			particle.x = Math.random() * app.screen.width;
			particle.y = Math.random() * app.screen.height;
			particle.velocity = {
				x: (Math.random() - 0.5) * 2,
				y: (Math.random() - 0.5) * 2
			};

			particles.push(particle);
			app.stage.addChild(particle);
		}

		// Animation loop
		app.ticker.add(() => {
			particles.forEach(particle => {
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

<div bind:this={container} class="pixi-container"></div>

<style>
	.pixi-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
	}
</style> 