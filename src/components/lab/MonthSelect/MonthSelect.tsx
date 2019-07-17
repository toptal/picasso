import React, { FunctionComponent, ChangeEvent, useMemo } from 'react'

import Select, { Props as SelectProps } from '../../Select'

export interface Props extends Omit<SelectProps, 'onChange' | 'options'> {
  /** a number or stringified number select starts from. e.g. 5 for May */
  from?: number | string
  /** a number or stringified number select ends at. e.g. 11 for November */
  to?: number | string
  /** Callback invoked when picker changes its state. */
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
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

function getFilteredOptions(from: number | string, to: number | string) {
  const numberifiedFrom = Number(from)
  const numberifiedTo = Number(to)

  return OPTIONS.slice(numberifiedFrom - 1, numberifiedTo)
}

export const MonthSelect: FunctionComponent<Props> = ({
  from = 1,
  to = 12,
  onChange,
  ...rest
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event)
  }

  const options = useMemo(() => getFilteredOptions(from, to), [from, to])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Select {...rest} options={options} onChange={handleChange} />
}

MonthSelect.defaultProps = {
  from: 1,
  to: 12
}

MonthSelect.displayName = 'MonthSelect'

export default MonthSelect
