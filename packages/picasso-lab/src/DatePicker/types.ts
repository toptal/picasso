import { DateOrDateRangeType } from '../Calendar'

export type DatePickerValue = DateOrDateRangeType | string | null

export type DatePickerInputValueParserParameters = {
  dateFormat: string
  minDate?: Date
  maxDate?: Date
  timezone?: string
}

export type DatePickerInputCustomValueParserParameters = {
  timezone?: string
}

export type DatePickerInputCustomValueParser = (
  value: string,
  params: DatePickerInputCustomValueParserParameters
) => Promise<Date | null | undefined> | Date | null | undefined
