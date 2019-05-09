import { map } from 'ramda';
import tinycolor from 'tinycolor2';

const rgbArray = ({ r, g, b }) => [r, g, b];

export const colors = {
  duotones: {
    softGreen: ['hsl(140,50%,40%)', 'hsl(160,60%,60%)'],
    softPeachy: ['hsl(332,50%,40%)', 'hsl(352,100%,75%)'],
    softYellow: ['hsl(41, 100%, 48%)', 'hsl(53, 100%, 64%)'],
    softPurple: ['hsl(255, 46%, 60%)', 'hsl(256, 47%, 72%)'],
    flashyTurquoise: ['hsl(140,50%,50%)', 'hsl(170,70%,70%)'],
  },
};

export const duotones = map(arr => {
  const [colorOne, colorTwo] = arr.map(hslVal =>
    rgbArray(tinycolor(hslVal).toRgb()),
  );
  return { filter: 'duotone', colorOne, colorTwo };
}, colors.duotones);

const duotone2matrix = (color1, color2) => [
  color2[0] / 256 - color1[0] / 256,
  0,
  0,
  0,
  color1[0] / 256,
  color2[1] / 256 - color1[1] / 256,
  0,
  0,
  0,
  color1[1] / 256,
  color2[2] / 256 - color1[2] / 256,
  0,
  0,
  0,
  color1[2] / 256,
  0,
  0,
  0,
  1,
  0,
];

const identityMatrix = [
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
];
export const duotoneIntensity = (duotone, intensity) => {
  const { colorOne, colorTwo } = duotone;
  const matrix = duotone2matrix(colorOne, colorTwo);
  return matrix.map(
    (val, idx) => val * intensity + identityMatrix[idx] * (1 - intensity),
  );
};
