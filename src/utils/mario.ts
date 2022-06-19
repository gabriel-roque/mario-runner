import { Sprites } from './sprites';

export namespace Mario {
  export type Sprite = Sprites.Mario;
  export enum Anims {
    Jump = 'jump',
    Run = 'run',
  }
}
