import React, { useMemo, Ref } from 'react'

import Select, { SelectProps } from '../Select'
import { forwardRef, documentable } from '../utils/forward-ref'

type AdjustedSelectProps<M extends boolean> = Omit<
  SelectProps<number, M>,
  'options'
>

/**
 * YearSelect props are generalized over multiselect property. If you want `onChange`
 * to take handler that can take array (for multiselect) you should set `Multiple`
 * to `true`. By default it's single select.
 *
 * @param Multiple The `boolean` type of the `multiple` property to indicate whether `onChange` will expect handler to accept plain `number` or array of `number`s
 */
export interface Props<Multiple extends boolean>
  extends AdjustedSelectProps<Multiple> {
  /** a year select starts from. e.g. 2017 */
  from: number
  /** a year select ends at. e.g. 2019 */
  to: number
}

const generateOptions = (from: number, to: number) => {
  const length = Math.abs(to - from) + 1

  return Array.from({ length }).map((_, index) => {
    const value = to < from ? from - index : index + from

    return {
      value,
      text: value.toString()
    }
  })
}

export const YearSelect = documentable(
  forwardRef(
    <M extends boolean = false>(
      { from, to, ...rest }: Props<M>,
      ref: Ref<HTMLInputElement>
    ) => {
      if (!to || !from) {
        throw new Error(
          `Invalid range. Please check the values you have passed: from: ${from}, to: ${to}`
        )
      }

      const options = useMemo(() => generateOptions(from, to), [from, to])

      return <Select {...rest} ref={ref} options={options} />
    }
  )
)

YearSelect.defaultProps = {}

YearSelect.displayName = 'YearSelect'

export default YearSelect
