interface AppTheme {
  _primitives: Primitives;
  'color-modes': Colormodes;
  containers: Containers;
  widths: Widths;
  spacing: Spacing2;
  radius: Radius;
}

export interface LightTheme {
  colors: Colors2;
  spacing: Spacing2;
  radius: Radius;
  widths: Widths;
  containers: Containers;
  componentColors: Componentcolors;
}

export interface DarkTheme {
  colors: Colors2;
  spacing: Spacing2;
  radius: Radius;
  widths: Widths;
  containers: Containers;
  componentColors: Componentcolors;
}

interface Radius {
  'radius-xxs': White;
  'radius-xs': White;
  'radius-sm': White;
  'radius-md': White;
  'radius-lg': White;
  'radius-xl': White;
  'radius-2xl': White;
  'radius-3xl': White;
  'radius-4xl': White;
  'radius-full': White;
}
interface Spacing2 {
  'spacing-none': White;
  'spacing-xxs': White;
  'spacing-xs': White;
  'spacing-sm': White;
  'spacing-md': White;
  'spacing-lg': White;
  'spacing-xl': White;
  'spacing-2xl': White;
  'spacing-3xl': White;
  'spacing-4xl': White;
  'spacing-5xl': White;
  'spacing-6xl': White;
  'spacing-7xl': White;
  'spacing-8xl': White;
  'spacing-9xl': White;
  'spacing-10xl': White;
  'spacing-11xl': White;
}
interface Widths {
  'width-xxs': White;
  'width-xs': White;
  'width-sm': White;
  'width-md': White;
  'width-lg': White;
  'width-xl': White;
  'width-2xl': White;
  'width-3xl': White;
  'width-4xl': White;
  'width-5xl': White;
  'width-6xl': White;
  'paragraph-max-width': White;
}
interface Containers {
  'container-padding-mobile': White;
  'container-padding-desktop': White;
  'container-max-width-desktop': White;
}
interface Colormodes {
  'light-mode': Lightmode;
  'dark-mode': Lightmode;
}
interface Lightmode {
  colors: Colors2;
  'component-colors': Componentcolors;
}
interface Componentcolors {
  alpha: Alpha;
  utility: Utility;
  components: Components;
}
interface Components {
  'app-store-badges': Appstorebadges;
  'application-navigation': Applicationnavigation;
  avatars: Avatars;
  breadcrumbs: Breadcrumbs;
  buttons: Buttons;
  footers: Footers;
  'header-sections': Headersections;
  icons: Icons2;
  mockups: Mockups;
  sliders: Sliders;
  thumbnail: Thumbnail;
  toggles: Toggles;
  tooltips: Tooltips;
  'wysiwyg-editor': Wysiwygeditor;
}
interface Wysiwygeditor {
  'wysiwyg-editor-icon-fg': White;
  'wysiwyg-editor-icon-fg_active': White;
}
interface Tooltips {
  'tooltip-supporting-text': White;
}
interface Toggles {
  'toggle-button-fg_disabled': White;
}
interface Thumbnail {
  'thumbnail-badge-brand-fg': White;
  'thumbnail-badge-success-fg': White;
}
interface Sliders {
  'slider-handle-bg': White;
  'slider-handle-border': White;
}
interface Mockups {
  'screen-mockup-border': White;
}
interface Icons2 {
  icons: Icons;
  'featured-icons': Featuredicons;
  'social-icons': Socialicons;
}
interface Socialicons {
  'social-icon-fg-x': White;
  'social-icon-fg-instagram': White;
  'social-icon-fg-apple': White;
  'social-icon-fg-github': White;
  'social-icon-fg-angellist': White;
  'social-icon-fg-tumblr': White;
}
interface Featuredicons {
  light: Light;
  dark: Dark;
  modern: Modern;
}
interface Modern {
  'featured-icon-modern-border': White;
}
interface Dark {
  'featured-icon-dark-fg-brand': White;
  'featured-icon-dark-fg-gray': White;
  'featured-icon-dark-fg-error': White;
  'featured-icon-dark-fg-warning': White;
  'featured-icon-dark-fg-success': White;
}
interface Light {
  'featured-icon-light-fg-brand': White;
  'featured-icon-light-fg-gray': White;
  'featured-icon-light-fg-error': White;
  'featured-icon-light-fg-warning': White;
  'featured-icon-light-fg-success': White;
}
interface Icons {
  'icon-fg-brand': White;
  'icon-fg-brand_on-brand': White;
}
interface Headersections {
  'header-abstract-50-bg': White;
  'header-abstract-100-bg': White;
  'header-abstract-200-bg': White;
  'header-abstract-300-bg': White;
}
interface Footers {
  'footer-button-fg': White;
  'footer-button-fg_hover': White;
  'footer-badge-fg': White;
  'footer-badge-bg': White;
  'footer-badge-border': White;
}
interface Buttons {
  primary: Primary;
  secondary: Secondary;
  'secondary-color': Secondarycolor;
  tertiary: Tertiary;
  'tertiary-color': Tertiarycolor;
  'primary-error': Primaryerror;
  'secondary-error': Secondaryerror;
  'tertiary-error': Tertiaryerror;
}
interface Tertiaryerror {
  'button-tertiary-error-fg': White;
  'button-tertiary-error-fg_hover': White;
  'button-tertiary-error-bg_hover': White;
}
interface Secondaryerror {
  'button-secondary-error-fg': White;
  'button-secondary-error-fg_hover': White;
  'button-secondary-error-bg': White;
  'button-secondary-error-bg_hover': White;
  'button-secondary-error-border': White;
  'button-secondary-error-border_hover': White;
}
interface Primaryerror {
  'button-primary-error-fg': White;
  'button-primary-error-fg_hover': White;
  'button-primary-error-bg': White;
  'button-primary-error-bg_hover': White;
  'button-primary-error-border': White;
  'button-primary-error-border_hover': White;
}
interface Tertiarycolor {
  'button-tertiary-color-fg': White;
  'button-tertiary-color-fg_hover': White;
  'button-tertiary-color-bg_hover': White;
}
interface Tertiary {
  'button-tertiary-fg': White;
  'button-tertiary-fg_hover': White;
  'button-tertiary-bg_hover': White;
}
interface Secondarycolor {
  'button-secondary-color-fg': White;
  'button-secondary-color-fg_hover': White;
  'button-secondary-color-bg': White;
  'button-secondary-color-bg_hover': White;
  'button-secondary-color-border': White;
  'button-secondary-color-border_hover': White;
}
interface Secondary {
  'button-secondary-fg': White;
  'button-secondary-fg_hover': White;
  'button-secondary-bg': White;
  'button-secondary-bg_hover': White;
  'button-secondary-border': White;
  'button-secondary-border_hover': White;
}
interface Primary {
  'button-primary-fg': White;
  'button-primary-fg_hover': White;
  'button-primary-bg': White;
  'button-primary-bg_hover': White;
  'button-primary-border': White;
  'button-primary-border_hover': White;
}
interface Breadcrumbs {
  'breadcrumb-fg': White;
  'breadcrumb-fg_hover': White;
  'breadcrumb-bg_hover': White;
  'breadcrumb-brand-fg_hover': White;
  'breadcrumb-brand-bg_hover': White;
  'breadcrumb-icon-fg': White;
  'breadcrumb-icon-fg_hover': White;
  'breadcrumb-brand-icon-fg_hover': White;
}
interface Avatars {
  'avatar-bg': White;
  'avatar-profile-photo-border': White;
  'avatar-contrast-border': White;
  'avatar-focus-border': White;
}
interface Applicationnavigation {
  'nav-item-button-icon-fg': White;
  'nav-item-button-icon-fg_active': White;
  'nav-item-icon-fg': White;
  'nav-item-icon-fg_active': White;
}
interface Appstorebadges {
  'app-store-badge-border': White;
}
interface Utility {
  gray: Gray;
  brand: Brand;
  error: Error;
  warning: Warning;
  success: Success;
  'gray-blue': Grayblue;
  'blue-light': Bluelight;
  blue: Blue;
  'blue-dark': Bluedark;
  indigo: Indigo;
  purple: Purple;
  fuchsia: Fuchsia;
  pink: Pink;
  'orange-dark': Orangedark;
  orange: Orange;
}
interface Orange {
  'utility-orange-50': White;
  'utility-orange-100': White;
  'utility-orange-200': White;
  'utility-orange-300': White;
  'utility-orange-400': White;
  'utility-orange-500': White;
  'utility-orange-600': White;
  'utility-orange-700': White;
}
interface Orangedark {
  'utility-orange-dark-50': White;
  'utility-orange-dark-100': White;
  'utility-orange-dark-200': White;
  'utility-orange-dark-300': White;
  'utility-orange-dark-400': White;
  'utility-orange-dark-500': White;
  'utility-orange-dark-600': White;
  'utility-orange-dark-700': White;
}
interface Pink {
  'utility-pink-50': White;
  'utility-pink-100': White;
  'utility-pink-200': White;
  'utility-pink-300': White;
  'utility-pink-400': White;
  'utility-pink-500': White;
  'utility-pink-600': White;
  'utility-pink-700': White;
}
interface Fuchsia {
  'utility-fuchsia-50': White;
  'utility-fuchsia-100': White;
  'utility-fuchsia-200': White;
  'utility-fuchsia-300': White;
  'utility-fuchsia-400': White;
  'utility-fuchsia-500': White;
  'utility-fuchsia-600': White;
  'utility-fuchsia-700': White;
}
interface Purple {
  'utility-purple-50': White;
  'utility-purple-100': White;
  'utility-purple-200': White;
  'utility-purple-300': White;
  'utility-purple-400': White;
  'utility-purple-500': White;
  'utility-purple-600': White;
  'utility-purple-700': White;
}
interface Indigo {
  'utility-indigo-50': White;
  'utility-indigo-100': White;
  'utility-indigo-200': White;
  'utility-indigo-300': White;
  'utility-indigo-400': White;
  'utility-indigo-500': White;
  'utility-indigo-600': White;
  'utility-indigo-700': White;
}
interface Bluedark {
  'utility-blue-dark-50': White;
  'utility-blue-dark-100': White;
  'utility-blue-dark-200': White;
  'utility-blue-dark-300': White;
  'utility-blue-dark-400': White;
  'utility-blue-dark-500': White;
  'utility-blue-dark-600': White;
  'utility-blue-dark-700': White;
}
interface Blue {
  'utility-blue-50': White;
  'utility-blue-100': White;
  'utility-blue-200': White;
  'utility-blue-300': White;
  'utility-blue-400': White;
  'utility-blue-500': White;
  'utility-blue-600': White;
  'utility-blue-700': White;
}
interface Bluelight {
  'utility-blue-light-50': White;
  'utility-blue-light-100': White;
  'utility-blue-light-200': White;
  'utility-blue-light-300': White;
  'utility-blue-light-400': White;
  'utility-blue-light-500': White;
  'utility-blue-light-600': White;
  'utility-blue-light-700': White;
}
interface Grayblue {
  'utility-gray-blue-50': White;
  'utility-gray-blue-100': White;
  'utility-gray-blue-200': White;
  'utility-gray-blue-300': White;
  'utility-gray-blue-400': White;
  'utility-gray-blue-500': White;
  'utility-gray-blue-600': White;
  'utility-gray-blue-700': White;
}
interface Success {
  'utility-success-50': White;
  'utility-success-100': White;
  'utility-success-200': White;
  'utility-success-300': White;
  'utility-success-400': White;
  'utility-success-500': White;
  'utility-success-600': White;
  'utility-success-700': White;
}
interface Warning {
  'utility-warning-50': White;
  'utility-warning-100': White;
  'utility-warning-200': White;
  'utility-warning-300': White;
  'utility-warning-400': White;
  'utility-warning-500': White;
  'utility-warning-600': White;
  'utility-warning-700': White;
}
interface Error {
  'utility-error-50': White;
  'utility-error-100': White;
  'utility-error-200': White;
  'utility-error-300': White;
  'utility-error-400': White;
  'utility-error-500': White;
  'utility-error-600': White;
  'utility-error-700': White;
}
interface Brand {
  'utility-brand-50': White;
  'utility-brand-50_alt': White;
  'utility-brand-100': White;
  'utility-brand-100_alt': White;
  'utility-brand-200': White;
  'utility-brand-200_alt': White;
  'utility-brand-300': White;
  'utility-brand-300_alt': White;
  'utility-brand-400': White;
  'utility-brand-400_alt': White;
  'utility-brand-500': White;
  'utility-brand-500_alt': White;
  'utility-brand-600': White;
  'utility-brand-600_alt': White;
  'utility-brand-700': White;
  'utility-brand-700_alt': White;
  'utility-brand-800': White;
  'utility-brand-800_alt': White;
  'utility-brand-900': White;
  'utility-brand-900_alt': White;
}
interface Gray {
  'utility-gray-50': White;
  'utility-gray-100': White;
  'utility-gray-200': White;
  'utility-gray-300': White;
  'utility-gray-400': White;
  'utility-gray-500': White;
  'utility-gray-600': White;
  'utility-gray-700': White;
  'utility-gray-800': White;
  'utility-gray-900': White;
}
interface Alpha {
  'alpha-white-10': White;
  'alpha-white-20': White;
  'alpha-white-30': White;
  'alpha-white-40': White;
  'alpha-white-50': White;
  'alpha-white-60': White;
  'alpha-white-70': White;
  'alpha-white-80': White;
  'alpha-white-90': White;
  'alpha-white-100': White;
  'alpha-black-10': White;
  'alpha-black-20': White;
  'alpha-black-30': White;
  'alpha-black-40': White;
  'alpha-black-50': White;
  'alpha-black-60': White;
  'alpha-black-70': White;
  'alpha-black-80': White;
  'alpha-black-90': White;
  'alpha-black-100': White;
}
export interface Colors2 {
  text: Text;
  border: Border;
  foreground: Foreground;
  background: Background;
}
interface Background {
  'bg-primary': White;
  'bg-primary_alt': White;
  'bg-primary_hover': White;
  'bg-primary-solid': White;
  'bg-secondary': White;
  'bg-secondary_alt': White;
  'bg-secondary_hover': White;
  'bg-secondary_subtle': White;
  'bg-secondary-solid': White;
  'bg-tertiary': White;
  'bg-quaternary': White;
  'bg-active': White;
  'bg-disabled': White;
  'bg-disabled_subtle': White;
  'bg-overlay': White;
  'bg-brand-primary': White;
  'bg-brand-primary_alt': White;
  'bg-brand-secondary': White;
  'bg-brand-solid': White;
  'bg-brand-solid_hover': White;
  'bg-brand-section': White;
  'bg-brand-section_subtle': White;
  'bg-error-primary': White;
  'bg-error-secondary': White;
  'bg-error-solid': White;
  'bg-warning-primary': White;
  'bg-warning-secondary': White;
  'bg-warning-solid': White;
  'bg-success-primary': White;
  'bg-success-secondary': White;
  'bg-success-solid': White;
}
interface Foreground {
  'fg-primary-(900)': White;
  'fg-secondary-(700)': White;
  'fg-secondary_hover': White;
  'fg-tertiary-(600)': White;
  'fg-tertiary_hover': White;
  'fg-quaternary-(500)': White;
  'fg-quaternary_hover': White;
  'fg-quinary-(400)': White;
  'fg-quinary_hover': White;
  'fg-senary-(300)': White;
  'fg-white': White;
  'fg-disabled': White;
  'fg-disabled_subtle': White;
  'fg-brand-primary-(600)': White;
  'fg-brand-primary_alt': White;
  'fg-brand-secondary-(500)': White;
  'fg-error-primary': White;
  'fg-error-secondary': White;
  'fg-warning-primary': White;
  'fg-warning-secondary': White;
  'fg-success-primary': White;
  'fg-success-secondary': White;
}
interface Border {
  'border-primary': White;
  'border-secondary': White;
  'border-tertiary': White;
  'border-disabled': White;
  'border-disabled_subtle': White;
  'border-brand': White;
  'border-brand-solid': White;
  'border-brand-solid_alt': White;
  'border-error': White;
  'border-error-solid': White;
}
interface Text {
  'text-primary-(900)': any;
  'text-primary_on-brand': any;
  'text-secondary-(700)': any;
  'text-secondary_hover': any;
  'text-secondary_on-brand': any;
  'text-tertiary-(600)': any;
  'text-tertiary_hover': any;
  'text-tertiary_on-brand': any;
  'text-quaternary-(500)': any;
  'text-quaternary_on-brand': any;
  'text-white': any;
  'text-disabled': any;
  'text-placeholder': any;
  'text-placeholder_subtle': any;
  'text-brand-primary-(900)': any;
  'text-brand-secondary-(700)': any;
  'text-brand-tertiary-(600)': any;
  'text-brand-tertiary_alt': any;
  'text-error-primary-(600)': any;
  'text-warning-primary-(600)': any;
  'text-success-primary-(600)': any;
}
interface Primitives {
  colors: Colors;
  spacing: Spacing;
}
interface Spacing {
  '0․5-(2px)': White;
  '1-(4px)': White;
  '1․5-(6px)': White;
  '2-(8px)': White;
  '3-(12px)': White;
  '4-(16px)': White;
  '5-(20px)': White;
  '6-(24px)': White;
  '8-(32px)': White;
  '10-(40px)': White;
  '12-(48px)': White;
  '16-(64px)': White;
  '20-(80px)': White;
  '24-(96px)': White;
  '32-(128px)': White;
  '40-(160px)': White;
  '48-(192px)': White;
  '56-(224px)': White;
  '64-(256px)': White;
  '80-(320px)': White;
  '96-(384px)': White;
  '120-(480px)': White;
  '140-(560px)': White;
  '160-(640px)': White;
  '180-(720px)': White;
  '192-(768px)': White;
  '256-(1,024px)': White;
  '320-(1,280px)': White;
  '360-(1,440px)': White;
  '400-(1,600px)': White;
  '480-(1,920px)': White;
}
interface Colors {
  base: Base;
  'gray-(light-mode)': Graylightmode;
  'gray-(dark-mode)': Graylightmode;
  'gray-(dark-mode-alpha)': Graylightmode;
  brand: Graylightmode;
  error: Graylightmode;
  warning: Graylightmode;
  success: Graylightmode;
  'gray-blue': Graylightmode;
  'gray-cool': Graylightmode;
  'gray-modern': Graylightmode;
  'gray-neutral': Graylightmode;
  'gray-iron': Graylightmode;
  'gray-true': Graylightmode;
  'gray-warm': Graylightmode;
  moss: Graylightmode;
  'green-light': Graylightmode;
  green: Graylightmode;
  teal: Graylightmode;
  cyan: Graylightmode;
  'blue-light': Graylightmode;
  blue: Graylightmode;
  'blue-dark': Graylightmode;
  indigo: Graylightmode;
  violet: Graylightmode;
  purple: Graylightmode;
  fuchsia: Graylightmode;
  pink: Graylightmode;
  rosé: Graylightmode;
  'orange-dark': Graylightmode;
  orange: Graylightmode;
  yellow: Graylightmode;
}
interface Graylightmode {
  '25': White;
  '50': White;
  '100': White;
  '200': White;
  '300': White;
  '400': White;
  '500': White;
  '600': White;
  '700': White;
  '800': White;
  '900': White;
  '950': White;
}
interface Base {
  white: White;
  black: White;
  transparent: White;
}
interface White {
  value: string;
}
