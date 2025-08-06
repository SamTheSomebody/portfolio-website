import { Player } from './player/Player';
import { InputManager } from './InputManager';
import { App } from './App';
import { Scene } from './Scene';
import { Ticker } from 'pixi.js';

export class GameManager {
  private app: App;
  public inputManager: InputManager;
  private player: Player;
  private scene: Scene;
  private ticker: Ticker;

  constructor(container: HTMLDivElement) {
    this.inputManager = new InputManager();
    this.app = new App();
    this.app.init(container);

    this.player = new Player(this.app);
    this.player.init();

    this.scene = new Scene(this.app);
    this.scene.init();

    this.player.setCollisionCallback((playerPos, playerRadius) => {
      return this.scene.checkCollision(playerPos, playerRadius);
    });

    this.ticker = new Ticker();
    this.ticker.add(() => {
      this.player.update(this.ticker.deltaTime);
    });
    this.ticker.start();

    this.setupInput();
  }

  private setupInput() {
    this.inputManager.setEvents({
      onMovementInput: direction => {
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
  }

  public toggleDebug() {}

  public destroy() {
    if (this.player) {
      this.player.destroy();
    }
    if (this.inputManager) {
      this.inputManager.destroy();
    }
    if (this.scene) {
      this.scene.destroy();
    }
    if (this.app) {
      this.app.destroy();
    }
  }
}
