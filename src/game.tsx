import { KaboomCtx } from 'kaboom';
import { useEffect } from 'react';
import { Kaboom } from 'utils/kaboom';
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

  function spawnGrass(k: KaboomCtx) {
    function high() {
      k.add([
        k.sprite(Sprites.GrassHigh),
        k.layer(Layers.Parallax),
        k.scale(1.5),
        k.area(),
        k.pos(k.width(), k.height() - BASE_LINE),
        k.origin('botleft'),
        k.move(k.LEFT, 100),
        k.color(211, 169, 16),
        'grass',
      ]);
      k.wait(k.rand(7, 10), () => high());
    }

    function low() {
      k.add([
        k.sprite(Sprites.GrassLow),
        k.layer(Layers.Parallax),
        k.scale(1.5),
        k.area(),
        k.pos(k.width(), k.height() - BASE_LINE),
        k.origin('botleft'),
        k.move(k.LEFT, 150),
        'grass',
      ]);
      k.wait(k.rand(9, 12), () => low());
    }

    high();
    low();
  }

  function spawnPipe(k: KaboomCtx) {
    k.add([
      k.sprite(Sprites.Pipe),
      k.layer(Layers.Pipe),
      k.scale(2),
      k.area(),
      k.pos(k.width(), k.height() - BASE_LINE),
      k.origin('botleft'),
      k.move(k.LEFT, 240),
      'pipe',
    ]);
    k.wait(k.rand(1, 2), () => spawnPipe(k));
  }

  function spawnClouds(k: KaboomCtx) {
    function one() {
      k.add([
        k.sprite(Sprites.CloudOne),
        k.layer(Layers.Parallax),
        k.scale(0.3),
        k.area(),
        k.pos(k.width(), k.rand(k.height() / 2 - 60, k.height() / 2)),
        k.origin('botleft'),
        k.move(k.LEFT, 75),
        'grass',
      ]);
      k.wait(k.rand(7, 10), () => one());
    }

    function double() {
      k.add([
        k.sprite(Sprites.CloudDouble),
        k.layer(Layers.Parallax),
        k.scale(0.3),
        k.area(),
        k.pos(k.width(), k.rand(k.height() / 3 - 50, k.height() / 3 + 50)),
        k.origin('botleft'),
        k.move(k.LEFT, 50),
        'grass',
      ]);
      k.wait(k.rand(9, 12), () => double());
    }

    one();
    double();
  }

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
      mario.play('run');

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

      spawnPipe(k);
      spawnGrass(k);
      spawnClouds(k);

      setInterval(() => {
        k.get('pipe').forEach((pipe) => {
          if (pipe.pos.x <= -50) pipe.destroy();
        });
        k.get('grass').forEach((grass) => {
          if (grass.pos.x <= -300) grass.destroy();
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
