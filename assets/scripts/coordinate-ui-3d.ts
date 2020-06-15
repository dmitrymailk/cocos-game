import { _decorator, Component, CameraComponent, Vec3, Quat, Node } from "cc";
const { ccclass, property, menu } = _decorator;

const _v3_0 = new Vec3();
const _v3_1 = new Vec3();

@ccclass("CoordinateUI3D")
@menu("UI/CoordinateUI3D")
export class CoordinateUI3D extends Component {
  @property({ type: Node })
  public D3Node: Node = null;

  @property({ type: Node })
  public D3Node_2: Node = null;

  @property({ type: Node })
  public UINode: Node = null;

  @property({ type: Node })
  public UINode_2: Node = null;

  @property({ type: CameraComponent })
  public mainCamera: CameraComponent = null;

  lateUpdate(deltaTime: number) {
    this.D3Node.getWorldPosition(_v3_0);
    this.mainCamera.convertToUINode(_v3_0, this.UINode.parent, _v3_0);
    this.UINode.setPosition(_v3_0);

    this.D3Node_2.getWorldPosition(_v3_1);
    this.mainCamera.convertToUINode(_v3_1, this.UINode_2.parent, _v3_1);
    this.UINode_2.setPosition(_v3_1);
  }
}
