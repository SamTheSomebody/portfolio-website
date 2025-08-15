<script lang="ts">
  import ProjectPanel from './ProjectPanel.svelte';
  import PerformanceDashboard from './images/PerformanceDashboard.svelte';
  import { projects } from '$lib/data/projects';
  import type { Tech } from './types/tags';

  let selectedTechs: Tech[] = [];

  function toggleTech(tech: Tech) {
    if (selectedTechs.includes(tech)) {
      selectedTechs = selectedTechs.filter(t => t !== tech);
    } else {
      selectedTechs = [...selectedTechs, tech];
    }
  }

  $: filteredProjects =
    selectedTechs.length === 0
      ? projects
      : projects.filter(project => selectedTechs.every(tech => project.techStack.includes(tech)));
</script>

<div class="projects-overlay">
  {#each filteredProjects as project}
    <ProjectPanel
      title={project.title}
      description={project.description}
      impact={project.impact}
      status={project.status}
      techStack={project.techStack}
      links={project.links}
      images={project.images || []}
      width={800}
      {selectedTechs}
      onTechToggle={toggleTech}
    />
  {/each}
</div>

<style>
  .projects-overlay {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    height: calc(100% - 52px);
    background: rgba(0, 0, 0, 0.8);
    z-index: 200;
    overflow-y: auto;
    padding: 2rem;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-sizing: border-box;
  }
</style>
