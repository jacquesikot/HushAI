import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import lightTheme from '../src/theme/lightTheme';
import darkTheme from '../src/theme/darkTheme';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
  }
`;

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'dark',
    Provider: ThemeProvider,
    GlobalStyles, // Adds your GlobalStyle component to all stories
  }),
];
