import { Application, Container } from "pixi.js";

export class App {
  app: Application;
  stage: Container;

  constructor() {
    this.app = new Application();
    this.stage = this.app.stage;
  }

  async init(container: HTMLDivElement) {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      background: "#47aba9",
      resolution: window.devicePixelRatio || 1,
    });
    container.appendChild(this.app.canvas);
    const handleResize = () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  }

  public addChild(child: Container) {
    this.stage.addChild(child);
  }

  public destroy() {
    this.app.destroy();
  }
}
