<script lang="ts">
  import Tag from './Tag.svelte';
  import githubIcon from '../icons/github.svg?raw';
  import type { Link, ImageTagConfig } from '../types/tags';

  export let linkType: Link;
  export let url: string;

  const linkConfig: Record<Link, ImageTagConfig> = {
    github: { text: 'GitHub', icon: githubIcon, iconType: 'svg' },
    live: { text: 'Live', icon: 'public', iconType: 'material' },
    private: { text: 'Not Public', icon: 'public_off', iconType: 'material' },
  };

  $: config = linkConfig[linkType];
  $: isPublic = linkType !== 'private';
</script>

{#if isPublic}
  <a href={url} target="_blank" rel="noopener noreferrer">
    <Tag icon={config.icon} iconType={config.iconType} text={config.text} />
  </a>
{:else}
  <Tag icon={config.icon} iconType={config.iconType} text={config.text} />
{/if}
