import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class Pipe {
  public static Sprite = 'pipe';

  private readonly k: KaboomCtx;
  private readonly baseLine: number;

  constructor(params: { k: KaboomCtx; baseLine: number }) {
    this.k = params.k;
    this.baseLine = params.baseLine;

    this.spawn();
  }

  private spawn() {
    this.k.add([
      this.k.sprite(Pipe.Sprite),
      this.k.layer(Layers.Pipe),
      this.k.scale(2),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.baseLine),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 240),
      'pipe',
    ]);
    this.k.wait(this.k.rand(1, 2), () => this.spawn());
  }
}
