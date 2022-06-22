import { Layers } from 'game';
import {
  AreaComp,
  BodyComp,
  GameObj,
  KaboomCtx,
  LayerComp,
  PosComp,
  ScaleComp,
  SpriteComp,
} from 'kaboom';
import { Sounds } from './sound';

enum Anims {
  Jump = 'jump',
  Run = 'run',
}

type MarioGameObj = GameObj<
  SpriteComp | LayerComp | PosComp | ScaleComp | AreaComp | BodyComp
>;

export class Mario {
  public static Sprite = 'mario';
  public static Anims = Anims;
  private readonly mario: MarioGameObj;

  private readonly k: KaboomCtx;

  constructor(params: { k: KaboomCtx }) {
    this.k = params.k;

    this.mario = this.spawn();
    this.events();
  }

  private spawn() {
    const mario = this.k.add([
      this.k.sprite(Mario.Sprite),
      this.k.layer(Layers.Game),
      this.k.pos(30, 352),
      this.k.scale(3),
      this.k.area(),
      this.k.body(),
    ]);
    mario.play(Mario.Anims.Run);
    return mario;
  }

  private events() {
    this.k.onKeyPress('space', () => {
      if (this.mario.isGrounded()) {
        this.mario.jump(800);
        this.mario.play(Mario.Anims.Jump);
        this.k.play(Sounds.Jump);
      }
    });

    this.mario.onCollide('pipe', () => {
      this.k.go('lose');
    });

    this.mario.onCollide('floor', () => {
      this.mario.frame = 0;
      this.mario.play(Mario.Anims.Run);
    });
  }
}
