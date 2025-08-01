<script lang="ts">
	import { onMount } from 'svelte';

	let projectsSection;

	const projects = [
		{
			title: 'Real Estate Investment Tool',
			description: 'Full-stack dashboard for analysing and forecasting ROI on property investments with ML forecasting and data pipelines.',
			technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'TailwindCSS', 'Scikit-learn'],
			image: '🏠',
			link: 'https://github.com/SamTheSomebody'
		},
		{
			title: 'Pomodo',
			description: 'CLI Pomodoro tool with intelligent task suggestions based on priority, energy, and time.',
			technologies: ['Go', 'Cobra', 'Bubbletea', 'SQLite'],
			image: '⏰',
			link: 'https://github.com/SamTheSomebody'
		},
		{
			title: 'GV Crocs Website',
			description: 'Designed a static, zero-maintenance site with contact form and calendar embed for a local swim club.',
			technologies: ['HTML', 'TailwindCSS', 'Github Pages'],
			image: '🏊',
			link: 'https://github.com/SamTheSomebody'
		},
		{
			title: 'Cybersecurity Training Modules',
			description: 'Delivered 7 Unity WebGL modules for cybersecurity training with interactive feedback and performance optimization.',
			technologies: ['Unity', 'C#', 'WebGL', 'GitHub Actions', 'Docker'],
			image: '🛡️',
			link: 'https://github.com/SamTheSomebody'
		},
		{
			title: 'Authentication Systems',
			description: 'Designed multi-role login flows using JWT and OAuth2 for both internal and public-facing platforms.',
			technologies: ['JWT', 'OAuth2', 'FastAPI', 'PostgreSQL', 'React'],
			image: '🔐',
			link: 'https://github.com/SamTheSomebody'
		},
		{
			title: 'CLI Task Tools',
			description: 'Developed terminal applications in Go with SQLite integration and task-weighting logic using Bubbletea.',
			technologies: ['Go', 'SQLite', 'Bubbletea', 'Cobra'],
			image: '⚡',
			link: 'https://github.com/SamTheSomebody'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('slide-up');
				}
			});
		}, { threshold: 0.1 });

		if (projectsSection) {
			observer.observe(projectsSection);
		}

		return () => observer.disconnect();
	});
</script>

<div class="container" bind:this={projectsSection}>
	<h2 class="section-title">My Projects</h2>
	<div class="projects-grid">
		{#each projects as project, index}
			<div class="project-card" style="animation-delay: {index * 0.1}s">
				<div class="project-image">
					<span>{project.image}</span>
				</div>
				<div class="project-content">
					<h3 class="project-title">{project.title}</h3>
					<p class="project-description">{project.description}</p>
					<div class="project-technologies">
						{#each project.technologies as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.project-card {
		background: white;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		opacity: 0;
		transform: translateY(30px);
	}

	.project-card.slide-up {
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.project-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.project-image {
		width: 100%;
		height: 200px;
		background: linear-gradient(45deg, #667eea, #764ba2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 3rem;
	}

	.project-content {
		padding: 1.5rem;
	}

	.project-title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.project-description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		background: linear-gradient(45deg, #667eea, #764ba2);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style> 