import { KaboomCtx } from 'kaboom';
import { Cloud } from './cloud';
import { Grass } from './grass';
import { Mario } from './mario';
import { Pipe } from './pipe';

export enum Sprites {
  Floor = 'floor',
  Background = 'background',
}

export class Sprite {
  private readonly k: KaboomCtx;

  constructor(k: KaboomCtx) {
    this.k = k;
  }

  loadSprites(): void {
    this.k.loadSprite(Mario.Sprite, './sprites/mario-sprite.png', {
      sliceX: 13.2,
      sliceY: 1,
      anims: {
        [Mario.Anims.Jump]: { from: 7, to: 9 },
        [Mario.Anims.Run]: { from: 1, to: 3, loop: true, speed: 10 },
      },
    });

    this.k.loadSprite(Pipe.Sprite, './sprites/pipe.png');
    this.k.loadSprite(Sprites.Floor, './sprites/floor-mario.png', {
      sliceX: 2,
      sliceY: 1,
      anims: {
        moviment: { from: 0, to: 1, loop: true, speed: 7 },
      },
    });

    this.k.loadSprite(Sprites.Background, './sprites/bg-mario.png');
    this.k.loadSprite(Grass.Sprite.Low, './sprites/grass-low.png');
    this.k.loadSprite(Grass.Sprite.High, './sprites/grass-high.png');
    this.k.loadSprite(Cloud.Sprite.One, './sprites/cloud-one.png');
    this.k.loadSprite(Cloud.Sprite.Double, './sprites/cloud-double.png');
  }
}
