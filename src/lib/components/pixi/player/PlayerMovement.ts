import { App } from '../App';
import type { Vector2 } from '../types/position';
import { PlayerAnimation } from './PlayerAnimation';

const SPEED: number = 3;
const PLAYER_RADIUS: number = 16;
const WRAP_OFFSET: number = 50;

export class PlayerMovement {
  canMove: boolean = true;
  private app: App;
  private animation: PlayerAnimation;
  private movementDirection: Vector2 = { x: 0, y: 0 };
  private collisionCallback?: (playerPos: Vector2, playerRadius: number) => boolean;

  constructor(app: App, animation: PlayerAnimation) {
    this.app = app;
    this.animation = animation;
  }

  public setMovementDirection(direction: Vector2) {
    this.movementDirection = direction;
  }

  public setCollisionCallback(callback: (playerPos: Vector2, playerRadius: number) => boolean) {
    this.collisionCallback = callback;
  }

  public update(deltaTime: number) {
    if (!this.animation || !this.animation.getSprite() || !this.canMove) return;
    const sprite = this.animation.getSprite();
    const speed = SPEED * deltaTime;
    const newX = sprite.x + this.movementDirection.x * speed;
    const newY = sprite.y + this.movementDirection.y * speed;

    if (this.collisionCallback) {
      const wouldCollide = this.collisionCallback({ x: newX, y: newY }, PLAYER_RADIUS);
      if (wouldCollide) {
        return;
      }
    }

    sprite.position.set(newX, newY);
    this.handleScreenWrapping();
  }

  private handleScreenWrapping() {
    const sprite = this.animation.getSprite();
    if (sprite.x < -WRAP_OFFSET) {
      sprite.x = this.app.app.screen.width + WRAP_OFFSET;
    } else if (sprite.x > this.app.app.screen.width + WRAP_OFFSET) {
      sprite.x = -WRAP_OFFSET;
    }
    if (sprite.y < -WRAP_OFFSET) {
      sprite.y = this.app.app.screen.height + WRAP_OFFSET;
    } else if (sprite.y > this.app.app.screen.height + WRAP_OFFSET) {
      sprite.y = -WRAP_OFFSET;
    }
  }
}
