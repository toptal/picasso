import {
  CSSProperties,
  FunctionComponent,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
  ElementType,
  ComponentPropsWithRef
} from 'react'

import { Classes } from '../styles/types'

export interface BaseProps {
  /** Classnames applied to root element */
  className?: string
  /** Style applied to root element */
  style?: CSSProperties
}

export interface JssProps {
  classes: Classes
}

export interface TextLabelProps {
  /** Defines if the text should be transformed to title case */
  titleCase?: boolean
}

export type StandardProps = BaseProps & JssProps

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

export type PicassoComponent<P, S = {}> = FunctionComponent<
  OmitInternalProps<P> & Partial<JssProps>
> &
  S

export type PicassoComponentWithRef<P, R, S = {}> = FunctionComponent<
  P & RefAttributes<R>
> &
  S

export type CompoundedComponentWithRef<
  P,
  R,
  S = {}
> = ForwardRefExoticComponent<P & RefAttributes<R>> & S

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

export type WeightType = 'thin' | 'light' | 'regular' | 'semibold'

/** T parameter is needed to extend BaseEnvironments with 'temploy' or 'test' */
export type EnvironmentType<T extends Environments = BaseEnvironments> =
  | T
  | BaseEnvironments

export type SizeType<T extends Sizes> = T

export type SpacingType =
  | number
  | SizeType<'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'>

export enum SpacingEnum {
  xsmall = 0.5,
  small = 1,
  medium = 1.5,
  large = 2,
  xlarge = 2.5
}

export const spacingToRem = (spacing: SpacingType) =>
  typeof spacing === 'number' ? `${spacing}rem` : `${SpacingEnum[spacing]}rem`

export type ButtonOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>

export type ColorType =
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'light-grey'
  | 'grey'
  | 'dark-grey'
  | 'black'
  | 'inherit'
