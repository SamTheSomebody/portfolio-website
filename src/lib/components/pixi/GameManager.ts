import { Player } from "./player/Player";
import { InputManager } from "./InputManager";
import { App } from "./App";
import { Ticker } from "pixi.js";

export class GameManager {
  private app: App;
  public inputManager: InputManager;
  private player: Player;
  private ticker: Ticker;

  constructor(container: HTMLDivElement) {
    this.inputManager = new InputManager();
    this.app = new App();
    this.app.init(container);
    this.player = new Player(this.app);
    this.player.init();
    this.inputManager.setEvents({
      onMovementInput: (direction) => {
        this.player.handleMovementInput(direction);
      },
      onAttack: () => {
        this.player.handleAttack();
      },
      onBlockStart: () => {
        this.player.handleBlockStart();
      },
      onBlockEnd: () => {
        this.player.handleBlockEnd();
      },
    });

    this.ticker = new Ticker();
    this.ticker.add(() => {
      this.player.update(this.ticker.deltaTime);
    });
    this.ticker.start();
  }

  public destroy() {
    if (this.player) {
      this.player.destroy();
    }
    if (this.inputManager) {
      this.inputManager.destroy();
    }
    if (this.app) {
      this.app.destroy();
    }
  }
}
