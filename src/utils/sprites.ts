import { KaboomCtx } from 'kaboom';
import { Mario } from './mario';

export enum Sprites {
  Mario = 'mario',
  Pipe = 'pipe',
  Floor = 'floor',
  Background = 'background',
  GrassLow = 'grass-low',
  GrassHigh = 'grass-high',
  CloudOne = 'cloud-one',
  CloudDouble = 'cloud-double',
}

export class Sprite {
  private readonly k: KaboomCtx;

  constructor(k: KaboomCtx) {
    this.k = k;
  }

  loadSprites(): void {
    this.k.loadSprite(Sprites.Mario, './sprites/mario-sprite.png', {
      sliceX: 13.2,
      sliceY: 1,
      anims: {
        [Mario.Anims.Jump]: { from: 7, to: 9 },
        [Mario.Anims.Run]: { from: 1, to: 3, loop: true, speed: 10 },
      },
    });

    this.k.loadSprite(Sprites.Pipe, './sprites/pipe.png');
    this.k.loadSprite(Sprites.Floor, './sprites/floor-mario.png', {
      sliceX: 2,
      sliceY: 1,
      anims: {
        moviment: { from: 0, to: 1, loop: true, speed: 7 },
      },
    });

    this.k.loadSprite(Sprites.Background, './sprites/bg-mario.png');
    this.k.loadSprite(Sprites.GrassLow, './sprites/grass-low.png');
    this.k.loadSprite(Sprites.GrassHigh, './sprites/grass-high.png');
    this.k.loadSprite(Sprites.CloudOne, './sprites/cloud-one.png');
    this.k.loadSprite(Sprites.CloudDouble, './sprites/cloud-double.png');
  }
}
