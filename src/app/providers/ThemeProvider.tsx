'use client';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import darkTheme from '@/theme/darkTheme';
import lightTheme from '@/theme/lightTheme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = true;

  return <SCThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</SCThemeProvider>;
}
