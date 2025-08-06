import { Container, Sprite, Assets } from 'pixi.js';
import { DEFAULT_MAP } from './terrain/DefaultMap';
import { App } from './App';
import type { Vector2 } from './types/position';
import type { Tile } from './types/tiles';
import { CollisionManager } from './CollisionManager';
import { getAssetPath } from '../../utils/assetPaths';

export class Scene {
  private container: Container;
  private app: App;
  private map: (Tile | null)[][] = [];
  private collisionManager: CollisionManager;

  constructor(app: App) {
    this.app = app;
    this.container = new Container();
    this.collisionManager = new CollisionManager();
    app.addChild(this.container);
  }

  public async init() {
    const map = DEFAULT_MAP;
    this.map = map;
    const sheet = await Assets.load(getAssetPath('/images/sprites/Terrain.json'));

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tile = map[y][x];
        if (!tile) {
          continue;
        }
        const tileSprite = new Sprite(sheet.textures[tile.type + '.png']);
        tileSprite.anchor.set(0.5);
        tileSprite.x = x * 64;
        tileSprite.y = y * 64;
        tileSprite.width = 64;
        tileSprite.height = 64;
        this.container.addChild(tileSprite);
        if (tile.wall) {
          const wallSprite = new Sprite(sheet.textures[tile.wall + '.png']);
          wallSprite.anchor.set(0.5);
          wallSprite.x = x * 64;
          wallSprite.y = y * 64;
          wallSprite.width = 64;
          wallSprite.height = 64;
          this.container.addChild(wallSprite);
        }
      }
    }

    const x = this.app.app.screen.width / 2 - this.container.width / 1.5;
    const y = this.app.app.screen.height / 1.8 - this.container.height / 1.5;
    this.container.position.set(x, y);

    this.collisionManager.setMap(this.map, this.container.x, this.container.y);
  }

  public checkCollision(playerPos: Vector2, playerRadius: number): boolean {
    return this.collisionManager.checkCollision(playerPos, playerRadius);
  }

  public getCollisionManager(): CollisionManager {
    return this.collisionManager;
  }

  public destroy() {
    this.container.destroy({ children: true });
  }
}
