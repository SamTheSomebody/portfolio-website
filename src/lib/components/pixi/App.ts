import { Application, Container } from 'pixi.js';

export class App {
  app: Application;
  stage: Container;
  movableContainer: Container;

  constructor() {
    this.app = new Application();
    this.stage = this.app.stage;
    this.movableContainer = new Container();
    this.stage.addChild(this.movableContainer);
  }

  async init(container: HTMLDivElement) {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      background: '#47aba9',
      resolution: window.devicePixelRatio || 1,
    });
    container.appendChild(this.app.canvas);
    this.centerContainer();

    const handleResize = () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      this.centerContainer();
    };
    window.addEventListener('resize', handleResize);
  }

  private centerContainer() {
    this.movableContainer.x = window.innerWidth / 2;
    this.movableContainer.y = window.innerHeight / 2;
  }

  public addChild(child: Container) {
    this.movableContainer.addChild(child);
  }

  public destroy() {
    this.app.destroy();
  }
}
