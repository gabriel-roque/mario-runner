import { Layers } from 'game';
import {
  AreaComp,
  BodyComp,
  GameObj,
  KaboomCtx,
  Key,
  LayerComp,
  PosComp,
  ScaleComp,
  SpriteComp,
} from 'kaboom';
import { Coin } from './coin';
import { FloorGrass } from './floor-grass';
import { Pipe } from './pipe';
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
  public readonly mario: MarioGameObj;

  private readonly k: KaboomCtx;
  public onCollideCoin?: Function;

  constructor(params: { k: KaboomCtx; onCollideCoin?: Function }) {
    this.k = params.k;

    if (params.onCollideCoin) {
      this.onCollideCoin = params.onCollideCoin;
    }

    this.mario = this.spawn();
    this.events();

    return this;
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
    const keysAllowJump: Key[] = ['up', 'space'];

    keysAllowJump.forEach((key: Key) => {
      this.k.onKeyPress(key, () => {
        if (this.mario.isGrounded()) {
          this.mario.jump(800);
          this.mario.play(Mario.Anims.Jump);
          this.k.play(Sounds.Jump);
        }
      });
    });

    this.k.onKeyDown('right', () => {
      if (this.mario.pos.x <= 850) {
        this.mario.move(200, 0);
      }
    });

    this.k.onKeyDown('left', () => {
      if (this.mario.pos.x >= 30) {
        this.mario.move(-200, 0);
      }
    });

    this.mario.onCollide(Pipe.Sprite, () => {
      // this.k.go('lose');
    });

    this.mario.onCollide(FloorGrass.Sprite, () => {
      this.mario.frame = 0;
      this.mario.play(Mario.Anims.Run);
    });

    this.mario.onCollide(Coin.Sprite, (obj) => {
      this.k.play(Sounds.Coin, { volume: 0.1 });
      obj.destroy();

      this?.onCollideCoin && this.onCollideCoin();
    });
  }
}
