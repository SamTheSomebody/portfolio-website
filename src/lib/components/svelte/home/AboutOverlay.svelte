<div class="about-overlay">
  <h1>About Me</h1>
  <p>This is the about section. Content coming soon...</p>
</div>

<style>
  .about-overlay {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    height: calc(100% - 52px);
    background: rgba(0, 0, 0, 0.8);
    z-index: 200;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    box-sizing: border-box;
    color: white;
  }

  h1 {
    font-family: 'JetBrains Mono', monospace;
    font-size: 2rem;
    margin: 0;
  }

  p {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    margin: 0;
  }
</style>
