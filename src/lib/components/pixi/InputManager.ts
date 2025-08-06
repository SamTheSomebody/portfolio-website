export interface Vector2D {
  x: number;
  y: number;
}

export interface InputEvents {
  onMovementInput?: (direction: Vector2D) => void;
  onAttack?: () => void;
  onBlockStart?: () => void;
  onBlockEnd?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export class InputManager {
  public events: InputEvents = {};
  private keydownHandler: (e: KeyboardEvent) => void;
  private keyupHandler: (e: KeyboardEvent) => void;
  private movementVector: Vector2D = { x: 0, y: 0 };
  private lastMovementVector: Vector2D = { x: 0, y: 0 };
  private canAttack = true;
  private canBlock = true;
  private isLeft = false;
  private isRight = false;
  private isUp = false;
  private isDown = false;

  constructor() {
    this.keydownHandler = e => {
      this.handleKeyDown(e.key);
    };

    this.keyupHandler = e => {
      this.handleKeyUp(e.key);
    };

    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
  }

  // Public method to handle synthetic keydown events from virtual keyboard
  public handleSyntheticKeyDown(key: string) {
    this.handleKeyDown(key);
  }

  // Public method to handle synthetic keyup events from virtual keyboard
  public handleSyntheticKeyUp(key: string) {
    this.handleKeyUp(key);
  }

  private handleKeyDown(key: string) {
    switch (key) {
      case 'e':
      case 'Enter': {
        if (this.canAttack && this.events.onAttack) {
          this.events.onAttack();
          this.canAttack = false;
        }
        break;
      }
      case 'q': {
        if (this.canBlock && this.events.onBlockStart) {
          this.events.onBlockStart();
          this.canBlock = false;
        }
        break;
      }
      case 'Escape': {
        if (this.events.onCancel) {
          this.events.onCancel();
        }
        break;
      }
      case 'w':
      case 'ArrowUp':
        this.isUp = true;
        this.isDown = false;
        break;
      case 's':
      case 'ArrowDown':
        this.isDown = true;
        this.isUp = false;
        break;
      case 'a':
      case 'ArrowLeft':
        this.isLeft = true;
        this.isRight = false;
        break;
      case 'd':
      case 'ArrowRight':
        this.isRight = true;
        this.isLeft = false;
        break;
    }
    this.handleMovement();
  }

  private handleKeyUp(key: string) {
    switch (key) {
      case 'e':
      case 'Enter':
        this.canAttack = true;
        break;
      case 'q': {
        if (this.events.onBlockEnd) {
          this.events.onBlockEnd();
          this.canBlock = true;
        }
        break;
      }
      case 'w':
      case 'ArrowUp':
        this.isUp = false;
        break;
      case 's':
      case 'ArrowDown':
        this.isDown = false;
        break;
      case 'a':
      case 'ArrowLeft':
        this.isLeft = false;
        break;
      case 'd':
      case 'ArrowRight':
        this.isRight = false;
        break;
    }
    this.handleMovement();
  }

  private handleMovement() {
    this.movementVector.y = this.isUp ? -1 : this.isDown ? 1 : 0;
    this.movementVector.x = this.isLeft ? -1 : this.isRight ? 1 : 0;
    if (this.movementVector.x !== this.lastMovementVector.x || this.movementVector.y !== this.lastMovementVector.y) {
      this.events.onMovementInput?.(this.movementVector);
      this.lastMovementVector.x = this.movementVector.x;
      this.lastMovementVector.y = this.movementVector.y;
    }
  }

  public setEvents(events: InputEvents) {
    this.events = events;
  }

  public destroy() {
    window.removeEventListener('keydown', this.keydownHandler);
    window.removeEventListener('keyup', this.keyupHandler);
  }
}
