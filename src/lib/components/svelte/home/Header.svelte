<script lang="ts">
  export let selectedTab: string;
  export let onTabSelect: (tab: string) => void;
</script>

<div class="header">
  <img class="logo" src="/images/logo.webp" alt="Logo" />
  <div class="tabs">
    <button class="button" class:selected={selectedTab === 'home'} on:click={() => onTabSelect('home')}>Home</button>
    <button class="button" class:selected={selectedTab === 'projects'} on:click={() => onTabSelect('projects')}
      >Projects</button
    >
    <button class="button" class:selected={selectedTab === 'about'} on:click={() => onTabSelect('about')}>About</button>
    <button class="button" class:selected={selectedTab === 'work'} on:click={() => onTabSelect('work')}
      >Work with me</button
    >
  </div>
</div>

<style>
  .header {
    width: 100vw;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background: linear-gradient(0deg, #fc971b 0%, #fbc91b 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .logo {
    height: 40px;
    width: auto;
    object-fit: contain;
  }

  .tabs {
    font-family: 'JetBrains Mono', monospace;
    display: flex;
    flex-direction: row;
    padding-right: 2rem;
    font-weight: 600;
    color: #1a1a2e;
    text-decoration: none;
    height: 100%;
  }

  .button {
    flex: 1;
    border: none;
    background: transparent;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    padding: 0.5rem 1rem;
    flex-wrap: nowrap;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
  }

  .button:hover {
    background: linear-gradient(180deg, #d21fdc 0%, #7e1abd 100%);
  }

  .button.selected {
    background: linear-gradient(180deg, #d21fdc 0%, #7e1abd 100%);
    color: white;
  }
</style>
