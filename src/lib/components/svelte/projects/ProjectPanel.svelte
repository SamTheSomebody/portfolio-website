<script lang="ts">
  import { onDestroy } from 'svelte';
  import StatusTag from './tags/StatusTag.svelte';
  import LinkTag from './tags/LinkTag.svelte';
  import ImageCarousel from './images/ImageCarousel.svelte';
  import type { Status, Link, Tech } from './types/tags';
  import type { ProjectImage } from './types/images';
  import TechTag from './tags/TechTag.svelte';

  export let title: string = '';
  export let description: string = '';
  export let impact: string = '';
  export let techStack: Tech[] = [];
  export let links: Array<{ url: string; type: Link }> = [];
  export let images: ProjectImage[] = [];
  export let width: number = 1000;
  export let status: Status = 'progress';
  export let selectedTechs: Tech[] = [];
  export let onTechToggle: (tech: Tech) => void = () => {};

  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let panelElement: HTMLDivElement;

  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    isDragging = true;

    const rect = panelElement.getBoundingClientRect();
    dragOffset.x = event.clientX - rect.left;
    dragOffset.y = event.clientY - rect.top;

    panelElement.style.cursor = 'grabbing';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDragging) return;

    const newX = event.clientX - dragOffset.x;
    const newY = event.clientY - dragOffset.y;

    panelElement.style.position = 'fixed';
    panelElement.style.left = newX + 'px';
    panelElement.style.top = newY + 'px';
    panelElement.style.zIndex = '1000';
  }

  function handleMouseUp() {
    if (!isDragging) return;

    isDragging = false;
    panelElement.style.position = '';
    panelElement.style.left = '';
    panelElement.style.top = '';
    panelElement.style.zIndex = '';
    panelElement.style.cursor = 'grab';

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  function toggleTech(tech: Tech) {
    onTechToggle(tech);
  }

  onDestroy(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  });
</script>

<div
  bind:this={panelElement}
  class="project-panel"
  style="width: {width}px;"
  on:mousedown={handleMouseDown}
  class:dragging={isDragging}
  role="button"
  tabindex="0"
>
  <div class="content-container">
    <div class="title-container">
      <h2 class="title">{title}</h2>
      <div class="title-tags-container">
        {#if links.length > 0}
          <div class="tags">
            {#each links as link}
              <LinkTag linkType={link.type} url={link.url} />
            {/each}
          </div>
        {/if}
        <div class="tags" style="justify-content: flex-end;">
          <StatusTag {status} />
        </div>
      </div>
    </div>

    {#if techStack.length > 0}
      <div class="tags">
        {#each techStack as tech}
          <TechTag techType={tech} isSelected={selectedTechs.includes(tech)} onToggle={toggleTech} />
        {/each}
      </div>
    {/if}

    {#if description}
      <div class="description">
        <p>{description}</p>
      </div>
    {/if}

    {#if impact}
      <div class="description" style="padding-top: 0rem;">
        <hr style="width: 100%;" />
        <p style="font-weight: bold; text-align: right;">{impact}</p>
      </div>
    {/if}
    {#if images.length > 0}
      <div class="image-container">
        <ImageCarousel {images} />
      </div>
    {/if}
  </div>
</div>

<style>
  .project-panel {
    background: rgb(0, 0, 0);
    border: 1px solid rgb(255, 255, 255);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;
    cursor: grab;
    user-select: none;
    &:hover:not(.dragging) {
      transform: scale(1.05);
    }
    &.dragging {
      transform: scale(1.05);
    }
  }

  .title-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .title-tags-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .image-container {
    flex: 1;
    height: 100%;
    overflow: hidden;
    border-top: 1px solid white;
    max-height: 300px;
  }

  .content-container {
    flex: 1;
    padding: 1rem;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }

  .title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 3vw;
    height: 100%;
    outline: 1px red;
    color: #ffffff;
    margin: 0;
    flex: 1;
  }

  .tags {
    display: flex;
    gap: 0.5rem;
  }

  .description p {
    font-family: 'JetBrains Mono', monospace;
    color: #ffffff;
    line-height: 1.6;
    margin: 0;
  }
</style>
