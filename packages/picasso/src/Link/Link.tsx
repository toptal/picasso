import React, {
  forwardRef,
  ReactNode,
  ElementType,
  AnchorHTMLAttributes
} from 'react'
import MUILink from '@material-ui/core/Link'
import { Theme, makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, OverridableComponent } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'action' | 'anchor'
type ColorType = 'white' | 'blue'
type FontSizeType = 'initial' | 'inherit'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoLink' })

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
    /** Indicates that the user cannot interact with the Link or its children */
    disabled?: boolean
    /**
     * Controls fontSize of component
     * @default initial
     */
    fontSize?: FontSizeType
    /**
     * If true, underline decoration never applies
     */
    noUnderline?: boolean
  }

export const Link: OverridableComponent<Props> = forwardRef<
  HTMLAnchorElement,
  Props
>(function Link(props, ref) {
  const {
    href,
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
    disabled,
    fontSize,
    noUnderline,
    ...rest
  } = props
  const nativeHTMLAttributes = rest
  const classes = useStyles()
  const sanitizedRel = sanitizeRel(rel, target)

  return (
    <MUILink
      {...nativeHTMLAttributes}
      ref={ref}
      href={disabled ? undefined : href}
      target={disabled ? undefined : target}
      rel={sanitizedRel}
      onClick={disabled ? undefined : onClick}
      className={cx(classes.root, className, {
        [classes.action]: variant === 'action',
        [classes.white]: color === 'white',
        [classes.disabled]: disabled,
        [classes.fontSizeInitial]: fontSize === 'initial',
        [classes.fontSizeInherit]: fontSize === 'inherit',
        [classes.noUnderline]: noUnderline
      })}
      style={style}
      component={as}
      tabIndex={tabIndex}
      aria-disabled={disabled}
    >
      {children}
    </MUILink>
  )
})

Link.defaultProps = {
  as: 'a',
  color: 'blue',
  variant: 'anchor',
  fontSize: 'initial',
  noUnderline: false
}

Link.displayName = 'Link'

export default Link
