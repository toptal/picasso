import type { Size, Variant } from './AvatarWrapper'

export const classBySizeAndVariant: Record<Size, Record<Variant, string>> = {
  xxsmall: {
    square: 'w-[2em] h-[2em]',
    portrait: 'w-[1.333333333em] h-[2em]',
    landscape: 'w-[2em] h-[1.333333333em]',
  },
  xsmall: {
    square: 'w-[2.5em] h-[2.5em]',
    portrait: 'w-[1.666666666em] h-[2.5em]',
    landscape: 'w-[2.5em] h-[1.666666666em]',
  },
  small: {
    square: 'w-[5em] h-[5em]',
    portrait: 'w-[3.333333333em] h-[5em]',
    landscape: 'w-[5em] h-[3.333333333em]',
  },
  medium: {
    square: 'w-[7.5em] h-[7.5em]',
    portrait: 'w-[5em] h-[7.5em]',
    landscape: 'w-[7.5em] h-[5em]',
  },
  large: {
    square: 'w-[10em] h-[10em]',
    portrait: 'w-[7.5em] h-[10em]',
    landscape: 'w-[10em] h-[7.5em]',
  },
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
