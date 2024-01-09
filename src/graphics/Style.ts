import {Vector3f, Vector4f} from '#graphics';

export type Style = {
  stroke?: Vector3f | Vector4f | null;
  strokeWeight?: number | null;
  fill?: Vector3f | Vector4f | null;
};