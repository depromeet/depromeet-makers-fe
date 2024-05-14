import color from './color';
import typo from './typo';

const zIndex = {
  dropdown: 10,
  fab: 999,
  header: 1000,
  bottomNav: 1000,
  backdrop: 1001,
  modal: 1002,
};

const theme = {
  typo,
  color,
  zIndex,
  maxWidth: '475px',
  size: {
    maxWidth: '475px',
  },
};

export default theme;

export type ThemeType = typeof theme;
