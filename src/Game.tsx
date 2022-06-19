import kaboom, { KaboomCtx } from 'kaboom';
import { useEffect } from 'react';

export const Game: React.FC = () => {
  function setupKaboom(): KaboomCtx {
    const canvasRef = document.querySelector('#game') as HTMLCanvasElement;

    const k = kaboom({
      global: false,
      canvas: canvasRef,
      crisp: false,
    });

    canvasRef.width = 1000;
    canvasRef.height = 500;

    k.debug.inspect = false;

    return k;
  }

  function loadSprites(k: KaboomCtx) {
    k.loadSprite('mario', './sprites/mario-sprite.png', {
      sliceX: 13.2,
      sliceY: 1,
      anims: {
        jump: { from: 7, to: 9 },
        run: { from: 1, to: 3, loop: true, speed: 10 },
      },
    });

    k.loadSprite('pipe', './sprites/pipe.png');
    k.loadSprite('floor', './sprites/floor-mario.png', {
      sliceX: 2,
      sliceY: 1,
      anims: {
        moviment: { from: 0, to: 1, loop: true, speed: 7 },
      },
    });
  }

  useEffect(() => {
    const k = setupKaboom();
    loadSprites(k);

    let score = 0;

    k.scene('game', () => {
      const BASE_LINE = 55;
      const WIDTH_FLOOR = 204;

      // COMPONENTS;
      const mario = k.add([
        k.sprite('mario'),
        k.pos(30, 352),
        k.scale(3),
        k.area(),
        k.body(),
      ]);
      mario.play('run');

      for (
        let index = 0;
        index < Math.round(k.width() / WIDTH_FLOOR);
        index++
      ) {
        const x = index > 0 ? WIDTH_FLOOR * index : 0;
        const floor = k.add([
          k.sprite('floor'),
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
        k.wait(k.rand(1, 2), () => spawnPipe());
      }
      spawnPipe();

      setInterval(() => {
        k.get('pipe').forEach((pipe) => {
          if (pipe.pos.x <= -50) pipe.destroy();
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
        k.go('lose');
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
