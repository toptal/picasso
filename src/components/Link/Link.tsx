import React, {
  forwardRef,
  ReactNode,
  ElementType,
  AnchorHTMLAttributes
} from 'react'
import MUILink from '@material-ui/core/Link'
import { Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

import {
  BaseProps,
  OverridableComponent,
  ensurePicassoContext
} from '../Picasso'
import styles from './styles'

type UnderlineType = 'none' | 'hover' | 'always'
type VariantType = 'action' | 'default'
type ColorType = 'white' | 'blue' | 'black'

const useStyles = makeStyles<Theme, Props>(styles)

export type Props = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    /** Content of the component */
    children?: ReactNode
    /** Destination the link points to */
    href?: string
    /** Controls when the link should have an underline */
    underline?: UnderlineType
    /** Callback invoked when component is clicked */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    as?: ElementType
    /** Either it's a regular link or an _action_ */
    variant?: VariantType
    /** Controls color of the link (ignored while used with invert prop) */
    color?: ColorType
    /** Indicates the order of receiving focus. If not set will not receive focus. */
    tabIndex?: number
    invert?: boolean // TODO: remove in v4
  }

export const Link: OverridableComponent<Props> = forwardRef<
  HTMLAnchorElement,
  Props
>(function Link(props, ref) {
  const {
    href,
    underline,
    onClick,
    children,
    className,
    color,
    style,
    as,
    variant,
    tabIndex,
    invert,
    ...rest
  } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...nativeHTMLAttributes } = rest
  const classes = useStyles(props)
  let fontColor = color

  if (invert) {
    fontColor = 'white'
    // eslint-disable-next-line no-console
    console.log(
      'Please stop using `invert` it will be removed in next major release. Use color=white instead.'
    )
  }

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
        [classes.white]: fontColor === 'white',
        [classes.black]: fontColor === 'black'
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
  color: 'blue',
  variant: 'default'
}

Link.displayName = 'Link'

export default ensurePicassoContext(Link)
