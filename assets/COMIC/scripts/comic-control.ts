import {
  _decorator,
  Component,
  Node,
  AnimationComponent,
  AnimationClip,
  director,
  UITransformComponent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("ComicControl")
export class ComicControl extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  @property({ type: Node })
  public sprites: Node = null;

  @property({ type: AnimationClip })
  public next: AnimationClip = null;

  @property({ type: AnimationClip })
  public prev: AnimationClip = null;

  @property({ type: AnimationClip })
  public zoom: AnimationClip = null;

  private currentSlide = 1;
  private maxSlides = 8;

  start() {
    for (let i = 1; i < this.maxSlides; i++) {
      let sprite = this.sprites.getChildByName(`${i}`);
      sprite.addComponent(AnimationComponent);
      let animation = sprite.getComponent(AnimationComponent);
      animation.addClip(this.next);
      animation.addClip(this.prev);
      animation.addClip(this.zoom);
    }
    if (self.id) {
      this.setSlideById(self.id);
    }
  }

  nextSlide() {
    if (this.currentSlide + 1 <= this.maxSlides) {
      this.playAnimById(this.currentSlide, 0);
      this.currentSlide++;
      self.id = this.currentSlide;
    }
  }

  prevSlide() {
    if (this.currentSlide - 1 >= 1) {
      this.playAnimById(this.currentSlide - 1, 1);
      this.currentSlide--;
    }
  }

  select() {
    let curr = this.currentSlide;

    if (curr == 5) {
      let sprite = this.sprites.getChildByName(`${this.currentSlide}`);
      let animation = sprite.getComponent(AnimationComponent);
      let clips = animation.clips;
      animation.play(clips[2].name);
      director.loadScene("cafe");
    }
  }

  playAnimById(id: number, pos: number) {
    let sprite = this.sprites.getChildByName(`${id}`);
    let animation = sprite.getComponent(AnimationComponent);
    let clips = animation.clips;
    animation.play(clips[pos].name);
  }

  setSlideById(id: number) {
    for (let i = 1; i < id; i++) {
      this.nextSlide();
    }
  }
}
