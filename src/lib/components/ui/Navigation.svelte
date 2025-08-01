<script lang="ts">
	import { onMount } from 'svelte';

	let nav;
	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<nav class="nav" class:scrolled={scrolled} bind:this={nav}>
	<div class="nav-content">
		<a href="#" class="nav-logo">Sam Muller</a>
		<ul class="nav-links">
			<li><a href="#" on:click|preventDefault={() => scrollToSection('about')}>About</a></li>
			<li><a href="#" on:click|preventDefault={() => scrollToSection('projects')}>Projects</a></li>
			<li><a href="#" on:click|preventDefault={() => scrollToSection('skills')}>Skills</a></li>
			<li><a href="#" on:click|preventDefault={() => scrollToSection('contact')}>Contact</a></li>
		</ul>
	</div>
</nav>

<style>
	.nav {
		transition: all 0.3s ease;
	}

	.nav.scrolled {
		background: rgba(255, 255, 255, 0.98);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
	}
</style> 