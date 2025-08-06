import { App } from '../App';
import { PlayerAnimation } from './PlayerAnimation';
import { PlayerStateMachine } from './PlayerStateMachine';
import { PlayerMovement } from './PlayerMovement';
import type { Vector2 } from '../types/position';

export class Player {
  animation: PlayerAnimation;
  stateMachine: PlayerStateMachine;
  movement: PlayerMovement;

  constructor(app: App) {
    this.animation = new PlayerAnimation(app);
    this.stateMachine = new PlayerStateMachine(this);
    this.movement = new PlayerMovement(app, this.animation);
  }

  async init() {
    await this.animation.init();
    this.stateMachine.init();
  }

  public update(deltaTime: number) {
    this.stateMachine.update(deltaTime);
    this.movement.update(deltaTime);
  }

  public handleMovementInput(direction: Vector2) {
    this.movement.setMovementDirection(direction);
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

  public setPositionChangeCallback(callback: (x: number, y: number) => void) {
    this.stateMachine.setPositionChangeCallback(callback);
  }

  public setCollisionCallback(callback: (playerPos: Vector2, playerRadius: number) => boolean) {
    this.movement.setCollisionCallback(callback);
  }

  public destroy() {
    this.animation.destroy();
  }
}
