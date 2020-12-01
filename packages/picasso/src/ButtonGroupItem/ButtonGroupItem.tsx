import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps } from '@toptal/picasso-shared'

import { useButtonGroupOrder } from '../ButtonGroup'
import styles from './styles'

export interface Props
  extends BaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonGroupItem'
})

export const ButtonGroupItem = forwardRef<HTMLButtonElement, Props>(
  function ButtonGroupItem(props, ref) {
    const { className, ...rest } = props

    const classes = useStyles(props)
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

ButtonGroupItem.defaultProps = {}

ButtonGroupItem.displayName = 'ButtonGroupItem'

export default ButtonGroupItem
