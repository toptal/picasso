import { ReactNode, ReactElement, MouseEvent, ElementType } from 'react'
import Group from '../ButtonGroup'
import {
  BaseProps,
  SizeType,
  ButtonOrAnchorProps,
  CompoundedComponentWithRef,
  OverridableComponent
} from '../Picasso'
export declare type VariantType =
  | 'primary-blue'
  | 'secondary-blue'
  | 'primary-red'
  | 'secondary-red'
  | 'primary-green'
  | 'secondary-green'
  | 'flat'
  | 'flat-white'
  | 'secondary-white'
  | 'transparent'
  | 'transparent-white'
  | 'transparent-blue'
declare type IconPositionType = 'left' | 'right'
export interface Props extends BaseProps, ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  focused?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** A button can show a loading indicator */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** A button can have different sizes */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** The variant to use */
  variant?: VariantType
  /** HTML Value of Button component */
  value?: string | number
  /** Circular style of Button component */
  circular?: boolean
  /** HTML title of Button component */
  title?: string
  /** HTML type of Button component */
  type?: 'button' | 'reset' | 'submit'
}
interface StaticProps {
  Group: typeof Group
}
export declare const Button: CompoundedComponentWithRef<
  Props,
  HTMLButtonElement,
  StaticProps
>
declare const _default: OverridableComponent<Props> & StaticProps
export default _default
