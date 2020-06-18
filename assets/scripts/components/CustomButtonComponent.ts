import { _decorator, ButtonComponent } from "cc";
const { ccclass } = _decorator;

@ccclass("CustomButtonComponent")
export class CustomButtonComponent extends ButtonComponent {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */

  public eventData: any = "";
  public id: string = "";
}
