// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    myprop: 123,
    target: cc.Node,
    camera: cc.Camera,
    // touch: cc.Node,
    degreeX: 0,
    degreeY: 0,
    srollZ: 0,
    keymask: [],
    walk: false,
    bubbleDialog_1: cc.Node,
    offsetX_1: 0,
    offsetY_1: 0,
    bubbleDialog_2: cc.Node,
    offsetX_2: 0,
    offsetY_2: 0,
  },

  //   isDown: false,
  //   cX: this.target.x,

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    //add keyboard input listener to call turnLeft and turnRight
  },

  start() {
    console.log(this.target.x, this.target.y, this.target.z);
    // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    // this.touch.on(
    //   cc.Node.EventType.TOUCH_MOVE,
    //   function (event) {
    //     var v2 = event.getDelta();
    //     this.degreeX += v2.y;
    //     this.degreeY -= v2.x;
    //     // this.srollZ += event.getScrollY();
    //     console.log(this.srollZ, v2.y, v2.x);
    //   },
    //   this
    // );
    this.plaAnimation(false);
  },

  onKeyDown(event) {
    this.keymask[event.keyCode] = true;
  },

  onKeyUp(event) {
    console.log("UP key", this.keymask[event.keyCode]);
    this.plaAnimation(false);
    delete this.keymask[event.keyCode];
  },

  buttonTest() {
    console.log("test button");
  },

  update(dt) {
    if (!CC_EDITOR) {
      this.onMove();
    }

    // // 角度
    // this.camera.node.eulerAngles = new cc.Vec3(this.degreeX, this.degreeY, 0);

    // // 节点位置作为原点
    // var local = new cc.Vec3(0, 0, 300);
    // var newLocal = new cc.Vec3(0, 0, 0);

    // // 镜头远近
    // local.mul(1, newLocal);
    // local = newLocal.clone();

    // var outMat = new cc.Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    // var mat1 = new cc.Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    // var quaOut = new cc.Quat();
    // quaOut.fromEuler(new cc.Vec3(this.degreeX, this.degreeY, 0));
    // mat1.fromQuat(quaOut);

    // // 对方向做旋转变化
    // local.transformMat4(mat1, newLocal);
    // local = newLocal.clone();

    // // 加上节点位置 (50 模型的高度)
    // var nodeLocal = new cc.Vec3(this.node.x, this.node.y + 10, this.node.z);
    // local.add(nodeLocal, newLocal);
    // local = newLocal.clone();

    // this.camera.node.setPosition(local);
  },

  onMove() {
    var nowDegree = this.degreeY;
    var find = false;
    this.keymask.forEach(() => {
      find = true;
    });

    // if (!clips[this.playingIndex]) {
    //     this.playingIndex = 0;
    // }

    // animation.play(clips[0].name);
    // this.playingIndex++;

    if (!find) return;

    if (this.keymask[cc.macro.KEY.w]) {
      nowDegree += 180;
      this.node.eulerAngles = new cc.Vec3(0, this.degreeY + 180, 0);
      this.plaAnimation(true);
      // animation.play(clips[1].name);
    } else if (this.keymask[cc.macro.KEY.s]) {
      nowDegree = 0;
      this.node.eulerAngles = new cc.Vec3(0, this.degreeY, 0);
      // animation.play(clips[1].name);
      this.plaAnimation(true);
    } else if (this.keymask[cc.macro.KEY.a]) {
      nowDegree -= 90;
      this.node.eulerAngles = new cc.Vec3(0, nowDegree, 0);
      this.plaAnimation(true);
      // animation.play(clips[1].name);
    } else if (this.keymask[cc.macro.KEY.d]) {
      nowDegree += 90;
      this.node.eulerAngles = new cc.Vec3(0, nowDegree, 0);
      // animation.play(clips[1].name);
      this.plaAnimation(true);
      console.log("D");
      // animation.setCurrentTime(1);
    }

    var mat = new cc.Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

    var quaOut = new cc.Quat();
    quaOut.fromEuler(new cc.Vec3(0, nowDegree, 0));
    mat.fromQuat(quaOut);

    var newLocal = new cc.Vec3();
    var local = new cc.Vec3(0, 0, 1);
    local.transformMat4(mat, newLocal);
    this.node.z += newLocal.z;
    this.node.x += newLocal.x;

    this.bubbleDialog_1.x = this.node.x + this.offsetX_1;
    this.bubbleDialog_1.y = this.node.y + this.offsetY_1;

    this.bubbleDialog_2.x = this.node.x + this.offsetX_2;
    this.bubbleDialog_2.y = this.node.y + this.offsetY_2;
  },

  controlsPlayer() {
    var cursors = this.scene.cursors;
    var player = this;

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("player-run", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("player-run", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("player-idle", false);
    }

    if (cursors.up.isDown && player.body.onFloor()) {
      player.anims.play("player-jump", false);
      player.setVelocityY(-410);
      console.log("object");
    }
  },

  plaAnimation(active) {
    let animation = this.getComponent(cc.Animation);
    let clips = animation.getClips();
    console.log("update");
    if (this.walk != active) {
      this.walk = active;
      if (this.walk) {
        animation.play(clips[1].name);
        console.log("idle", this.walk, active);
      } else {
        animation.play(clips[0].name);
        console.log("run", this.walk, active);
      }
    }
  },
});
