<script lang="ts">
  export let icon: string = '?';
  export let text: string = 'Null';
  export let textColor: string = '#ffffff';
  export let backgroundColor: string = 'rgba(0, 0, 0, 0.8)';
  export let iconType: 'material' | 'svg' = 'material';
  export let showClose: boolean = false;
</script>

<div class="tag" style="color: {textColor}; background: {backgroundColor}; border: 1px solid {textColor};">
  {#if icon}
    {#if iconType === 'material'}
      <span class="material-symbols-outlined" style="color: {textColor};">{icon}</span>
    {:else}
      <span style="color: {textColor}; width: 1em; height: 1em; display: inline-block;">
        {@html icon}
      </span>
    {/if}
  {/if}
  <span class="text">{text}</span>
  {#if showClose}
    <span class="close-icon material-symbols-outlined" style="color: {textColor};">close</span>
  {/if}
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0');

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .tag:hover {
    padding: 0.25rem 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .text {
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
  }

  .material-symbols-outlined {
    font-size: 1em;
    line-height: 1;
    font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  }

  .tag svg {
    width: 1em;
    height: 1em;
    max-width: 1em;
    max-height: 1em;
  }

  .close-icon {
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
</style>
