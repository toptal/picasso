import type {
  CSSProperties,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ComponentPropsWithRef,
} from 'react'

import type { Classes } from './styles'

export { spacings, SpacingEnum, spacingToRem } from '@toptal/picasso-provider'

export type {
  Sizes,
  SizeType,
  SpacingType,
  PicassoSpacing,
} from '@toptal/picasso-provider'

export interface BaseProps {
  /** Classnames applied to root element */
  className?: string
  /** Style applied to root element */
  style?: CSSProperties
  'data-testid'?: string
  'data-private'?: boolean | 'lipsum'
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

type BaseEnvironments = 'development' | 'staging' | 'production'
type Environments = BaseEnvironments | 'temploy' | 'test'

/** T parameter is needed to extend BaseEnvironments with 'temploy' or 'test' */
export type EnvironmentType<T extends Environments = BaseEnvironments> =
  | T
  | BaseEnvironments

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
  /* Callback fired when the component has exited */
  onExited?: (node: HTMLElement | null) => void
  /* The duration for the transition, in milliseconds */
  timeout?: number | { enter?: number; exit?: number; appear?: number }
}
