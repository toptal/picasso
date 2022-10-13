export const DEFAULT_CURRENCY = 'USD'
export const DEFAULT_LOCALE = 'en-US'

export interface FormatAmount {
  /** The amount to be formatted */
  amount: number | string
  /** Currency which need to be applied on the amount (ISO format) https://www.currency-iso.org/en/home/tables/table-a1.html */
  currency?: string
  /** Locale identifiers are case-insensitive ASCII. However, it's conventional to use title case (first letter capitalized, successive letters lower case) for script code, upper case for region codes, and lower case for everything else. */
  locale?: string
  options?: {
    /** The minimum number of fraction digits to display **/
    minimumFractionDigits?: number

    /** The maximum number of fraction digits to display **/
    maximumFractionDigits?: number
  }
}

export const formatAmount = ({
  amount,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
  options,
}: FormatAmount) => {
  const transformedAmount = typeof amount === 'string' ? Number(amount) : amount

  return Intl.NumberFormat(locale, {
    style: 'currency',
    minimumFractionDigits: options?.minimumFractionDigits,
    maximumFractionDigits: options?.maximumFractionDigits,
    currency,
  }).format(transformedAmount)
}
