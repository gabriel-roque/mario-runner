import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';
import { Sprites } from './sprites';

export class Grass {
  private readonly k: KaboomCtx;
  private readonly baseLine: number;

  constructor(k: KaboomCtx, baseLine: number) {
    this.k = k;
    this.baseLine = baseLine;
  }

  private low() {
    this.k.add([
      this.k.sprite(Sprites.GrassLow),
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
      this.k.sprite(Sprites.GrassHigh),
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

  spawnGrass() {
    this.high();
    this.low();
  }
}
