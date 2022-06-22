import { KaboomCtx } from 'kaboom';

export class FloorGrass {
  public static Sprite = 'floor';
  private static WidthFloor = 204;

  private readonly k: KaboomCtx;
  private readonly baseLine: number;

  constructor(params: { k: KaboomCtx; baseLine: number }) {
    this.k = params.k;
    this.baseLine = params.baseLine;

    this.spawn();
  }

  private spawn() {
    for (
      let index = 0;
      index < Math.round(this.k.width() / FloorGrass.WidthFloor);
      index++
    ) {
      const x = index > 0 ? FloorGrass.WidthFloor * index : 0;
      const floor = this.k.add([
        this.k.sprite(FloorGrass.Sprite),
        this.k.scale(3),
        this.k.pos(x, this.k.height() - this.baseLine),
        this.k.area(),
        this.k.solid(),
        'floor',
        `floor-${index + 1}`,
      ]);
      floor.play('moviment');
    }
  }
}
