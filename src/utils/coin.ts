import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

enum Anims {
  Loop = 'loop',
}

export class Coin {
  public static Sprite = 'coin';
  public static Anims = Anims;

  private readonly k: KaboomCtx;

  constructor(params: { k: KaboomCtx }) {
    this.k = params.k;

    this.spawn();
  }

  private spawn() {
    this.k.add([
      this.k.sprite(Coin.Sprite, { anim: Coin.Anims.Loop }),
      this.k.layer(Layers.Pipe),
      this.k.scale(2),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.k.rand(150, 250)),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 300),
      'coin',
    ]);
    this.k.wait(this.k.rand(1, 2), () => this.spawn());
  }
}
