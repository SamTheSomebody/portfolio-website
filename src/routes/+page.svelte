<script lang="ts">
  import Header from '$lib/components/svelte/home/Header.svelte';
  import ProjectsOverlay from '$lib/components/svelte/projects/ProjectsOverlay.svelte';
  import AboutOverlay from '$lib/components/svelte/home/AboutOverlay.svelte';
  import WorkOverlay from '$lib/components/svelte/home/WorkOverlay.svelte';
  import Home from '$lib/components/svelte/home/Home.svelte';

  let selectedTab = 'home';
  let showOverlay = false;

  function onTabSelect(tab: string) {
    if (tab === 'home') {
      selectedTab = 'home';
      showOverlay = false;
    } else {
      selectedTab = tab;
      showOverlay = true;
    }
  }
</script>

<div class="layout">
  <Header {selectedTab} {onTabSelect} />
  <main class="main-content">
    <Home />
  </main>

  {#if showOverlay && selectedTab === 'projects'}
    <ProjectsOverlay />
  {/if}

  {#if showOverlay && selectedTab === 'about'}
    <AboutOverlay />
  {/if}

  {#if showOverlay && selectedTab === 'work'}
    <WorkOverlay />
  {/if}
</div>

<style>
  .layout {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    overflow: hidden;
  }
</style>
