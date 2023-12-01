/* eslint-disable import/no-extraneous-dependencies */
import type { DateOrDateRangeType } from '@toptal/picasso-calendar'

export type DatePickerValue = DateOrDateRangeType | null

export type DatePickerInputValueParserParameters = {
  customParser?: DatePickerInputCustomValueParser
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
