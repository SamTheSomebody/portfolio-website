import { AnimatedSprite } from "pixi.js";
import { Player } from "./Player";

export interface IPlayerState {
  update(deltaTime: number): void;
  onEnter(): void;
  onExit(): void;
}

export abstract class BasePlayerState implements IPlayerState {
  protected player: Player;
  protected sprite: AnimatedSprite;

  constructor(player: Player) {
    this.player = player;
    this.sprite = player.sprite;
  }

  abstract update(deltaTime: number): void;
  abstract onEnter(): void;
  abstract onExit(): void;

  protected setAnimation(animationName: string): void {
    this.player.setAnimation(animationName);
  }

  protected move(deltaTime: number) {
    const speed = 3 * deltaTime;
    const direction = this.player.getMovementDirection();
    this.sprite.x += direction.x * speed;
    this.sprite.y += direction.y * speed;
  }
}

export class IdleState extends BasePlayerState {
  update(deltaTime: number): void {
    if (!this.sprite) return;
  }

  onEnter(): void {
    this.setAnimation("Idle");
  }

  onExit(): void {}
}

export class MoveState extends BasePlayerState {
  update(deltaTime: number): void {
    this.move(deltaTime);
  }

  onEnter(): void {
    this.setAnimation("Run");
  }

  onExit(): void {}
}

export class AttackingState extends BasePlayerState {
  private animationComplete = false;
  private lastFrameStartTime = 0;

  constructor(player: Player) {
    super(player);
  }

  update(deltaTime: number): void {
    if (
      this.sprite &&
      this.sprite.currentFrame >= this.sprite.textures.length - 1
    ) {
      if (!this.animationComplete) {
        this.animationComplete = true;
        this.lastFrameStartTime = Date.now();
      }
      const frameDuration = 1500 / (this.sprite.animationSpeed * 60);
      if (Date.now() - this.lastFrameStartTime >= frameDuration) {
        this.player.onAttackComplete();
      }
    }
  }

  onEnter(): void {
    this.setAnimation("Attack1");
    this.sprite.loop = false;
    this.animationComplete = false;
  }

  onExit(): void {
    this.sprite.loop = true;
  }
}

export class BlockState extends BasePlayerState {
  constructor(player: Player) {
    super(player);
  }

  update(deltaTime: number): void {}

  onEnter(): void {
    this.setAnimation("Guard");
  }

  onExit(): void {}
}
