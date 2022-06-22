import { useEffect } from 'react';
import { BackgroundGrass } from 'utils/background-grass';
import { Cloud } from 'utils/cloud';
import { FloorGrass } from 'utils/floor-grass';
import { Grass } from 'utils/grass';
import { Kaboom } from 'utils/kaboom';
import { Mario } from 'utils/mario';
import { Pipe } from 'utils/pipe';
import { Sound, Sounds } from 'utils/sound';
import { Sprite } from 'utils/sprites';

export enum Layers {
  Background = 'background',
  Pipe = 'pipe',
  Parallax = 'parallax',
  Game = 'game',
}

export enum Scenes {
  Game = 'game',
  Lose = 'lose',
}

export const Game: React.FC = () => {
  const BASE_LINE = 55;

  useEffect(() => {
    let score = 0;

    const k = new Kaboom().createCtx();
    new Sprite(k).loadSprites();
    new Sound(k).loadSounds();

    const music = k.play(Sounds.MusicTheme, { volume: 0.3, loop: true });

    k.scene(Scenes.Game, () => {
      k.layers(
        [Layers.Background, Layers.Parallax, Layers.Pipe, Layers.Game],
        Layers.Game
      );

      setTimeout(() => {
        music.pause();
      }, 500);

      k.onKeyPress('m', () => {
        if (music.isPaused()) {
          music.play();
        } else {
          music.pause();
        }
      });

      new FloorGrass({ k, baseLine: BASE_LINE });
      new Grass({ k, baseLine: BASE_LINE });
      new Pipe({ k, baseLine: BASE_LINE });
      new BackgroundGrass({ k });
      new Cloud({ k });
      new Mario({ k });

      const scoreLabel = k.add([
        k.text(`Score: ${score}`, { size: 40 }),
        k.pos(24, 24),
      ]);

      k.onUpdate(() => {
        score++;
        scoreLabel.text = `Score: ${score}`;
      });

      setInterval(() => {
        k.get('pipe').forEach((pipe) => {
          if (pipe.pos.x <= -50) pipe.destroy();
        });
        k.get('grass').forEach((grass) => {
          if (grass.pos.x <= -300) grass.destroy();
        });
        k.get('cloud').forEach((cloud) => {
          if (cloud.pos.x <= -300) cloud.destroy();
        });
      }, 1000);
    });

    k.scene('lose', () => {
      new BackgroundGrass({ k });
      k.add([
        k.text('Game Over'),
        k.pos(k.center().x, k.center().y - 50),
        k.origin('center'),
      ]);
      k.add([
        k.text(`Score: ${score}`, { size: 45 }),
        k.area({ cursor: 'mouse' }),
        k.pos(k.center()),
        k.origin('center'),
      ]);

      const playAgain = k.add([
        k.text('Play Again!', { size: 45 }),
        k.pos(k.center().x, k.center().y + 50),
        k.area({ cursor: 'pointer' }),
        k.scale(1),
        k.origin('center'),
      ]);

      playAgain.onClick(() => {
        score = 0;
        k.go(Scenes.Game);
      });
    });

    k.go(Scenes.Game);
  }, []);

  return <></>;
};
