<script lang="ts">
	import { onMount } from 'svelte';

	let aboutSection;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('slide-up');
				}
			});
		}, { threshold: 0.1 });

		if (aboutSection) {
			observer.observe(aboutSection);
		}

		return () => observer.disconnect();
	});
</script>

<div class="container" bind:this={aboutSection}>
	<h2 class="section-title">About Me</h2>
	<div class="about-content">
		<div class="about-text">
			<p>
				Versatile full-stack developer with a background in game development and a passion for creating interactive, high-performance user experiences. Skilled in React, Svelte, TailwindCSS, FastAPI, PostgreSQL, and TypeScript.
			</p>
			<p>
				Known for shipping production-ready features, maintaining CI/CD pipelines with Docker and GitHub Actions, and collaborating across product, design, and engineering teams. Excited to bring a product-focused, UX-driven mindset to fast-moving full-stack teams.
			</p>
			<div class="experience">
				<div class="experience-item">
					<h3>6+ Years</h3>
					<p>Development</p>
				</div>
				<div class="experience-item">
					<h3>7+ Projects</h3>
					<p>Delivered</p>
				</div>
				<div class="experience-item">
					<h3>90%</h3>
					<p>Performance Boost</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.about-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.about-text p {
		font-size: 1.1rem;
		line-height: 1.8;
		margin-bottom: 2rem;
		color: #555;
	}

	.experience {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.experience-item {
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		padding: 2rem;
		border-radius: 15px;
		text-align: center;
		transition: transform 0.3s ease;
	}

	.experience-item:hover {
		transform: translateY(-5px);
	}

	.experience-item h3 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.experience-item p {
		font-size: 1rem;
		opacity: 0.9;
		margin: 0;
	}
</style> 