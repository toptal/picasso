import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import { useButtonGroupOrder } from '../ButtonGroup'
import styles from './styles'

export interface Props
  extends StandardProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonGroupItem = forwardRef<HTMLButtonElement, Props>(
  function ButtonGroupItem({ classes, className, ...rest }, ref) {
    const order = useButtonGroupOrder()

    return (
      <button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(
          classes.root,
          {
            [classes.first]: order === 'first',
            [classes.middle]: order === 'middle',
            [classes.last]: order === 'last'
          },
          className
        )}
      />
    )
  }
)

ButtonGroupItem.defaultProps = {
  classes: {}
}

ButtonGroupItem.displayName = 'ButtonGroupItem'

export default withStyles(styles)(ButtonGroupItem)
