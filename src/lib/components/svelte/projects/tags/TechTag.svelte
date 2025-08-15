<script lang="ts">
  import Tag from './Tag.svelte';
  import svelteIcon from '../icons/svelte.svg?raw';
  import pixijsIcon from '../icons/pixijs.svg?raw';
  import unityIcon from '../icons/unity.svg?raw';
  import reactIcon from '../icons/react.svg?raw';
  import tailwindIcon from '../icons/tailwind.svg?raw';
  import typescriptIcon from '../icons/typescript.svg?raw';
  import htmlIcon from '../icons/html5.svg?raw';
  import cssIcon from '../icons/css3.svg?raw';
  import unrealEngineIcon from '../icons/unreal-engine.svg?raw';
  import awsIcon from '../icons/aws.svg?raw';
  import githubIcon from '../icons/github.svg?raw';
  import type { Tech, ImageTagConfig } from '../types/tags';

  export let techType: Tech;
  export let isSelected: boolean = false;
  export let onToggle: (tech: Tech) => void = () => {};

  const techConfig: Record<Tech, ImageTagConfig> = {
    svelte: { text: 'Svelte', icon: svelteIcon, iconType: 'svg' },
    pixijs: { text: 'PixiJS', icon: pixijsIcon, iconType: 'svg' },
    unity: { text: 'Unity', icon: unityIcon, iconType: 'svg' },
    react: { text: 'React', icon: reactIcon, iconType: 'svg' },
    tailwind: { text: 'Tailwind', icon: tailwindIcon, iconType: 'svg' },
    typescript: { text: 'TypeScript', icon: typescriptIcon, iconType: 'svg' },
    html: { text: 'HTML', icon: htmlIcon, iconType: 'svg' },
    css: { text: 'CSS', icon: cssIcon, iconType: 'svg' },
    unreal_engine: { text: 'Unreal Engine', icon: unrealEngineIcon, iconType: 'svg' },
    c_plus_plus: { text: 'C++', icon: 'code', iconType: 'material' },
    c_sharp: { text: 'C#', icon: 'code', iconType: 'material' },
    go: { text: 'Go', icon: 'code', iconType: 'material' },
    bubbletea: { text: 'Bubbletea', icon: 'emoji_food_beverage', iconType: 'material' },
    cobra: { text: 'Cobra', icon: 'nest_true_radiant', iconType: 'material' },
    cli: { text: 'CLI', icon: 'terminal', iconType: 'material' },
    aws: { text: 'AWS', icon: awsIcon, iconType: 'svg' },
    github_pages: { text: 'GitHub Pages', icon: githubIcon, iconType: 'svg' },
    formspree: { text: 'Formspree', icon: 'docs', iconType: 'material' },
    no_cost: { text: 'No Cost', icon: 'money_off', iconType: 'material' },
    firmware: { text: 'Firmware', icon: 'code', iconType: 'material' },
    pcb_design: { text: 'PCB Design', icon: 'developer_board', iconType: 'material' },
    hardware: { text: 'Hardware', icon: 'hardware', iconType: 'material' },
    animation: { text: 'Animation', icon: 'animation', iconType: 'material' },
  };
  $: config = techConfig[techType];

  function handleClick() {
    onToggle(techType);
  }
</script>

<div
  class="tech-tag-wrapper"
  class:selected={isSelected}
  on:click={handleClick}
  on:keydown={e => e.key === 'Enter' && handleClick()}
  tabindex="0"
  role="button"
>
  <Tag
    icon={config.icon}
    iconType={config.iconType}
    text={config.text}
    textColor={isSelected ? '#ffffff' : '#ffffff'}
    backgroundColor={isSelected
      ? 'linear-gradient(45deg, rgba(255, 107, 107, 0.5), rgba(78, 205, 196, 0.5), rgba(69, 183, 209, 0.5), rgba(150, 206, 180, 0.5), rgba(254, 202, 87, 0.5), rgba(255, 159, 243, 0.5), rgba(84, 160, 255, 0.5))'
      : 'rgba(0, 0, 0, 0.8)'}
    showClose={isSelected}
  />
</div>

<style>
  .tech-tag-wrapper {
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tech-tag-wrapper:hover {
    transform: scale(1.05);
  }

  .tech-tag-wrapper.selected {
    transform: scale(1);
  }
</style>
