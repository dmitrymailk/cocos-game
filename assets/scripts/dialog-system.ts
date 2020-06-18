import {
  _decorator,
  Component,
  Node,
  ButtonComponent,
  LabelComponent,
} from "cc";
const { ccclass, property } = _decorator;

import { dialog } from "../dialogs/dialog";

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

  @property({ type: LabelComponent })
  public choice_1: LabelComponent = null;

  @property({ type: LabelComponent })
  public choice_2: LabelComponent = null;

  private currentDialog = null;
  private gameDialogs = dialog;

  start() {
    // Your initialization goes here.

    this.currentDialog = dialog[0];
    this.gameDialogs = dialog;
    this.nextState();
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
    if (this.currentDialog.choices) {
      this.setActiveChoices(true);
      this.buttonChoice_1.id = this.currentDialog.choices[0];
      this.buttonChoice_2.id = this.currentDialog.choices[1];

      this.setTextById(this.choice_1, this.buttonChoice_1.id);
      this.setTextById(this.choice_2, this.buttonChoice_2.id);

      this.text.string = this.currentDialog.name;
    } else if (this.currentDialog.next) {
      let block = this.getById(this.currentDialog.next);
      this.setActiveChoices(false);
      if (block.type == "Text") {
        this.text.string = block.name;
      }

      if (block.choices) {
        this.currentDialog = block;
        this.nextState();
      }
    }
  }

  getById(id: any) {
    return this.gameDialogs.filter((item) => item.id == id)[0];
  }

  setActiveChoices(condition: boolean) {
    this.buttonChoice_1.node.active = condition;
    this.buttonChoice_2.node.active = condition;
  }

  reset() {
    this.currentDialog = this.gameDialogs[0];
    this.nextState();
  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
