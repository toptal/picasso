import {
  VALID_TIME_REGEX,
  formatTime,
  getCurrentTime,
  getNearestOptionIndex,
  getTimeOptions,
  parseTime,
} from './time'

describe('VALID_TIME_REGEX', () => {
  it.each(['00:00', '09:05', '12:30', '19:59', '23:59'])(
    'accepts %s',
    value => {
      expect(VALID_TIME_REGEX.test(value)).toBe(true)
    }
  )

  it.each([
    ['24:00', 'the hour is out of range'],
    ['12:60', 'the minute is out of range'],
    ['9:30', 'the hour is not padded'],
    ['12:3', 'the minute is not padded'],
    ['12:30:00', 'seconds are included'],
    ['12.30', 'the separator is not a colon'],
    [' 12:30', 'there is surrounding whitespace'],
    ['', 'the value is empty'],
  ])('rejects "%s" because %s', value => {
    expect(VALID_TIME_REGEX.test(value)).toBe(false)
  })
})

describe('parseTime', () => {
  describe('when the value is a valid time', () => {
    it('returns the hours and minutes as numbers', () => {
      expect(parseTime('09:05')).toEqual({ hours: 9, minutes: 5 })
      expect(parseTime('23:59')).toEqual({ hours: 23, minutes: 59 })
    })
  })

  describe('when the value is not a valid time', () => {
    it('returns undefined', () => {
      expect(parseTime('24:00')).toBeUndefined()
      expect(parseTime('9:05')).toBeUndefined()
    })
  })

  describe('when the value is missing', () => {
    it('returns undefined', () => {
      expect(parseTime()).toBeUndefined()
      expect(parseTime('')).toBeUndefined()
    })
  })
})

describe('formatTime', () => {
  it('pads hours and minutes to two digits', () => {
    expect(formatTime({ hours: 0, minutes: 0 })).toBe('00:00')
    expect(formatTime({ hours: 9, minutes: 5 })).toBe('09:05')
    expect(formatTime({ hours: 23, minutes: 59 })).toBe('23:59')
  })
})

describe('getCurrentTime', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 14, 7))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the local hours and minutes of now', () => {
    expect(getCurrentTime()).toEqual({ hours: 14, minutes: 7 })
  })
})

describe('getTimeOptions', () => {
  it('offers one option per step across the whole day', () => {
    expect(getTimeOptions(60, 24)).toHaveLength(24)
    expect(getTimeOptions(30, 24)).toHaveLength(48)
    expect(getTimeOptions(15, 24)).toHaveLength(96)
  })

  it('keeps values in 24-hour HH:mm format regardless of the hour cycle', () => {
    const values = (hourCycle: 12 | 24) =>
      getTimeOptions(30, hourCycle).map(option => option.value)

    expect(values(12)).toEqual(values(24))
    expect(values(24).slice(0, 3)).toEqual(['00:00', '00:30', '01:00'])
    expect(values(24).slice(-1)).toEqual(['23:30'])
  })

  describe('when the hour cycle is 24', () => {
    it('labels the options with the 24-hour time', () => {
      const labels = getTimeOptions(30, 24).map(option => option.label)

      expect(labels).toContain('00:00')
      expect(labels).toContain('12:30')
      expect(labels).toContain('13:00')
      expect(labels).toContain('23:30')
      expect(labels.some(label => /AM|PM/.test(label))).toBe(false)
    })
  })

  describe('when the hour cycle is 12', () => {
    it('labels the options with a 12-hour time and a period', () => {
      const labelOf = (value: string) =>
        getTimeOptions(30, 12).find(option => option.value === value)?.label

      expect(labelOf('00:00')).toBe('12:00 AM')
      expect(labelOf('00:30')).toBe('12:30 AM')
      expect(labelOf('01:00')).toBe('01:00 AM')
      expect(labelOf('11:30')).toBe('11:30 AM')
      expect(labelOf('12:00')).toBe('12:00 PM')
      expect(labelOf('13:00')).toBe('01:00 PM')
      expect(labelOf('23:30')).toBe('11:30 PM')
    })
  })
})

describe('getNearestOptionIndex', () => {
  describe('when the time falls on an option', () => {
    it('returns the index of that option', () => {
      expect(getNearestOptionIndex({ hours: 0, minutes: 0 }, 15)).toBe(0)
      expect(getNearestOptionIndex({ hours: 10, minutes: 0 }, 15)).toBe(40)
      expect(getNearestOptionIndex({ hours: 23, minutes: 45 }, 15)).toBe(95)
    })
  })

  describe('when the time falls between options', () => {
    it('returns the index of the closest option', () => {
      expect(getNearestOptionIndex({ hours: 10, minutes: 7 }, 15)).toBe(40)
      expect(getNearestOptionIndex({ hours: 10, minutes: 8 }, 15)).toBe(41)
    })
  })

  describe('when the time is closer to midnight than to the last option', () => {
    it('returns the index of the last option', () => {
      expect(getNearestOptionIndex({ hours: 23, minutes: 59 }, 15)).toBe(95)
      expect(getNearestOptionIndex({ hours: 23, minutes: 50 }, 60)).toBe(23)
    })
  })
})
