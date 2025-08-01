<script lang="ts">
	import { onMount } from 'svelte';

	let heroContent;

	onMount(() => {
		if (heroContent) {
			heroContent.classList.add('fade-in');
		}
	});
</script>

<div class="hero-content" bind:this={heroContent}>
	<h1>Hi, I'm Sam Muller</h1>
	<p>Full-Stack Developer & Game Developer</p>
	<p>I create interactive, high-performance user experiences with modern technologies</p>
	<a href="#projects" class="cta-button">View My Work</a>
</div>

<style>
	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.hero-content h1 {
		margin-bottom: 1.5rem;
		animation: slideUp 1s ease-out 0.2s both;
	}

	.hero-content p {
		margin-bottom: 1rem;
		animation: slideUp 1s ease-out 0.4s both;
	}

	.hero-content p:last-of-type {
		margin-bottom: 2rem;
		animation: slideUp 1s ease-out 0.6s both;
	}

	.cta-button {
		animation: slideUp 1s ease-out 0.8s both;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style> 