import { getHourCycle } from './get-hour-cycle'

const PROBE_HEIGHT = 100

const mockNativeFieldLayout = (renderedSegments: string[]) => {
  jest
    .spyOn(HTMLElement.prototype, 'offsetHeight', 'get')
    .mockImplementation(function (this: HTMLElement) {
      // eslint-disable-next-line no-invalid-this
      const testId = this.getAttribute('data-testid')
      const isStretched = renderedSegments.some(
        segment => testId === `time-picker-probe-${segment}`
      )

      return isStretched ? PROBE_HEIGHT : 17
    })
}

describe('getHourCycle', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('when the native time field renders an AM/PM segment', () => {
    beforeEach(() => {
      mockNativeFieldLayout(['hour', 'ampm'])
    })

    it('leaves no probe elements in the document', () => {
      getHourCycle('de-DE')

      expect(document.querySelector('input')).not.toBeInTheDocument()
    })

    describe('when the locale uses a 24-hour clock', () => {
      it('returns 12', () => {
        expect(getHourCycle('de-DE')).toBe(12)
      })
    })
  })

  describe('when the native time field renders no AM/PM segment', () => {
    beforeEach(() => {
      mockNativeFieldLayout(['hour'])
    })

    describe('when the locale uses a 12-hour clock', () => {
      it('returns 24', () => {
        expect(getHourCycle('en-US')).toBe(24)
      })
    })
  })

  describe('when the browser does not expose the segments of the native field', () => {
    beforeEach(() => {
      mockNativeFieldLayout([])
    })

    describe('when the locale uses a 12-hour clock', () => {
      it('returns 12', () => {
        expect(getHourCycle('en-US')).toBe(12)
      })
    })

    describe('when the locale uses a 24-hour clock', () => {
      it('returns 24', () => {
        expect(getHourCycle('de-DE')).toBe(24)
      })
    })
  })
})
