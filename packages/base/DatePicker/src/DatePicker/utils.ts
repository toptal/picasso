import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import formatDate from 'date-fns/format'
import isWithinInterval from 'date-fns/isWithinInterval'
import isEqual from 'date-fns/isEqual'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import { utcToZonedTime, format as tzFormat, toDate } from 'date-fns-tz'
import type {
  DateOrDateRangeType,
  DateRangeType,
} from '@toptal/picasso-calendar'

import type { DatePickerInputValueParserParameters } from './types'

// Convert date to given timezone. If timezone is undefined, return given date as is.
export const timezoneConvert = (
  date: DateOrDateRangeType,
  timeZone?: string
): DateOrDateRangeType => {
  const convert = (dateToConvert: Date) => {
    if (timeZone) {
      /**
       * Prevent invalid IANA timezone error. This is likely to happen
       * when someone is editing properties in a Storybook examples.
       */
      try {
        return utcToZonedTime(dateToConvert, timeZone)
      } catch {
        return dateToConvert
      }
    }

    return dateToConvert
  }

  return Array.isArray(date)
    ? (date.map(convert) as DateRangeType)
    : (convert(date) as Date)
}

// Format date in given timezone. If timezone is undefined, return given date as is.
export const timezoneFormat = (date: Date, timeZone?: string) => {
  if (timeZone) {
    /**
     * Prevent invalid IANA timezone error. This is likely to happen
     * when someone is editing properties in a Storybook examples.
     */
    try {
      /**
       * Maintain the same date and time, but formatted in the given timezone
       * so next time the user edits the date it's not recalculated.
       */
      return new Date(tzFormat(date, 'MMM dd yyyy HH:mm:ss OOOO', { timeZone }))
    } catch {
      return date
    }
  }

  return date
}

export const formatDateRange = (dates: DateRangeType, format: string) =>
  dates.map(date => formatDate(date, format)).join(' - ')

export const isDateValid = (date: string, pattern: string) => {
  return (
    date.length === pattern.length && isValid(parse(date, pattern, new Date()))
  )
}

export const isDateAfter = (date: Date, dateToCompare: Date) =>
  isEqual(date, dateToCompare) || isAfter(date, dateToCompare)

export const isDateBefore = (date: Date, dateToCompare: Date) =>
  isEqual(date, dateToCompare) || isBefore(date, dateToCompare)

// eslint-disable-next-line complexity
export const isDateWithinInterval = (
  date: Date,
  minDate: Date | undefined,
  maxDate: Date | undefined
) => {
  if (!minDate && !maxDate) {
    return true
  }

  if (minDate && maxDate) {
    return isWithinInterval(date, {
      start: minDate,
      end: maxDate,
    })
  }

  if (minDate) {
    return isDateAfter(date, minDate)
  }

  if (maxDate) {
    return isDateBefore(date, maxDate)
  }

  return false
}

export const datePickerParseDateString = (
  value: string,
  {
    customParser,
    dateFormat,
    timezone,
    minDate,
    maxDate,
  }: DatePickerInputValueParserParameters
) => {
  if (!value) {
    return
  }

  const isValidDateString = isDateValid(value, dateFormat)
  const parsedNextValue =
    customParser && !isValidDateString
      ? customParser(value, { timezone })
      : parse(value, dateFormat, new Date())

  if (!parsedNextValue || !isValid(parsedNextValue)) {
    return
  }

  const nextTimezoneValue = timezoneFormat(parsedNextValue, timezone)

  if (!isDateWithinInterval(nextTimezoneValue, minDate, maxDate)) {
    return
  }

  return nextTimezoneValue
}

export const isValidDateValue = (
  dateValue: DateOrDateRangeType | string
): dateValue is DateOrDateRangeType => typeof dateValue !== 'string'

export const getStartOfTheDayDate = (date?: Date): Date | undefined => {
  if (!date) {
    return date
  }

  // to prevent mutation of the original date
  const clonedDate = toDate(date)

  clonedDate.setHours(0, 0, 0, 0)

  return clonedDate
}
