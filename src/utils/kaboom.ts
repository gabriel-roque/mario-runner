import kaboom from 'kaboom';

export class Kaboom {
  createCtx() {
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
}
