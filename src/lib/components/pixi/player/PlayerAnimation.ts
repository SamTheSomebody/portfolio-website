import { AnimatedSprite, Assets, Sprite, Texture } from 'pixi.js';
import { App } from '../App';
import type { Vector2 } from '../types/position';
import { getAssetPath } from '../../../utils/assetPaths';

export class PlayerAnimation {
  private sprite!: AnimatedSprite;
  private app: App;
  private animations: { [key: string]: Texture[] } = {};
  private currentAnimation = '';

  constructor(app: App) {
    this.app = app;
  }

  async init() {
    const sheet = await Assets.load(getAssetPath('/images/sprites/Warrior.json'));
    const animationTypes = ['Idle', 'Run', 'Attack1', 'Attack2', 'Guard'];
    animationTypes.forEach(type => {
      this.animations[type] = Object.keys(sheet.data.frames)
        .filter(key => key.startsWith(`Warrior_${type}`))
        .map(key => sheet.textures[key]);
    });

    this.sprite = new AnimatedSprite(this.animations['Idle']);
    this.sprite.anchor.set(0.5);
    this.sprite.x = this.app.app.screen.width / 2;
    this.sprite.y = this.app.app.screen.height / 1.8;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.app.addChild(this.sprite);
  }

  public setAnimation(animationName: string) {
    if (this.animations[animationName] && this.sprite && this.currentAnimation !== animationName) {
      this.sprite.textures = this.animations[animationName];
      this.sprite.play();
      this.currentAnimation = animationName;
    }
  }

  public setLoop(loop: boolean) {
    if (this.sprite) {
      this.sprite.loop = loop;
    }
  }

  public getSprite(): AnimatedSprite {
    return this.sprite;
  }

  public getCurrentFrame(): number {
    return this.sprite ? this.sprite.currentFrame : 0;
  }

  public getTotalFrames(): number {
    return this.sprite ? this.sprite.textures.length : 0;
  }

  public getPosition(): Vector2 {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  public destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
