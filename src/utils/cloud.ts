import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class Cloud {
  public static Sprite = {
    One: 'cloud-one',
    Double: 'cloud-double',
  };

  private readonly k: KaboomCtx;

  constructor(params: { k: KaboomCtx }) {
    this.k = params.k;

    this.spawn();
  }

  private one() {
    const areaAllowSpawn = this.k.height() / 2;

    this.k.add([
      this.k.sprite(Cloud.Sprite.One),
      this.k.layer(Layers.Parallax),
      this.k.scale(0.3),
      this.k.area(),
      this.k.pos(
        this.k.width(),
        this.k.rand(areaAllowSpawn - 60, areaAllowSpawn)
      ),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 75),
      'cloud',
    ]);
    this.k.wait(this.k.rand(7, 10), () => this.one());
  }

  private double() {
    const areaAllowSpawn = this.k.height() / 3;

    this.k.add([
      this.k.sprite(Cloud.Sprite.Double),
      this.k.layer(Layers.Parallax),
      this.k.scale(0.3),
      this.k.area(),
      this.k.pos(
        this.k.width(),
        this.k.rand(areaAllowSpawn - 50, areaAllowSpawn + 50)
      ),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 50),
      'cloud',
    ]);
    this.k.wait(this.k.rand(9, 12), () => this.double());
  }

  private spawn() {
    this.one();
    this.double();
  }
}
