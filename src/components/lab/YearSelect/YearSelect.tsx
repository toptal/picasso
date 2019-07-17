import React, { FunctionComponent, useMemo, ChangeEvent } from 'react'

import Select, { Props as SelectProps } from '../../Select'

function generateOptions(from: string | number, to: string | number) {
  const length = Number(to) - Number(from) + 1

  return Array.from({ length }).map((_, index) => {
    const value = index + Number(from)

    return {
      value,
      text: value.toString()
    }
  })
}

export interface Props extends Omit<SelectProps, 'onChange' | 'options'> {
  /** a number or stringified number select starts from. e.g. 2017 */
  from: number | string
  /** a number or stringified number select ends at. e.g. 2019 */
  to: number | string
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

  const options = useMemo(() => generateOptions(from, to), [from, to])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Select {...rest} options={options} onChange={handleChange} />
}

YearSelect.defaultProps = {}

YearSelect.displayName = 'YearSelect'

export default YearSelect
