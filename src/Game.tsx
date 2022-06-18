import kaboom from 'kaboom';
import { useEffect } from 'react';

export const Game: React.FC = () => {
  useEffect(() => {
    const canvasRef = document.querySelector('#game') as HTMLCanvasElement;

    const k = kaboom({
      global: false,
      canvas: canvasRef,
    });

    canvasRef.width = 1000;
    canvasRef.height = 1000;

    k.debug.inspect = true;

    k.loadSprite('mario', './sprites/mario-sprite.png', {
      sliceX: 13.2,
      sliceY: 1,
      anims: {
        jump: { from: 7, to: 9 },
        run: { from: 1, to: 3, loop: true, speed: 10 },
      },
    });

    k.loadSprite('pipe', './sprites/pipe.png');

    let score = 0;

    k.scene('game', () => {
      const BASE_LINE = 300;

      // COMPONENTS;
      const mario = k.add([
        k.sprite('mario'),
        k.pos(80, 630),
        k.scale(3),
        k.area(),
        k.body(),
      ]);

      mario.play('run');

      k.add([
        k.rect(k.width(), 48),
        k.pos(0, k.height() - BASE_LINE),
        k.outline(4),
        k.area(),
        k.solid(),
        k.color(127, 200, 255),
        'floor',
      ]);

      const scoreLabel = k.add([k.text(`Score: ${score}`), k.pos(24, 24)]);

      k.onUpdate(() => {
        score++;
        scoreLabel.text = `Score: ${score}`;
      });

      function spawnPipe() {
        k.add([
          k.sprite('pipe'),
          k.scale(2),
          k.area(),
          k.pos(k.width(), k.height() - BASE_LINE),
          k.origin('botleft'),
          k.move(k.LEFT, 240),
          'pipe',
        ]);
        k.wait(k.rand(1, 1.5), () => spawnPipe());
      }

      spawnPipe();

      // EVENTS
      k.onKeyPress('space', () => {
        if (mario.isGrounded()) {
          mario.jump(800);
          mario.play('jump');
        }
      });

      mario.onCollide('pipe', () => {
        k.go('lose');
      });

      mario.onCollide('floor', () => {
        mario.frame = 0;
        mario.play('run');
      });
    });

    k.scene('lose', () => {
      k.add([k.text('Game Over'), k.pos(k.center()), k.origin('center')]);
      k.add([
        k.text(`Score: ${score}`, { size: 45 }),
        k.area({ cursor: 'mouse' }),
        k.pos(k.center().x, k.center().y + 100),
        k.origin('center'),
      ]);

      const playAgain = k.add([
        k.text('Play Again!', { size: 45 }),
        k.pos(k.center().x, k.center().y + 200),
        k.area({ cursor: 'pointer' }),
        k.scale(1),
        k.origin('center'),
      ]);

      playAgain.onClick(() => k.go('game'));
    });

    k.go('game');
  }, []);

  return <></>;
};
