import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';
import { Sprites } from './sprites';

export class Cloud {
  private readonly k: KaboomCtx;

  constructor(k: KaboomCtx) {
    this.k = k;
  }

  private one() {
    const areaAllowSpawn = this.k.height() / 2;

    this.k.add([
      this.k.sprite(Sprites.CloudOne),
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
      this.k.sprite(Sprites.CloudDouble),
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

  spawnClouds() {
    this.one();
    this.double();
  }
}
