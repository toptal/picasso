import React, { useMemo, Ref } from 'react'

import Select, { Props as SelectProps } from '../Select'
import { documentable, forwardRef } from '../utils/forward-ref'

type AdjustedSelectProps<M extends boolean> = Omit<
  SelectProps<number, M>,
  'options'
>

/**
 * MonthSelect props are generalized over multiselect property. If you want `onChange`
 * to take handler that can take array (for multiselect) you should set `Multiple`
 * to `true`. By default it's single select.
 *
 * @param Multiple The `boolean` type of the `multiple` property to indicate whether `onChange` will expect handler to accept plain `number` or array of `number`s
 */
export interface Props<Multiple extends boolean>
  extends AdjustedSelectProps<Multiple> {
  /** a number of month select starts from. e.g. 5 for May */
  from?: number
  /** a number of month select ends at. e.g. 11 for November */
  to?: number
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

const getFilteredOptions = (from: number, to: number) => {
  return OPTIONS.slice(from - 1, to)
}

const FIRST_MONTH = 1
const LAST_MONTH = 12

export const MonthSelect = documentable(
  forwardRef(
    <M extends boolean = false>(
      { from = FIRST_MONTH, to = LAST_MONTH, ...rest }: Props<M>,
      ref: Ref<HTMLInputElement>
    ) => {
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

      return <Select {...rest} ref={ref} options={options} />
    }
  )
)

MonthSelect.defaultProps = {
  from: 1,
  to: 12
}

MonthSelect.displayName = 'MonthSelect'

export default MonthSelect
