import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class Grass {
  public static Sprite = {
    Low: 'grass-low',
    High: 'grass-high',
  };

  private readonly k: KaboomCtx;
  private readonly baseLine: number;

  constructor(params: { k: KaboomCtx; baseLine: number }) {
    this.k = params.k;
    this.baseLine = params.baseLine;

    this.spawn();
  }

  private low() {
    this.k.add([
      this.k.sprite(Grass.Sprite.Low),
      this.k.layer(Layers.Parallax),
      this.k.scale(1.5),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.baseLine),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 150),
      'grass',
    ]);
    this.k.wait(this.k.rand(9, 12), () => this.low());
  }

  private high() {
    this.k.add([
      this.k.sprite(Grass.Sprite.High),
      this.k.layer(Layers.Parallax),
      this.k.scale(1.5),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.baseLine),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 100),
      this.k.color(211, 169, 16),
      'grass',
    ]);
    this.k.wait(this.k.rand(7, 10), () => this.high());
  }

  private spawn() {
    this.high();
    this.low();
  }
}
