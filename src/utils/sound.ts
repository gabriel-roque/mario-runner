import { KaboomCtx } from 'kaboom';

export enum Sounds {
  Jump = 'jump',
  MusicTheme = 'music-theme',
}

export class Sound {
  private readonly k: KaboomCtx;

  constructor(k: KaboomCtx) {
    this.k = k;
  }

  loadSounds(): void {
    this.k.loadSound(Sounds.Jump, './sounds/jump.ogg');
    this.k.loadSound(Sounds.MusicTheme, './sounds/theme-music.ogg');
  }
}
