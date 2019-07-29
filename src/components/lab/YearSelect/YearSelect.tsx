import React, { FunctionComponent, useMemo, ChangeEvent } from 'react'

import Select, { Props as SelectProps } from '../../Select'

function generateOptions(from: number, to: number) {
  const length = to - from + 1

  return Array.from({ length }).map((_, index) => {
    const value = index + from

    return {
      value,
      text: value.toString()
    }
  })
}

export interface Props extends Omit<SelectProps, 'onChange' | 'options'> {
  /** a year select starts from. e.g. 2017 */
  from: number
  /** a year select ends at. e.g. 2019 */
  to: number
  /** Callback invoked when picker changes its state. */
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const YearSelect: FunctionComponent<Props> = ({
  from,
  to,
  onChange,
  ...rest
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event)
  }

  if (!to || !from || to < from) {
    throw new Error(
      `Please check the values you have passed: from: ${from}, to: ${to}`
    )
  }

  const options = useMemo(() => generateOptions(from, to), [from, to])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Select {...rest} options={options} onChange={handleChange} />
}

YearSelect.defaultProps = {}

YearSelect.displayName = 'YearSelect'

export default YearSelect
