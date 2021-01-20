import React, { forwardRef, ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  BaseProps,
  TextLabelProps,
  CompoundedComponentWithRef,
  useTitleCase
} from '@toptal/picasso-shared'
import { Badge as MuiBadge } from '@material-ui/core'
import { toTitleCase } from '@toptal/picasso/utils'

import styles from './styles'

type VariantType = 'white' | 'red'
type SizeType = 'medium' | 'small'

export interface Props extends BaseProps, TextLabelProps {
  /** The `Badge` content */
  content: string
  /** Text content of the `Badge` component */
  children: ReactNode
  /** Variant of the `Badge` */
  variant?: VariantType
  /** Size of the `Badge` */
  size?: SizeType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoOverlayBadge'
})

// eslint-disable-next-line react/display-name
export const OverlayBadge = forwardRef<HTMLDivElement, Props>(
  function OverlayBadge(props, ref) {
    const {
      children,
      style,
      variant,
      size,
      content,
      titleCase: propsTitleCase
    } = props
    const classes = useStyles()

    const titleCase = useTitleCase(propsTitleCase)

    // TODO: modify
    return (
      <MuiBadge
        ref={ref}
        style={style}
        badgeContent={titleCase ? toTitleCase(content) : content}
        classes={{
          anchorOriginTopRightRectangle: cx(
            classes.root,
            classes[variant!],
            classes[size!]
          )
        }}
      >
        {children}
      </MuiBadge>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLDivElement>

OverlayBadge.defaultProps = {
  variant: 'white',
  size: 'medium'
}

OverlayBadge.displayName = 'OverlayBadge'

export default OverlayBadge
