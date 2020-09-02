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
import { BaseProps, OverridableComponent } from '@toptal/picasso-shared'

import styles from './styles'

type UnderlineType = 'none' | 'hover' | 'always'
type VariantType = 'action' | 'anchor'
type ColorType = 'white' | 'blue' | 'black'

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoLink' })

const sanitizeRel = (rel: string | undefined, target: string | undefined) => {
  if (target !== '_blank') {
    return rel
  }

  if (!rel) {
    return 'noopener'
  }

  const isRelSafe = rel.includes('noreferrer') || rel.includes('noopener')

  return isRelSafe ? rel : rel.concat(' noopener')
}

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
    /** Either it's a regular hyperlink or an _action_ */
    variant?: VariantType
    /** Controls color of the link */
    color?: ColorType
    /** Indicates the order of receiving focus. If not set will not receive focus. */
    tabIndex?: number
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
    color = 'blue',
    style,
    as = 'a',
    variant = 'anchor',
    tabIndex,
    target,
    rel,
    ...rest
  } = props
  const nativeHTMLAttributes = rest
  const classes = useStyles(props)
  const sanitizedRel = sanitizeRel(rel, target)

  return (
    <MUILink
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...nativeHTMLAttributes}
      ref={ref}
      href={href}
      target={target}
      rel={sanitizedRel}
      underline={underline}
      onClick={onClick}
      className={cx(classes.root, className, {
        [classes.action]: variant === 'action',
        [classes.white]: color === 'white',
        [classes.black]: color === 'black'
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
  variant: 'anchor'
}

Link.displayName = 'Link'

export default Link
