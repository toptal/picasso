import React from 'react'

import Typography, { TypographyProps } from '../Typography'
import {
  formatAmount,
  DEFAULT_LOCALE,
  DEFAULT_CURRENCY
} from '../utils/Formatters'

export interface Props extends TypographyProps {
  /** The amount to be formatted */
  amount: number | string
  /** Currency which need to be applied on the amount (ISO format) https://www.currency-iso.org/en/home/tables/table-a1.html */
  currency?: string
  /** Locale identifiers are case-insensitive ASCII. However, it's conventional to use title case (first letter capitalized, successive letters lower case) for script code, upper case for region codes, and lower case for everything else. */
  locale?: string
}

export const Amount = ({
  amount,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  inline = true,
  as = 'span',
  ...typographyProps
}: Props) => {
  return (
    <Typography inline={inline} as={as} {...typographyProps}>
      {formatAmount({ amount, currency, locale })}
    </Typography>
  )
}

Amount.displayName = 'Amount'

export default Amount
