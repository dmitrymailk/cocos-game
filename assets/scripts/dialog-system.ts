import {
  _decorator,
  Component,
  Node,
  ButtonComponent,
  LabelComponent,
  ColliderComponent,
  AnimationComponent,
  SpriteComponent,
} from "cc";
const { ccclass, property } = _decorator;

import { dialog } from "../dialogs/dialog_3";

import { CustomButtonComponent } from "./components/CustomButtonComponent";

@ccclass("DialogSystem")
export class DialogSystem extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  @property({ type: LabelComponent })
  public text: LabelComponent = null;

  @property({ type: ButtonComponent })
  public buttonChoice_1: CustomButtonComponent = null;

  @property({ type: ButtonComponent })
  public buttonChoice_2: CustomButtonComponent = null;

  @property({ type: ButtonComponent })
  public textButton: CustomButtonComponent = null;

  @property({ type: LabelComponent })
  public choice_1: LabelComponent = null;

  @property({ type: LabelComponent })
  public choice_2: LabelComponent = null;

  @property({ type: SpriteComponent })
  public personView: SpriteComponent = null;

  private currentDialog = null;
  private gameDialogs = dialog;
  private isStart = false;

  @property({ type: Node })
  public triggerBlock: ColliderComponent = null;

  start() {
    // Your initialization goes here.

    this.currentDialog = dialog[0];
    this.gameDialogs = dialog;

    let collider = this.triggerBlock.getComponent(ColliderComponent);
    if (collider) {
      collider.once("onTriggerEnter", this.startDialog, this);
    }
  }

  chooseOption(e: any) {
    let id = e.target._components[2].id;
    console.log(id);
    let dialogBlock = this.getById(id);
    this.currentDialog = dialogBlock;
    this.nextState();
  }

  setTextById(choice: LabelComponent, id: string) {
    let text = this.getById(id).name;
    choice.string = text;
  }

  nextState() {
    let activeText = this.currentDialog.name || false;
    if (activeText) activeText = true;
    this.textButton.node.active = activeText;
    this.text.node.active = activeText;

    if (this.currentDialog.choices) {
      this.setActiveChoices(true);
      this.showDialog(this.buttonChoice_1);
      this.showDialog(this.buttonChoice_2);

      this.buttonChoice_1.id = this.currentDialog.choices[0];
      this.buttonChoice_2.id = this.currentDialog.choices[1];

      this.setTextById(this.choice_1, this.buttonChoice_1.id);
      this.setTextById(this.choice_2, this.buttonChoice_2.id);

      this.text.string = this.currentDialog.name;

      this.textButton.id = this.currentDialog.id;
    } else if (this.currentDialog.next) {
      let block = this.getById(this.currentDialog.next);

      this.setActiveChoices(false);

      if (block.type == "Text") {
        this.text.string = block.name;
      }

      if (block.next) {
        this.currentDialog = block;
        this.textButton.id = block.id;
      } else if (block.choices) {
        this.currentDialog = block;
        this.textButton.id = block.id;
        this.nextState();
      }
    }

    if (!this.isStart) this.isStart = true;
  }

  getById(id: any) {
    return this.gameDialogs.filter((item) => item.id == id)[0];
  }

  setActiveChoices(condition: boolean) {
    this.buttonChoice_1.node.active = condition;
    this.buttonChoice_2.node.active = condition;
    // this.textButton.enabled = !condition;
  }

  reset() {
    this.currentDialog = this.gameDialogs[0];
    this.setActiveChoices(false);
    let activeText = false;
    this.textButton.node.active = activeText;
    this.text.node.active = activeText;

    this.isStart = false;
  }

  startDialog() {
    if (!this.isStart) {
      this.nextState();
      this.personView.node.active = true;
    }
  }

  showDialog(dialog: ButtonComponent) {
    let animation = dialog.getComponent(AnimationComponent);
    let clips = animation.clips;
    animation.play(clips[0].name);
  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
