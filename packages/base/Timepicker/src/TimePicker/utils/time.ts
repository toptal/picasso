export interface Time {
  hours: number
  minutes: number
}

export const VALID_TIME_REGEX = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/

export const padTimePart = (part: number) => String(part).padStart(2, '0')

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
