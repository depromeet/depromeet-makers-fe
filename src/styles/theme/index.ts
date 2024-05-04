import color from './color';
import typo from './typo';

const zIndex = {
  fab: 999,
};

const theme = {
  typo,
  color,
  zIndex,
};

export default theme;

export type ThemeType = typeof theme;
