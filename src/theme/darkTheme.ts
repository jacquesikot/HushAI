import theme from './theme.json';
import { DarkTheme } from './types';

const darkTheme: DarkTheme = {
  containers: theme.containers,
  widths: theme.widths,
  radius: theme.radius,
  spacing: theme.spacing,
  colors: theme['color-modes']['dark-mode'].colors,
  componentColors: theme['color-modes']['dark-mode']['component-colors'],
};

export default darkTheme;
