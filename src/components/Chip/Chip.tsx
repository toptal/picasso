import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIChip from '@material-ui/core/Chip'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Specify the icon which should be rendered inside Chip */
  icon?: ReactElement
  /** Text content of the `Chip` component */
  label?: ReactNode
  /** Delete icon component */
  deleteIcon?: ReactElement
  /** A callback which is invoked after remove `deleteIcon` is clicked */
  onDelete?: () => void
}

const Chip = forwardRef<HTMLDivElement, Props>(function Chip(
  { classes, className, style, deleteIcon, icon, label, onDelete, ...rest },
  ref
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...htmlAttributes } = rest
  const { innerLabel, ...restClasses } = classes

  return (
    <MUIChip
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...htmlAttributes}
      ref={ref}
      classes={restClasses}
      className={className}
      style={style}
      icon={icon}
      label={<span className={innerLabel}>{label}</span>}
      deleteIcon={deleteIcon}
      onDelete={onDelete}
    />
  )
})

Chip.displayName = 'Chip'

export default withStyles(styles)(Chip)
