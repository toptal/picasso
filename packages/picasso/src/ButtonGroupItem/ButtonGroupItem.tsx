import React, { ButtonHTMLAttributes, forwardRef, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps } from '@toptal/picasso-shared'

import { ButtonGroupContext } from '../ButtonGroup'
import styles from './styles'

export interface Props
  extends StandardProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonGroupItem = forwardRef<HTMLButtonElement, Props>(
  function ButtonGroupItem({ classes, className, ...rest }, ref) {
    const rootClassName = cx(
      {
        // @ts-ignore
        [classes.active]: rest.active
      },
      classes.root
    )

    const order = useContext(ButtonGroupContext)

    return (
      <button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(
          rootClassName,
          {
            [classes.first]: order === 'first' || order === 'single',
            [classes.middle]: !order || order === 'middle',
            [classes.last]: order === 'last' || order === 'single'
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
