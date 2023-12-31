// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class Vec2 implements flatbuffers.IUnpackableObject<Vec2T> {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Vec2 {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

x():number {
  return this.bb!.readFloat32(this.bb_pos);
}

y():number {
  return this.bb!.readFloat32(this.bb_pos + 4);
}

static sizeOf():number {
  return 8;
}

static createVec2(builder:flatbuffers.Builder, x: number, y: number):flatbuffers.Offset {
  builder.prep(4, 8);
  builder.writeFloat32(y);
  builder.writeFloat32(x);
  return builder.offset();
}


unpack(): Vec2T {
  return new Vec2T(
    this.x(),
    this.y()
  );
}


unpackTo(_o: Vec2T): void {
  _o.x = this.x();
  _o.y = this.y();
}
}

export class Vec2T implements flatbuffers.IGeneratedObject {
constructor(
  public x: number = 0.0,
  public y: number = 0.0
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  return Vec2.createVec2(builder,
    this.x,
    this.y
  );
}
}
