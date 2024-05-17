import theme from './theme.json';
import { LightTheme } from './types';

const lightTheme: LightTheme = {
  containers: theme.containers,
  widths: theme.widths,
  radius: theme.radius,
  spacing: theme.spacing,
  colors: theme['color-modes']['light-mode'].colors,
  componentColors: theme['color-modes']['light-mode']['component-colors'],
};

export default lightTheme;
