import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { forwardRef, memo, HTMLAttributes } from 'react'
import { PicassoComponentWithRef, BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLSpanElement> {
  /** The amount to be formatted */
  amount: number
  /** Currency which need to be applied on the amount (ISO format) */
  currency?: string
}
/** Currency List: https://www.currency-iso.org/en/home/tables/table-a1.html */

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAmount'
})

// eslint-disable-next-line react/display-name
export const Amount = memo(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLSpanElement, Props>(function Amount(props, ref) {
    const { amount, className, currency, ...rest } = props
    const classes = useStyles()

    const formattedAmount = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <span {...rest} ref={ref} className={cx(classes.root, className)}>
        {formattedAmount}
      </span>
    )
  })
) as PicassoComponentWithRef<Props, HTMLSpanElement>

Amount.defaultProps = {
  currency: 'USD'
}

Amount.displayName = 'Amount'

export default Amount
