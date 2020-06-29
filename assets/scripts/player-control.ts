// cc.macro.ENABLE_WEBGL_ANTIALIAS = true;
import {
  _decorator,
  Component,
  math,
  systemEvent,
  macro,
  RigidBodyComponent,
  Touch,
  EventTouch,
  SystemEventType,
  EventKeyboard,
  Node,
  Vec3,
  Quat,
  AnimationComponent,
  CCFloat,
  PhysicsSystem,
  // tween,
} from "cc";
const { ccclass, property, menu } = _decorator;

let v3_0 = new Vec3();
const v2_0 = new math.Vec2();

enum EKey {
  NONE = 0,
  W = 1 << 0,
  A = 1 << 1,
  S = 1 << 2,
  D = 1 << 3,
}

@ccclass("playerControl")
export class playerControl extends Component {
  @property({ type: CCFloat })
  public shiftScale = 2;

  private _rigidBody: RigidBodyComponent = null;

  private _key: number = EKey.NONE;

  private prevPos: Vec3 = new Vec3(0, 0, 0);

  private walk: Boolean = false;

  // private initialCameraPos: Vec3 = new Vec3();

  @property({ slide: true, range: [1, 30, 0.1] })
  public readonly scale = 2;

  @property({ type: Node })
  public person: Node = null;

  @property({ type: Node })
  public mainCamera: Node = null;

  @property({ type: CCFloat })
  public smoothRot: number = 1;

  @property({ type: CCFloat })
  public maxSpeed: number = 6;

  @property({ type: CCFloat })
  public smooth: number = 0.125;

  public canMove = true;
  public isBuy = false;
  private offset = new Vec3();

  start() {
    this._rigidBody = this.getComponent(RigidBodyComponent);
    let person = this.person.getPosition();
    this.prevPos.set(person);
    let animation = this.person.getComponent(AnimationComponent);
    let clips = animation.clips;

    animation.play(clips[2].name);

    let o = new Vec3();
    math.Vec3.subtract(
      o,
      this.mainCamera.getWorldPosition(),
      this.person.getWorldPosition()
    );
    this.offset = o;
  }

  update(dt: number) {
    if (this.canMove) {
      let position = this.node.getPosition();
      let isMoving = false;

      if (this._key & EKey.W) {
        isMoving = true;

        math.Vec3.scaleAndAdd(
          position,
          position,
          new Vec3(0, 0, -1),
          dt * this.scale
        );
      }
      if (this._key & EKey.S) {
        isMoving = true;
        math.Vec3.scaleAndAdd(
          position,
          position,
          new Vec3(0, 0, -1),
          -dt * this.scale
        );
      }
      if (this._key & EKey.A) {
        isMoving = true;
        math.Vec3.scaleAndAdd(
          position,
          position,
          new Vec3(1, 0, 0),
          -dt * this.scale
        );
      }
      if (this._key & EKey.D) {
        isMoving = true;

        math.Vec3.scaleAndAdd(
          position,
          position,
          new Vec3(1, 0, 0),
          dt * this.scale
        );
      }

      if (isMoving) {
        this.plaAnimation(true);
        this.node.setPosition(position);
        this.playerRotate(dt);
        v3_0.set(0, 0, 0);
      }

      this.cameraSmooth(dt);
    }
  }

  plaAnimation(active: boolean) {
    let animation = this.person.getComponent(AnimationComponent);
    let clips = animation.clips;

    if (this.walk != active) {
      this.walk = active;
      if (this.walk) {
        if (!this.isBuy) animation.play(clips[4].name);
        else animation.play(clips[1].name);
      } else {
        // animation.crossFade(clips[1].name, 3);
        if (!this.isBuy) animation.crossFade(clips[2].name, 0.3);
        else animation.crossFade(clips[0].name, 0.3);
      }
    }
  }

  playerRotate(dt) {
    let per_0 = this.person.getWorldPosition();
    let per_1 = this.prevPos;
    let targetAngle =
      (Math.atan2(per_0.x - per_1.x, per_0.z - per_1.z) * 180) / Math.PI;

    let quat: Quat = new Quat();
    math.Quat.fromEuler(quat, 0, targetAngle, 0);
    let userRot = new Quat();
    math.Quat.slerp(
      userRot,
      this.person.getRotation(),
      quat,
      dt * +this.smoothRot
    );

    let eurlerRot = new Vec3();
    math.Quat.toEuler(eurlerRot, userRot);

    this.person.eulerAngles = eurlerRot;

    // this.person.eulerAngles = new Vec3(0, targetAngle, 0); // easy way to rotate

    this.prevPos.set(per_0);
  }

  cameraSmooth(dt) {
    // make smooth camera following
    let desiredPosition = new Vec3();
    math.Vec3.add(desiredPosition, this.offset, this.person.getWorldPosition());
    let smoothedPosition = new Vec3();
    math.Vec3.lerp(
      smoothedPosition,
      this.mainCamera.getWorldPosition(),
      desiredPosition,
      this.smooth * dt
    );
    this.mainCamera.setWorldPosition(smoothedPosition);
  }

  onEnable() {
    systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);

    systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
    systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
  }

  onDisable() {
    systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);

    systemEvent.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
    systemEvent.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
  }

  onKeyDown(event: EventKeyboard) {
    if (event.keyCode === macro.KEY.w || event.keyCode === macro.KEY.up) {
      this._key |= EKey.W;
    } else if (
      event.keyCode === macro.KEY.s ||
      event.keyCode === macro.KEY.down
    ) {
      this._key |= EKey.S;
    } else if (
      event.keyCode === macro.KEY.a ||
      event.keyCode === macro.KEY.left
    ) {
      this._key |= EKey.A;
    } else if (
      event.keyCode === macro.KEY.d ||
      event.keyCode === macro.KEY.right
    ) {
      this._key |= EKey.D;
    }
  }

  onKeyUp(event: EventKeyboard) {
    if (event.keyCode === macro.KEY.w || event.keyCode === macro.KEY.up) {
      this._key &= ~EKey.W;
      this.plaAnimation(false);
    } else if (
      event.keyCode === macro.KEY.s ||
      event.keyCode === macro.KEY.down
    ) {
      this._key &= ~EKey.S;
      this.plaAnimation(false);
    } else if (
      event.keyCode === macro.KEY.a ||
      event.keyCode === macro.KEY.left
    ) {
      this._key &= ~EKey.A;
      this.plaAnimation(false);
    } else if (
      event.keyCode === macro.KEY.d ||
      event.keyCode === macro.KEY.right
    ) {
      this._key &= ~EKey.D;
      this.plaAnimation(false);
    }
  }

  onTouchMove(touch: Touch, event: EventTouch) {
    touch.getDelta(v2_0);
    if (v2_0.x > 2) {
      this._key |= EKey.D;
      this._key &= ~EKey.A;
    } else if (v2_0.x < -2) {
      this._key |= EKey.A;
      this._key &= ~EKey.D;
    }
    if (v2_0.y > 2) {
      this._key |= EKey.W;
      this._key &= ~EKey.S;
    } else if (v2_0.y < -2) {
      this._key |= EKey.S;
      this._key &= ~EKey.W;
    }
  }

  onTouchEnd(touch: Touch, event: EventTouch) {
    this._key = EKey.NONE;
    this.plaAnimation(false);
  }
}
