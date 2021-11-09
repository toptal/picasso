import { DateOrDateRangeType } from '../Calendar'

export type DatePickerValue = DateOrDateRangeType | string | null

export type DatePickerStringParser = (
  value: string,
  params: {
    dateFormat: string
    timezone?: string
    minDate?: Date
    maxDate?: Date
  }
) => DateOrDateRangeType | string | undefined
