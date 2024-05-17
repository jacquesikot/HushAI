import { DarkTheme } from '@/theme/types';

declare module 'styled-components' {
  export interface DefaultTheme extends DarkTheme {}
}
