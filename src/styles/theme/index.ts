import color from './color';
import typo from './typo';

const theme = {
  typo,
  color,
};

export default theme;

export type ThemeType = typeof theme;
