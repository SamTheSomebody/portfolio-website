<script lang="ts">
  import BackgroundBanner from "./BackgroundBanner.svelte";
  export let title: string = "Sam Muller";
  export let subtitle: string =
    "Full Stack, Game Developer & Gamification Consultant";
  export let width: number = 580;
  export let titleHeight: number = 100;
  export let subtitleHeight: number = 50;
</script>

<div
  class="panel"
  style="width: {width}px; height: {titleHeight +
    subtitleHeight}px; transform: translateX(-{width / 2}px);"
>
  <div class="title-container" style="height: {titleHeight}px;">
    <h1 class="text">{title}</h1>
    <h1 class="text-shadow">{title}</h1>
  </div>
  <div class="subtitle-container">
    <div class="banner-container">
      <BackgroundBanner {width} height={subtitleHeight} />
    </div>
    <h1 class="subtitle-text">{subtitle}</h1>
  </div>
</div>

<style>
  @font-face {
    font-family: "Mountain King";
    src: url("/fonts/MountainKingRegular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 10%;
    left: 50%;
    overflow: visible;
    z-index: 10;
  }

  .title-container {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subtitle-container {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .banner-container {
    position: absolute;
    top: -5%;
    z-index: 1;
  }

  .text {
    font-family: "Mountain King", serif;
    font-size: clamp(3rem, 8vw, 6rem);
    background: linear-gradient(
      to bottom,
      #eeddaa 0%,
      #eeddaa 45%,
      #ccaa77 55%,
      #ccaa77 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }

  .text-shadow {
    font-family: "Mountain King", serif;
    font-size: clamp(3rem, 8vw, 6rem);
    color: rgba(0, 0, 0, 0.8);
    position: absolute;
    z-index: 1;
    filter: blur(5px);
  }

  .subtitle-text {
    font-family: "JetBrains Mono", monospace;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-size: 1rem;
    color: #eeddaa;
    z-index: 2;
    position: relative;
  }
</style>
