import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  TextLabelProps,
  CompoundedComponentWithRef,
  useTitleCase,
  mergeClasses
} from '@toptal/picasso-shared'
import { Chip } from '@material-ui/core'
import { toTitleCase } from '@toptal/picasso/utils'

import styles from './styles'

type VariantType = 'white' | 'red'
type SizeType = 'medium' | 'small'

export interface Props extends StandardProps, TextLabelProps {
  /** The `Badge` content */
  content: string
  /** Variant of the `Badge` */
  variant?: VariantType
  /** Size of the `Badge` */
  size?: SizeType
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoBadge' })

// eslint-disable-next-line react/display-name
export const Badge = forwardRef<HTMLDivElement, Props>(function Badge(
  props,
  ref
) {
  const {
    style,
    variant,
    size,
    content,
    titleCase: propsTitleCase,
    classes: externalClasses
  } = props
  const classes = mergeClasses(useStyles(props), externalClasses)

  const titleCase = useTitleCase(propsTitleCase)

  return (
    <Chip
      ref={ref}
      style={style}
      label={titleCase ? toTitleCase(content) : content}
      classes={{
        root: cx(classes.root, classes[variant!], classes[size!]),
        label: cx(classes[`${size!}Label`])
      }}
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement>

Badge.defaultProps = {
  variant: 'white',
  size: 'medium'
}

Badge.displayName = 'Badge'

export default Badge
