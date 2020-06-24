import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import formatDate from 'date-fns/format'
import { utcToZonedTime, format as tzFormat } from 'date-fns-tz'

import { DateOrDateRangeType, DateRangeType } from '../Calendar'

// Convert date to given timezone. If timezone is undefined, return given date as is.
export const timezoneConvert = (
  date: DateOrDateRangeType,
  timeZone?: string
): DateOrDateRangeType => {
  const _convert = (dateToConvert: Date) => {
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
    ? (date.map(_convert) as DateRangeType)
    : (_convert(date) as Date)
}

// Format date in given timezone. If timezone is undefined, return given date as is.
export const timezoneFormat = (date: Date, timeZone?: string) => {
  if (timeZone) {
    /**
     * Prevent invalid IANA timezone error. This is likely to happen
     * when someone is editing properties in a Storybook examples.
     */
    try {
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
