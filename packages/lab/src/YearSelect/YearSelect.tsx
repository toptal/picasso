import React, { forwardRef, useMemo, ChangeEvent } from 'react'
import { JssProps, OmitInternalProps } from '@toptal/picasso-shared'
import { Select } from '@toptal/picasso-core'
import { Props as SelectProps } from '@toptal/picasso-core/src/Select'

type AdjustedSelectProps = OmitInternalProps<
  Omit<SelectProps, 'onChange' | 'options'>
> &
  Partial<JssProps>

export interface Props extends AdjustedSelectProps {
  /** a year select starts from. e.g. 2017 */
  from: number
  /** a year select ends at. e.g. 2019 */
  to: number
  /** Callback invoked when picker changes its state. */
  onChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void
}

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

export const YearSelect = forwardRef<HTMLInputElement, Props>(
  function YearSelect({ from, to, onChange, ...rest }, ref) {
    const handleChange = (
      event: ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      onChange(event)
    }

    if (!to || !from || to < from) {
      throw new Error(
        `Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`
      )
    }

    const options = useMemo(() => generateOptions(from, to), [from, to])

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Select {...rest} ref={ref} options={options} onChange={handleChange} />
    )
  }
)

YearSelect.defaultProps = {}

YearSelect.displayName = 'YearSelect'

export default YearSelect
