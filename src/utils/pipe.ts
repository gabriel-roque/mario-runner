import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';
import { Sprites } from './sprites';

export class Pipe {
  private readonly k: KaboomCtx;
  private readonly baseLine: number;

  constructor(k: KaboomCtx, baseLine: number) {
    this.k = k;
    this.baseLine = baseLine;
  }

  spawnPipe() {
    this.k.add([
      this.k.sprite(Sprites.Pipe),
      this.k.layer(Layers.Pipe),
      this.k.scale(2),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.baseLine),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 240),
      'pipe',
    ]);
    this.k.wait(this.k.rand(1, 2), () => this.spawnPipe());
  }
}
