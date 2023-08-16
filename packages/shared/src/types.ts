import type {
  CSSProperties,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ComponentPropsWithRef,
} from 'react'

import type { Classes } from './styles'

export interface BaseProps {
  /** Classnames applied to root element */
  className?: string
  /** Style applied to root element */
  style?: CSSProperties
  'data-testid'?: string
}

export interface JssProps {
  classes: Classes
}

export interface TextLabelProps {
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

export type StandardProps = BaseProps & Partial<JssProps>

// Take all props, excluding props from JssProps
// type and other passed props
//
// example:
// OmitInternalProps<Props>
// OmitInternalProps<Props, 'name' | 'variant'>
export type OmitInternalProps<T, K = ''> = Pick<
  T,
  Exclude<keyof T, keyof JssProps | K>
>

type PropsWithOverridableAs<T extends ElementType, P> = Omit<P, 'as'> & {
  as?: T
} & ComponentPropsWithRef<T>

interface NamedComponent<P> {
  defaultProps?: Partial<P>
  displayName?: string
}
export interface OverridableComponent<P = {}> extends NamedComponent<P> {
  <T extends ElementType = ElementType<Omit<P, 'as'>>>(
    props: PropsWithOverridableAs<T, P>
  ): JSX.Element | null
}

type Sizes = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

type BaseEnvironments = 'development' | 'staging' | 'production'
type Environments = BaseEnvironments | 'temploy' | 'test'

/** T parameter is needed to extend BaseEnvironments with 'temploy' or 'test' */
export type EnvironmentType<T extends Environments = BaseEnvironments> =
  | T
  | BaseEnvironments

export type SizeType<T extends Sizes> = T

// class PicassoSpacing {
//   remValue: number

//   constructor(rem: number) {
//     this.remValue = rem
//   }

//   valueOf() {
//     return this.remValue
//   }

//   toString() {
//     return `${this.valueOf()}rem`
//   }
// }


type PicassoSpacing = 1.5 | 2.5

export const picassoSpacings: Record<number, PicassoSpacing> = {
  // 6: new PicassoSpacing(1.5),
  // 10: new PicassoSpacing(2.5),
  6: 1.5,
  10: 2.5
}

export type SpacingType = PicassoSpacing

export enum SpacingEnum {
  xsmall = 0.5,
  small = 1,
  medium = 1.5,
  large = 2,
  xlarge = 2.5,
}

export const spacingToRem = (spacing: SpacingType) =>
  typeof spacing === 'number' ? `${spacing}rem` : typeof spacing === 'object' ? `${spacing}rem` : `${SpacingEnum[spacing]}rem`

export type ButtonOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>

export type ColorType =
  | 'green'
  | 'red'
  | 'yellow'
  | 'light-grey'
  | 'grey'
  | 'grey-main-2'
  | 'dark-grey'
  | 'black'
  | 'light-blue'
  | 'inherit'

export interface TransitionProps {
  onExited?: (node: HTMLElement) => void
  timeout?: number | { enter?: number; exit?: number; appear?: number }
}
