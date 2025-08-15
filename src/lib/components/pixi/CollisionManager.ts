import { Graphics, Container } from 'pixi.js';
import type { Vector2 } from './types/position';
import type { Tile } from './types/tiles';

export class CollisionManager {
  private debugContainer: Container;
  private debugGraphics: Graphics;
  private map: (Tile | null)[][] = [];
  private containerX: number = 0;
  private containerY: number = 0;

  constructor() {
    this.debugContainer = new Container();
    this.debugGraphics = new Graphics();
    this.debugContainer.addChild(this.debugGraphics);
  }

  public setMap(map: (Tile | null)[][], containerX: number, containerY: number) {
    this.map = map;
    this.containerX = containerX;
    this.containerY = containerY;
  }

  public checkCollision(playerPos: Vector2, playerRadius: number): boolean {
    const adjustedX = playerPos.x - this.containerX;
    const adjustedY = playerPos.y - this.containerY;

    const tileX = Math.floor((adjustedX + Math.floor(this.map.length / 2) * 64 + 32) / 64);
    const tileY = Math.floor((adjustedY + Math.floor(this.map.length / 2) * 64 + 32) / 64);

    if (tileY < 0 || tileY >= this.map.length || tileX < 0 || tileX >= this.map[0].length) {
      return true;
    }

    const tile = this.map[tileY][tileX];
    if (!tile) {
      return true;
    }

    if (tile.wall) {
      return true;
    }

    if (tile.collision) {
      const config = tile.collision;

      if (!config.walkable) {
        return true;
      }

      const tileCenterX = tileX * 64 + 32;
      const tileCenterY = tileY * 64 + 32;
      const relativeX = adjustedX - tileCenterX;
      const relativeY = adjustedY - tileCenterY;

      if (config.leftLimit !== undefined && relativeX < config.leftLimit) {
        return true;
      }
      if (config.rightLimit !== undefined && relativeX > config.rightLimit) {
        return true;
      }
      if (config.topLimit !== undefined && relativeY < config.topLimit) {
        return true;
      }
      if (config.bottomLimit !== undefined && relativeY > config.bottomLimit) {
        return true;
      }
    }

    return false;
  }

  public getDebugContainer(): Container {
    return this.debugContainer;
  }
}
