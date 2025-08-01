<script lang="ts">
	import AnimatedBackground from '$lib/components/pixi/AnimatedBackground.svelte';
	import Navigation from '$lib/components/ui/Navigation.svelte';
	import Hero from '$lib/components/ui/Hero.svelte';
	import About from '$lib/components/ui/About.svelte';
	import Projects from '$lib/components/ui/Projects.svelte';
	import Skills from '$lib/components/ui/Skills.svelte';
	import Contact from '$lib/components/ui/Contact.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
</script>

<svelte:head>
	<title>Sam Muller - Full-Stack Developer</title>
	<meta name="description" content="Full-stack developer with background in game development, specializing in React, Svelte, FastAPI, and interactive user experiences" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
	<AnimatedBackground />
	
	<Navigation />
	
	<section class="hero">
		<Hero />
	</section>
	
	<section class="section" id="about">
		<About />
	</section>
	
	<section class="section" id="projects">
		<Projects />
	</section>
	
	<section class="section" id="skills">
		<Skills />
	</section>
	
	<section class="section" id="contact">
		<Contact />
	</section>
	
	<Footer />
</main> 