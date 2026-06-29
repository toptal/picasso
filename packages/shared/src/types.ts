import type {
  CSSProperties,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
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

export interface NamedComponent<P> {
  defaultProps?: Partial<P>
  displayName?: string
}

// TODO: [FF-125] inherit the `as` target's props for full polymorphic
// typing — https://toptal-core.atlassian.net/browse/FF-125
//
// Strict on declared props, permissive on extras. Declared `P` fields are
// type-checked at call sites (e.g. `<Button size='wrong'>` still errors).
// Any other prop is accepted untyped. That is what keeps the polymorphic
// `as` usage working without a generic call signature, and what lets
// `forwardRef<HTMLElement, Props>(...)` assign directly.
//
// Trade-off versus the previous shape: TypeScript no longer infers prop
// types from the `as` target. `<Button as={Link} to={42} />` and
// `<Button as='a' href={42} />` won't validate `to`/`href` against the
// target's props; the extras come through as `any`.
//
// The proper fix is a type that inherits the `as` target's props (HTML
// element or component) so the examples above type-check against the real
// target, without regressing the internal `forwardRef` sites whose Props
// have required fields (Page.Article, Breadcrumbs.Item, OverviewBlock).
// Those sites broke the previous generic call-signature shape under the
// TS 5.5 variance change.
export interface OverridableComponent<P = {}> extends NamedComponent<P> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: P & { [key: string]: any }): JSX.Element | null
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
  onExited?: (node: HTMLElement) => void
  /* The duration for the transition, in milliseconds */
  timeout?: number | { enter?: number; exit?: number; appear?: number }
}
