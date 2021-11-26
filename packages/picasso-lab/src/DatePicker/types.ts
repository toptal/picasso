import { DateOrDateRangeType } from '../Calendar'

export type DatePickerValue = DateOrDateRangeType | null

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
) => Date | null | undefined
