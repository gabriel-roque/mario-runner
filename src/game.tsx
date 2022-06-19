import { useEffect } from 'react';
import { Cloud } from 'utils/cloud';
import { Grass } from 'utils/grass';
import { Kaboom } from 'utils/kaboom';
import { Mario } from 'utils/mario';
import { Pipe } from 'utils/pipe';
import { Sprite, Sprites } from 'utils/sprites';

export enum Layers {
  Background = 'background',
  Pipe = 'pipe',
  Parallax = 'parallax',
  Game = 'game',
}

export const Game: React.FC = () => {
  const BASE_LINE = 55;
  const WIDTH_FLOOR = 204;

  useEffect(() => {
    let score = 0;

    const k = new Kaboom().createCtx();
    new Sprite(k).loadSprites();

    k.scene('game', () => {
      k.layers(
        [Layers.Background, Layers.Parallax, Layers.Pipe, Layers.Game],
        Layers.Game
      );

      // COMPONENTS;
      const mario = k.add([
        k.sprite(Sprites.Mario),
        k.layer(Layers.Game),
        k.pos(30, 352),
        k.scale(3),
        k.area(),
        k.body(),
      ]);
      mario.play(Mario.Anims.Run);

      k.add([
        k.sprite(Sprites.Background),
        k.layer(Layers.Background),
        k.scale(2),
        k.pos(k.center().x, 250),
        k.origin('center'),
      ]);

      for (
        let index = 0;
        index < Math.round(k.width() / WIDTH_FLOOR);
        index++
      ) {
        const x = index > 0 ? WIDTH_FLOOR * index : 0;
        const floor = k.add([
          k.sprite(Sprites.Floor),
          k.scale(3),
          k.pos(x, k.height() - BASE_LINE),
          k.area(),
          k.solid(),
          'floor',
          `floor-${index + 1}`,
        ]);
        floor.play('moviment');
      }

      const scoreLabel = k.add([
        k.text(`Score: ${score}`, { size: 40 }),
        k.pos(24, 24),
      ]);

      k.onUpdate(() => {
        score++;
        scoreLabel.text = `Score: ${score}`;
      });

      new Pipe(k, BASE_LINE).spawnPipe();
      new Grass(k, BASE_LINE).spawnGrass();
      new Cloud(k).spawnClouds();

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

      // EVENTS
      k.onKeyPress('space', () => {
        if (mario.isGrounded()) {
          mario.jump(800);
          mario.play('jump');
        }
      });

      mario.onCollide('pipe', () => {
        // k.go('lose');
      });

      mario.onCollide('floor', () => {
        mario.frame = 0;
        mario.play('run');
      });
    });

    k.scene('lose', () => {
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
        k.go('game');
      });
    });

    k.go('game');
  }, []);

  return <></>;
};
