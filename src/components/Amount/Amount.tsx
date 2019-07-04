import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { FunctionComponent, memo, HTMLAttributes } from 'react'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLSpanElement> {
  /** The amount to be formatted */
  amount: number
  /** Currency which need to be applied on the amount (ISO format) */
  currency?: string
}
/** Currency List: https://www.currency-iso.org/en/home/tables/table-a1.html */

export const Amount: FunctionComponent<Props> = memo(
  ({ amount, className, classes, currency, ...rest }) => {
    const formattedAmount = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <span {...rest} className={cx(classes.root, className)}>
        {formattedAmount}
      </span>
    )
  }
)

Amount.defaultProps = {
  currency: 'USD'
}

Amount.displayName = 'Amount'

export default withStyles(styles)(Amount)
