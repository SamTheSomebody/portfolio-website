import { App } from "../App";
import { PlayerAnimation } from "./PlayerAnimation";
import { PlayerStateMachine } from "./PlayerStateMachine";

export class Player {
  private app: App;
  animation: PlayerAnimation;
  stateMachine: PlayerStateMachine;
  private movementDirection: { x: number; y: number } = { x: 0, y: 0 };
  canMove: boolean = true;

  constructor(app: App) {
    this.app = app;
    this.animation = new PlayerAnimation(app);
    this.stateMachine = new PlayerStateMachine(this);
  }

  async init() {
    await this.animation.init();
    this.stateMachine.init();
  }

  public update(deltaTime: number) {
    this.stateMachine.update(deltaTime);
    this.handleMovement(deltaTime);
    this.handleScreenWrapping();
  }

  private handleMovement(deltaTime: number) {
    const sprite = this.animation.getSprite();
    if (!sprite || !this.canMove) return;
    const speed = 3 * deltaTime;
    sprite.x += this.movementDirection.x * speed;
    sprite.y += this.movementDirection.y * speed;
  }

  private handleScreenWrapping() {
    const sprite = this.animation.getSprite();
    if (!sprite) return;
    if (sprite.x < -50) sprite.x = this.app.app.screen.width + 50;
    if (sprite.x > this.app.app.screen.width + 50) sprite.x = -50;
    if (sprite.y < -50) sprite.y = this.app.app.screen.height + 50;
    if (sprite.y > this.app.app.screen.height + 50) sprite.y = -50;
  }

  public handleMovementInput(direction: { x: number; y: number }) {
    this.movementDirection = direction;
    this.stateMachine.handleMovementInput(direction);
  }

  public handleAttack() {
    this.stateMachine.handleAttack();
  }

  public handleBlockStart() {
    this.stateMachine.handleBlockStart();
  }

  public handleBlockEnd() {
    this.stateMachine.handleBlockEnd();
  }

  public getPosition(): { x: number; y: number } {
    return this.stateMachine.getPosition();
  }

  public setPositionChangeCallback(callback: (x: number, y: number) => void) {
    this.stateMachine.setPositionChangeCallback(callback);
  }

  public destroy() {
    this.animation.destroy();
  }
}
