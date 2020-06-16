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

  // tween,
} from "cc";
const { ccclass, property, menu } = _decorator;

const v3_0 = new math.Vec3();
const v2_0 = new math.Vec2();

enum EKey {
  NONE = 0,
  W = 1 << 0,
  A = 1 << 1,
  S = 1 << 2,
  D = 1 << 3,
  SHIFT = 1 << 4,
}

@ccclass("playerControl")
export class playerControl extends Component {
  @property({ slide: true, range: [1, 3, 0.01] })
  public readonly shiftScale = 2;

  private _rigidBody: RigidBodyComponent = null;

  private _key: number = EKey.NONE;

  private prevPos: Vec3 = new Vec3(0, 0, 0);

  private personRotation: Quat = new Quat(0, 0, 0, 1);

  private someVec: Vec3 = null;

  private walk: Boolean = false;

  @property({ slide: true, range: [1, 30, 0.1] })
  public readonly scale = 2;

  @property({ type: Node })
  public person: Node = null;

  @property({ type: Number })
  public smoothRot: Number = 1;

  start() {
    this._rigidBody = this.getComponent(RigidBodyComponent);
    let person = this.person.getPosition();
    let { x, y, z } = person;
    this.prevPos.set(person);
    this.plaAnimation(false);
    // this.personRotation.set(0, 0, 0, 0);
    // this.person.rotate()
  }

  update(dt: number) {
    if (this._key & EKey.W) {
      v3_0.z = -1;
    }
    if (this._key & EKey.S) {
      v3_0.z = 1;
    }
    if (this._key & EKey.A) {
      v3_0.x = -1;
    }
    if (this._key & EKey.D) {
      v3_0.x = 1;
    }
    if (this._key & EKey.SHIFT) {
    }

    if (v3_0.z != 0 || v3_0.x != 0) {
      v3_0.multiplyScalar(this.shiftScale);
      this._rigidBody.applyImpulse(v3_0);
      this.plaAnimation(true);
      v3_0.set(0, 0, 0);
    }
    if (this._rigidBody.isAwake) {
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
  }

  plaAnimation(active: Boolean) {
    let animation = this.person.getComponent(AnimationComponent);
    let clips = animation.clips;

    if (this.walk != active) {
      this.walk = active;
      if (this.walk) {
        // animation.play(clips[0].name);
        // animation.stop();
        animation.crossFade(clips[0].name, 3);
        animation.play(clips[0].name);
      } else {
        // animation.crossFade(clips[1].name, 3);
        animation.play(clips[1].name);
      }
    }
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
    if (event.keyCode == macro.KEY.w) {
      this._key |= EKey.W;
    } else if (event.keyCode === macro.KEY.s) {
      this._key |= EKey.S;
    } else if (event.keyCode === macro.KEY.a) {
      this._key |= EKey.A;
    } else if (event.keyCode === macro.KEY.d) {
      this._key |= EKey.D;
    } else if (event.keyCode === macro.KEY.shift) {
      this._key |= EKey.SHIFT;
    }
  }

  onKeyUp(event: EventKeyboard) {
    if (event.keyCode == macro.KEY.w) {
      this._key &= ~EKey.W;
      this.plaAnimation(false);
    } else if (event.keyCode === macro.KEY.s) {
      this._key &= ~EKey.S;
      this.plaAnimation(false);
    } else if (event.keyCode === macro.KEY.a) {
      this._key &= ~EKey.A;
      this.plaAnimation(false);
    } else if (event.keyCode === macro.KEY.d) {
      this._key &= ~EKey.D;
      this.plaAnimation(false);
    } else if (event.keyCode === macro.KEY.shift) {
      this._key &= ~EKey.SHIFT;
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
