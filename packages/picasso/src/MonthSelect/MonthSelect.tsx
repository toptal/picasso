import React, { forwardRef, ChangeEvent, useMemo } from 'react'
import { JssProps, OmitInternalProps } from '@toptal/picasso-shared'
import { Select } from '@toptal/picasso'
import { Props as SelectProps } from '@toptal/picasso/Select'

type AdjustedSelectProps = OmitInternalProps<
  Omit<SelectProps, 'onChange' | 'options'>
> &
  Partial<JssProps>

export interface Props extends AdjustedSelectProps {
  /** a number of month select starts from. e.g. 5 for May */
  from?: number
  /** a number of month select ends at. e.g. 11 for November */
  to?: number
  /** Callback invoked when picker changes its state. */
  onChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void
}

const OPTIONS = [
  { value: 1, text: 'January' },
  { value: 2, text: 'February' },
  { value: 3, text: 'March' },
  { value: 4, text: 'April' },
  { value: 5, text: 'May' },
  { value: 6, text: 'June' },
  { value: 7, text: 'July' },
  { value: 8, text: 'August' },
  { value: 9, text: 'September' },
  { value: 10, text: 'October' },
  { value: 11, text: 'November' },
  { value: 12, text: 'December' }
]

function getFilteredOptions(from: number, to: number) {
  return OPTIONS.slice(from - 1, to)
}

const FIRST_MONTH = 1
const LAST_MONTH = 12

export const MonthSelect = forwardRef<HTMLInputElement, Props>(
  function MonthSelect(
    { from = FIRST_MONTH, to = LAST_MONTH, onChange, ...rest },
    ref
  ) {
    const handleChange = (
      event: ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      onChange(event)
    }

    if (
      from < FIRST_MONTH ||
      from > LAST_MONTH ||
      to < FIRST_MONTH ||
      to > LAST_MONTH ||
      to < from
    ) {
      throw new Error(
        `Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`
      )
    }

    const options = useMemo(() => getFilteredOptions(from, to), [from, to])

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Select {...rest} ref={ref} options={options} onChange={handleChange} />
    )
  }
)

MonthSelect.defaultProps = {
  from: 1,
  to: 12
}

MonthSelect.displayName = 'MonthSelect'

export default MonthSelect
