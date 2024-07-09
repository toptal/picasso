import type { Size } from './AvatarWrapper'

export const classBySize: Record<Size, string> = {
  xxsmall: 'w-[2em] h-[2em]',
  xsmall: 'w-[2.5em] h-[2.5em]',
  small: 'w-[5em] h-[5em]',
  medium: 'w-[7.5em] h-[7.5em]',
  large: 'w-[10em] h-[10em]',
}

export const clipClassBySize: Record<Size, string> = {
  xxsmall:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_0.5em_100%,_0_calc(100%-0.5em))]',
  xsmall:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_0.5em_100%,_0_calc(100%-0.5em))]',
  small:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_1em_100%,_0_calc(100%-1em))]',
  medium:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_1.5em_100%,_0_calc(100%-1.5em))]',
  large:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_1.5em_100%,_0_calc(100%-1.5em))]',
}

export const AvatarLogoClassesBySize: Record<string, Record<Size, string>> = {
  root: {
    xxsmall: '',
    xsmall: '',
    small: 'pl-[1px] pb-[1px]',
    medium: 'pl-[2px] pb-[2px]',
    large: 'pl-[3px] pb-[3px]',
  },
  logo: {
    xxsmall: '',
    xsmall: '',
    small: 'w-[5.7px] h-[8px]',
    medium: 'w-[8.54px] h-[12px]',
    large: 'w-[7.12px] h-[10px]',
  },
}
