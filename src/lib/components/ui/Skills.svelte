<script lang="ts">
	import { onMount } from 'svelte';

	let skillsSection;

	const skills = [
		{ name: 'TypeScript', level: 95, icon: '🔷' },
		{ name: 'React', level: 90, icon: '⚛️' },
		{ name: 'Svelte', level: 88, icon: '🎯' },
		{ name: 'Go', level: 85, icon: '🟢' },
		{ name: 'Python', level: 85, icon: '🐍' },
		{ name: 'FastAPI', level: 88, icon: '⚡' },
		{ name: 'PostgreSQL', level: 85, icon: '🐘' },
		{ name: 'TailwindCSS', level: 90, icon: '🎨' },
		{ name: 'Unity/C#', level: 85, icon: '🎮' },
		{ name: 'Docker', level: 80, icon: '🐳' },
		{ name: 'GitHub Actions', level: 85, icon: '📝' },
		{ name: 'OAuth2/JWT', level: 88, icon: '🔐' }
	];

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('slide-up');
				}
			});
		}, { threshold: 0.1 });

		if (skillsSection) {
			observer.observe(skillsSection);
		}

		return () => observer.disconnect();
	});
</script>

<div class="container" bind:this={skillsSection}>
	<h2 class="section-title">Skills & Technologies</h2>
	<div class="skills-container">
		{#each skills as skill, index}
			<div class="skill-item" style="animation-delay: {index * 0.1}s">
				<div class="skill-icon">{skill.icon}</div>
				<h3>{skill.name}</h3>
				<div class="skill-bar">
					<div class="skill-progress" style="width: {skill.level}%"></div>
				</div>
				<span class="skill-level">{skill.level}%</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.skills-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-top: 3rem;
	}

	.skill-item {
		background: white;
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		text-align: center;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
	}

	.skill-item.slide-up {
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.skill-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.skill-icon {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.skill-item h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1rem;
		color: #333;
	}

	.skill-bar {
		width: 100%;
		height: 8px;
		background: #e1e5e9;
		border-radius: 4px;
		margin-bottom: 0.5rem;
		overflow: hidden;
	}

	.skill-progress {
		height: 100%;
		background: linear-gradient(45deg, #667eea, #764ba2);
		border-radius: 4px;
		transition: width 1s ease;
	}

	.skill-level {
		font-size: 0.9rem;
		font-weight: 600;
		color: #667eea;
	}

	@media (max-width: 768px) {
		.skills-container {
			grid-template-columns: 1fr;
		}
	}
</style> 