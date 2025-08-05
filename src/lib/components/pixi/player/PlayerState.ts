import { Player } from "./Player";

export interface IState {
  update(deltaTime: number): void;
  onEnter(): void;
  onExit(): void;
}

export abstract class BaseState implements IState {
  protected player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  abstract update(deltaTime: number): void;
  abstract onEnter(): void;
  abstract onExit(): void;

  protected setAnimation(animationName: string): void {
    this.player.animation.setAnimation(animationName);
  }
}

export class IdleState extends BaseState {
  update(deltaTime: number): void {}

  onEnter(): void {
    this.setAnimation("Idle");
    this.player.canMove = true;
  }

  onExit(): void {}
}

export class MoveState extends BaseState {
  update(deltaTime: number): void {}

  onEnter(): void {
    this.setAnimation("Run");
    this.player.canMove = true;
  }

  onExit(): void {}
}

export class AttackingState extends BaseState {
  private animationComplete = false;
  private lastFrameStartTime = 0;

  constructor(player: Player) {
    super(player);
  }

  update(deltaTime: number): void {
    const sprite = this.player.animation.getSprite();
    if (
      sprite &&
      this.player.animation.getCurrentFrame() >=
        this.player.animation.getTotalFrames() - 1
    ) {
      if (!this.animationComplete) {
        this.animationComplete = true;
        this.lastFrameStartTime = Date.now();
      }

      const frameDuration = 1500 / (sprite.animationSpeed * 60);
      if (Date.now() - this.lastFrameStartTime >= frameDuration) {
        this.player.stateMachine.onAttackComplete();
      }
    }
  }

  onEnter(): void {
    const attackType = Math.random() < 0.5 ? "Attack1" : "Attack2";
    this.setAnimation(attackType);
    this.player.animation.setLoop(false);
    this.animationComplete = false;
    this.player.canMove = false;
  }

  onExit(): void {
    this.player.animation.setLoop(true);
  }
}

export class BlockState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  update(deltaTime: number): void {}

  onEnter(): void {
    this.setAnimation("Guard");
    this.player.canMove = false;
  }

  onExit(): void {}
}
