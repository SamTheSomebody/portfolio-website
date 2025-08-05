import type { Player } from "./Player";
import {
  IdleState,
  MoveState,
  AttackingState,
  BlockState,
} from "./PlayerState";
import type { IState } from "./PlayerState";

export class PlayerStateMachine {
  private currentState!: IState;
  private player: Player;
  private movementDirection: { x: number; y: number } = { x: 0, y: 0 };
  private onPositionChange?: (x: number, y: number) => void;

  constructor(player: Player) {
    this.player = player;
  }

  public init() {
    this.currentState = new IdleState(this.player);
  }

  public update(deltaTime: number) {
    const sprite = this.player.animation.getSprite();
    if (!sprite) return;

    this.currentState.update(deltaTime);

    if (this.onPositionChange) {
      this.onPositionChange(sprite.x, sprite.y);
    }
  }

  public setState(newState: IState) {
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
        this.setState(new MoveState(this.player));
      }
    } else if (!(this.currentState instanceof IdleState)) {
      this.setState(new IdleState(this.player));
    }
  }

  public handleAttack() {
    if (this.currentState instanceof AttackingState) return;
    this.setState(new AttackingState(this.player));
  }

  public handleBlockStart() {
    if (this.currentState instanceof AttackingState) return;
    this.setState(new BlockState(this.player));
  }

  public handleBlockEnd() {
    this.setState(new IdleState(this.player));
    this.handleMovementInput(this.movementDirection);
  }

  public onAttackComplete() {
    this.setState(new IdleState(this.player));
    this.handleMovementInput(this.movementDirection);
  }

  public getPosition(): { x: number; y: number } {
    const sprite = this.player.animation.getSprite();
    return { x: sprite.x, y: sprite.y };
  }

  public setPositionChangeCallback(callback: (x: number, y: number) => void) {
    this.onPositionChange = callback;
  }
}
