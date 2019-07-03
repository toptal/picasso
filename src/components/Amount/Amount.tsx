import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import React, { FunctionComponent, memo } from 'react'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
  /** The amount to be formatted */
  amount: number
  /** Currency which need to be applied on the amount (ISO format) */
  currency?: string
}
/** Currency List: https://www.currency-iso.org/en/home/tables/table-a1.html */

export const Amount: FunctionComponent<Props> = memo(
  ({ amount, className, classes, currency, elementSelector }) => {
    const formattedAmount = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)

    return (
      <span className={cx(classes.root, className)} data-qa={elementSelector}>
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
