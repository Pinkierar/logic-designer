import {BEGIN_KIND, Color} from 'p5';

export type Style = {
  stroke?: Color,
  strokeWidth?: number,
  fill?: Color,
  kind?: BEGIN_KIND,
};

export type StyleFilled = Required<Style>;

export const fillStyle = (p: P5Type, style: Style): StyleFilled => ({
  stroke: style.stroke ?? p.color(0, 0),
  strokeWidth: style.strokeWidth ?? 1,
  fill: style.fill ?? p.color(0, 0),
  kind: style.kind ?? p.TRIANGLE_FAN,
})