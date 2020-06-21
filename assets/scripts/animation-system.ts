import {
  _decorator,
  Component,
  Node,
  AnimationComponent,
  ColliderComponent,
  systemEvent,
  macro,
  EventKeyboard,
  CameraComponent,
  Vec3,
  SystemEventType,
  director,
  animation,
} from "cc";
const { ccclass, property } = _decorator;

enum EKey {
  NONE = 0,
  X = 1 << 0,
}

@ccclass("AnimationSystem")
export class AnimationSystem extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  // @property
  // serializableDummy = 0;

  @property({ type: Node })
  public playerControl: Node = null;

  @property({ type: Node })
  public coffeeCup: Node = null;

  @property({ type: Node })
  public coffeeTrigger: Node = null;

  @property({ type: Node })
  public person: Node = null;

  @property({ type: Node })
  public coffeButtonNode: Node = null;

  @property({ type: Node })
  public coffeButtonUI: Node = null;

  @property({ type: CameraComponent })
  public mainCamera: CameraComponent = null;

  @property({ type: Node })
  public objOnGirl: Node = null;

  @property({ type: Node })
  public backToComic: Node = null;

  private isEnterCoffee = false;
  private _key: number = EKey.NONE;
  private isXpressed = false;
  private isBuy = false;
  private isCoffeeLine = false;

  start() {
    // @ts-ignore
    this.playerControl = this.playerControl.getComponent("playerControl");
    let coffeeTrigger = this.coffeeTrigger.getComponent(ColliderComponent);
    let backToComic = this.backToComic.getComponent(ColliderComponent);

    coffeeTrigger.on("onTriggerEnter", this.enterCoffee, this);
    coffeeTrigger.on("onTriggerExit", this.exitCoffee, this);

    backToComic.on(
      "onTriggerEnter",
      () => {
        this.stopMove();
        self.id = 5;
        let animation = this.mainCamera.getComponent(AnimationComponent);
        let clips = animation.clips;
        animation.play(clips[0].name);
        // @ts-ignore
        animation.on("finished", () => {
          director.loadScene("comic");
        });
      },
      this
    );
  }

  showCup() {
    let animation = this.coffeeCup.getComponent(AnimationComponent);
    let clips = animation.clips;
    animation.play(clips[0].name);
    //@ts-ignore
    animation.on("finished", () => {
      animation.play(clips[1].name);
    });

    this.isCoffeeLine = true;
  }

  stopMove() {
    // @ts-ignore
    console.log("CAN MOVE", this.playerControl.canMove);
    // @ts-ignore
    this.playerControl.canMove = !this.playerControl.canMove;
    // @ts-ignore
  }

  enterCoffee() {
    if (!this.isBuy && this.isCoffeeLine) {
      this.isEnterCoffee = true;
      console.log("enter coffee");
      this.coffeButtonUI.active = true;
    }
  }

  exitCoffee() {
    console.log("exit coffee");
    this.isEnterCoffee = false;
    this.coffeButtonUI.active = false;
  }

  nodeToUI(uinode: Node, node3d: Node) {
    let vec = new Vec3();
    node3d.getWorldPosition(vec);
    this.mainCamera.convertToUINode(vec, uinode.parent, vec);
    uinode.setPosition(vec);
  }

  lateUpdate() {
    if (this.isEnterCoffee) {
      this.nodeToUI(this.coffeButtonUI, this.coffeButtonNode);

      if (this._key & EKey.X && !this.isXpressed) {
        console.log("Pressed X");
        this.isXpressed = !this.isXpressed;
        this.isBuy = true;
        this.coffeButtonUI.active = false;
        // @ts-ignore
        this.playerControl.isBuy = true;
      }
    }

    if (this.isBuy) {
      let posOnGirl = this.objOnGirl.getWorldPosition();
      //   console.log("on girl", posOnGirl);
      this.coffeeCup.setWorldPosition(posOnGirl);
    }
  }

  onKeyDown(event: EventKeyboard) {
    if (event.keyCode == macro.KEY.x) {
      this._key |= EKey.X;
    }
  }

  onKeyUp(event: EventKeyboard) {
    if (event.keyCode == macro.KEY.x) {
      this._key &= ~EKey.X;
    }
  }

  onEnable() {
    systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
    systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
  }
}
