import type { HourCycle } from './get-hour-cycle'

export interface Time {
  hours: number
  minutes: number
}

export interface TimeOption {
  value: string
  label: string
}

export const VALID_TIME_REGEX = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/

const MINUTES_IN_HOUR = 60
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR
const HALF_DAY = 12

const padTimePart = (part: number) => String(part).padStart(2, '0')

export const parseTime = (value?: string): Time | undefined => {
  if (!value || !VALID_TIME_REGEX.test(value)) {
    return undefined
  }

  const [hours, minutes] = value.split(':').map(Number)

  return { hours, minutes }
}

export const formatTime = ({ hours, minutes }: Time) =>
  `${padTimePart(hours)}:${padTimePart(minutes)}`

export const getCurrentTime = (): Time => {
  const now = new Date()

  return { hours: now.getHours(), minutes: now.getMinutes() }
}

const formatLabel = (time: Time, hourCycle: HourCycle) => {
  if (hourCycle === 24) {
    return formatTime(time)
  }

  const hours = time.hours % HALF_DAY || HALF_DAY
  const period = time.hours < HALF_DAY ? 'AM' : 'PM'

  return `${formatTime({ hours, minutes: time.minutes })} ${period}`
}

export const getTimeOptions = (
  minuteStep: number,
  hourCycle: HourCycle
): TimeOption[] => {
  const options: TimeOption[] = []

  for (let minutes = 0; minutes < MINUTES_IN_DAY; minutes += minuteStep) {
    const time = {
      hours: Math.floor(minutes / MINUTES_IN_HOUR),
      minutes: minutes % MINUTES_IN_HOUR,
    }

    options.push({
      value: formatTime(time),
      label: formatLabel(time, hourCycle),
    })
  }

  return options
}

export const getNearestOptionIndex = (time: Time, minuteStep: number) =>
  Math.min(
    Math.round((time.hours * MINUTES_IN_HOUR + time.minutes) / minuteStep),
    Math.ceil(MINUTES_IN_DAY / minuteStep) - 1
  )
