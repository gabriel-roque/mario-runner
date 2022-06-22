import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class BackgroundGrass {
  public static Sprite = 'background';

  private readonly k: KaboomCtx;

  constructor(params: { k: KaboomCtx }) {
    this.k = params.k;

    this.spawn();
  }

  private spawn() {
    this.k.add([
      this.k.sprite(BackgroundGrass.Sprite),
      this.k.layer(Layers.Background),
      this.k.scale(2),
      this.k.pos(this.k.center().x, 250),
      this.k.origin('center'),
    ]);
  }
}
