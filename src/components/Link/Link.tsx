import React, {
  MouseEvent,
  forwardRef,
  ReactNode,
  ElementType,
  ComponentType,
  AnchorHTMLAttributes,
  ReactElement,
  ComponentPropsWithRef
} from 'react'
import MUILink from '@material-ui/core/Link'
import { withStyles, StyledComponentProps } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

type UnderlineType = 'none' | 'hover' | 'always'
type VariantType = 'action' | 'default'

type Props<T extends ElementType> = AnchorHTMLAttributes<HTMLAnchorElement> & ComponentPropsWithRef<T> & {
  /** Content of the component */
  children?: ReactNode
  /** Destination the link points to */
  href?: string
  /** Controls when the link should have an underline */
  underline?: UnderlineType
  /** Callback invoked when component is clicked */
  onClick?: (event: React.MouseEvent<T>) => void
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  as?: T

  /** Either it's a regular link or an _action_ */
  variant?: VariantType
  /** Indicates the order of receiving focus. If not set will not receive focus. */
  tabIndex?: number
  /** Uses white text color for dark background */
  invert?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  {
    href,
    underline,
    onClick,
    children,
    classes,
    className,
    style,
    as,
    variant,
    tabIndex,
    invert,
    ...rest
  },
  ref
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...nativeHTMLAttributes } = rest

  return (
    <MUILink
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...nativeHTMLAttributes}
      ref={ref}
      href={href}
      underline={underline}
      onClick={onClick}
      className={cx(classes.root, className, {
        [classes.action]: variant === 'action',
        [classes.invert]: invert
      })}
      style={style}
      component={as!}
      tabIndex={tabIndex}
    >
      {children}
    </MUILink>
  )
})

Link.defaultProps = {
  as: 'a',
  variant: 'default'
}

// Link.displayName = 'Link'

function StyledLink<T extends ElementType>(props: Props<T> & StyledComponentProps) {
  const Component = withStyles(styles)(Link)

  return <Component {...props} />
}

StyledLink.displayName = 'Link'

export default StyledLink

// const StyledLink = withStyles(styles)(Link) as <T extends ElementType>(props: Props<T> & StyledComponentProps) => ReactElement
// export default StyledLink
