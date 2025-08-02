import { AnimatedSprite, Assets, Texture } from "pixi.js";
import { App } from "../App";
import {
  IdleState,
  MoveState,
  AttackingState,
  BlockState,
} from "./PlayerState";
import type { IPlayerState } from "./PlayerState";

export class Player {
  sprite!: AnimatedSprite;
  private currentState!: IPlayerState;
  private app: App;
  private onPositionChange?: (x: number, y: number) => void;
  private animations: { [key: string]: Texture[] } = {};
  private currentAnimation = "";
  private movementDirection: { x: number; y: number } = { x: 0, y: 0 };

  constructor(app: App) {
    this.app = app;
  }

  async init() {
    const sheet = await Assets.load("/images/sprites/Warrior.json");
    const animationTypes = ["Idle", "Run", "Attack1", "Attack2", "Guard"];
    animationTypes.forEach((type) => {
      this.animations[type] = Object.keys(sheet.data.frames)
        .filter((key) => key.startsWith(`Warrior_${type}`))
        .map((key) => sheet.textures[key]);
    });
    this.sprite = new AnimatedSprite(this.animations["Idle"]);
    this.sprite.anchor.set(0.5);
    this.sprite.x = this.app.app.screen.width / 2;
    this.sprite.y = this.app.app.screen.height / 1.8;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.app.addChild(this.sprite);
    this.currentState = new IdleState(this);
  }

  public update(deltaTime: number) {
    if (!this.sprite) return;
    this.currentState.update(deltaTime);
    this.handleScreenWrapping();
    if (this.onPositionChange) {
      this.onPositionChange(this.sprite.x, this.sprite.y);
    }
  }

  public setState(newState: IPlayerState) {
    this.currentState.onExit();
    this.currentState = newState;
    this.currentState.onEnter();
  }

  public handleMovementInput(direction: { x: number; y: number }) {
    this.movementDirection = direction;
    const velocity = Math.abs(direction.x) + Math.abs(direction.y);
    if (
      !(
        this.currentState instanceof IdleState ||
        this.currentState instanceof MoveState
      )
    ) {
      return;
    }
    if (velocity > 0) {
      if (!(this.currentState instanceof MoveState)) {
        this.setState(new MoveState(this));
      }
    } else if (!(this.currentState instanceof IdleState)) {
      this.setState(new IdleState(this));
    }
  }

  public handleAttack() {
    this.setState(new AttackingState(this));
  }

  public handleBlockStart() {
    if (this.currentState instanceof AttackingState) return;
    this.setState(new BlockState(this));
  }

  public handleBlockEnd() {
    this.setState(new IdleState(this));
    this.handleMovementInput(this.movementDirection);
  }

  public onAttackComplete() {
    this.setState(new IdleState(this));
    this.handleMovementInput(this.movementDirection);
  }

  private handleScreenWrapping() {
    if (this.sprite.x < -50) this.sprite.x = this.app.app.screen.width + 50;
    if (this.sprite.x > this.app.app.screen.width + 50) this.sprite.x = -50;
    if (this.sprite.y < -50) this.sprite.y = this.app.app.screen.height + 50;
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  public getMovementDirection(): { x: number; y: number } {
    return this.movementDirection;
  }

  public setAnimation(animationName: string) {
    if (
      this.animations[animationName] &&
      this.sprite &&
      this.currentAnimation !== animationName
    ) {
      this.sprite.textures = this.animations[animationName];
      this.sprite.play();
      this.currentAnimation = animationName;
    }
  }

  public setPositionChangeCallback(callback: (x: number, y: number) => void) {
    this.onPositionChange = callback;
  }

  public destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
