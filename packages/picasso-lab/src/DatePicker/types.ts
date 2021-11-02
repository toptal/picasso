import { InputProps } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { ReactNode } from 'react'

import { DateOrDateRangeType, DayProps } from '../Calendar'

interface DatePickerBaseProps
  extends BaseProps,
    Omit<
      InputProps,
      | 'value'
      | 'onSelect'
      | 'type'
      | 'multiline'
      | 'rows'
      | 'defaultValue'
      | 'onChange'
    > {
  /** Invoked when user goes away from Datepicker input */
  onBlur?: () => void
  /** Earliest date available for selection */
  minDate?: Date
  /** Latest date available for selection */
  maxDate?: Date
  /** Whether calendar should be closed after date selection. True by default */
  hideOnSelect?: boolean
  /** Date format that user will see in the input */
  displayDateFormat?: string
  /** Date format that user will see during manual input */
  editDateFormat?: string
  /** Specify icon which should be rendered inside DatePicker */
  icon?: ReactNode
  /** Specify a value if want to enable browser autofill */
  autoComplete?: string
  /** Indicate whether `DatePicker`'s input is in error state */
  error?: boolean
  /** Function to override default markup to show Date */
  renderDay?: (args: DayProps) => ReactNode
  popperContainer?: HTMLElement
  /** Index of the first day of the week (0 - Sunday). Default is 1 - Monday */
  weekStartsOn?: number
  /** IANA timezone to display and edit date(s) */
  timezone?: string
}

export interface AllowCustomValue {
  /** Whether custom values should be allowed or not. It doesn't support `range` mode */
  allowCustomValue: true
  onChange: (value: DateOrDateRangeType | string | null) => void
  value?: DateOrDateRangeType | null | string
  range?: undefined
  disabledIntervals?: undefined
}

interface DisallowCustomValue {
  allowCustomValue?: false
  /** Method that will be invoked with selected values */
  onChange: (value: DateOrDateRangeType | null) => void
  /** Whether calendar supports single date selection or range */
  range?: boolean
  /** Date range where selection is not allowed */
  disabledIntervals?: { start: Date; end: Date }[]
  /** Date that will be selected in `DatePicker` */
  value?: DateOrDateRangeType | null
}

export type DatePickerProps = DatePickerBaseProps &
  (AllowCustomValue | DisallowCustomValue)
