import { isBrowser } from '@toptal/picasso-shared'

import {
  isPointerModality,
  subscribePointerModality,
  unsubscribePointerModality,
} from '../pointer-modality'

jest.mock('@toptal/picasso-shared', () => ({
  ...jest.requireActual('@toptal/picasso-shared'),
  isBrowser: jest.fn(() => true),
}))

const isBrowserMock = isBrowser as jest.Mock

const modalityCalls = (calls: unknown[][]) =>
  calls.filter(([type]) => type === 'keydown' || type === 'pointerdown')

describe('pointerModality', () => {
  beforeEach(() => {
    // The jest config resets mock implementations between tests, wiping the
    // factory default above — re-pin the browser environment per test.
    isBrowserMock.mockReturnValue(true)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('defaults to keyboard modality', () => {
    // Order-independent: unsubscribing the last subscriber resets the flag to
    // the keyboard default, so drive the flag to "pointer" and release it —
    // the reader must read back the default regardless of prior tests.
    subscribePointerModality()
    window.dispatchEvent(new Event('pointerdown'))
    unsubscribePointerModality()

    expect(isPointerModality()).toBe(false)
  })

  it('flips to pointer on pointerdown and back to keyboard on keydown', () => {
    subscribePointerModality()

    window.dispatchEvent(new Event('pointerdown'))

    expect(isPointerModality()).toBe(true)

    window.dispatchEvent(new Event('keydown'))

    expect(isPointerModality()).toBe(false)

    unsubscribePointerModality()
  })

  it('attaches the window listeners once and detaches on the last unsubscribe', () => {
    const addSpy = jest.spyOn(window, 'addEventListener')
    const removeSpy = jest.spyOn(window, 'removeEventListener')

    subscribePointerModality()
    subscribePointerModality()

    // One keydown + one pointerdown listener, both capture-phase, regardless
    // of how many subscribers there are.
    expect(modalityCalls(addSpy.mock.calls)).toEqual([
      ['keydown', expect.any(Function), true],
      ['pointerdown', expect.any(Function), true],
    ])

    unsubscribePointerModality()

    expect(modalityCalls(removeSpy.mock.calls)).toHaveLength(0)

    unsubscribePointerModality()

    expect(modalityCalls(removeSpy.mock.calls)).toEqual([
      ['keydown', expect.any(Function), true],
      ['pointerdown', expect.any(Function), true],
    ])
  })

  it('does nothing outside the browser', () => {
    isBrowserMock.mockReturnValue(false)

    const addSpy = jest.spyOn(window, 'addEventListener')
    const removeSpy = jest.spyOn(window, 'removeEventListener')

    subscribePointerModality()
    unsubscribePointerModality()

    expect(modalityCalls(addSpy.mock.calls)).toHaveLength(0)
    expect(modalityCalls(removeSpy.mock.calls)).toHaveLength(0)
    // The reader still answers with the keyboard default, which is the
    // correct server-side value.
    expect(isPointerModality()).toBe(false)
  })
})
