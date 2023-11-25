import {Vector3f, Vector4f} from '#graphics';

export type Style = {
  stroke?: Vector3f | Vector4f;
  strokeWidth?: number;
  fill?: Vector3f | Vector4f;
};