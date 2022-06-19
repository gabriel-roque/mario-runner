import { KaboomCtx } from 'kaboom';

export class Sprites {
  private readonly k: KaboomCtx;

  constructor(k: KaboomCtx) {
    this.k = k;
  }

  loadSprites(): void {
    this.k.loadSprite('mario', './sprites/mario-sprite.png', {
      sliceX: 13.2,
      sliceY: 1,
      anims: {
        jump: { from: 7, to: 9 },
        run: { from: 1, to: 3, loop: true, speed: 10 },
      },
    });

    this.k.loadSprite('pipe', './sprites/pipe.png');
    this.k.loadSprite('floor', './sprites/floor-mario.png', {
      sliceX: 2,
      sliceY: 1,
      anims: {
        moviment: { from: 0, to: 1, loop: true, speed: 7 },
      },
    });

    this.k.loadSprite('bg', './sprites/bg-mario.png');
    this.k.loadSprite('grass-low', './sprites/grass-low.png');
    this.k.loadSprite('grass-high', './sprites/grass-high.png');
  }
}
