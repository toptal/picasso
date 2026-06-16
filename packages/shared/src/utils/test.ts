import { toReactEvent, toReactChangeEvent } from './'

describe('toReactEvent', () => {
  const makeNativeChangeEvent = (target: HTMLInputElement): Event => {
    const event = new Event('change', { bubbles: true, cancelable: true })

    Object.defineProperty(event, 'target', { value: target, writable: false })

    return event
  }

  let input: HTMLInputElement
  let nativeEvent: Event

  beforeEach(() => {
    input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = true
    nativeEvent = makeNativeChangeEvent(input)
  })

  it('forwards native event properties unchanged', () => {
    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    expect(result.type).toBe('change')
    expect(result.target).toBe(input)
    expect(result.bubbles).toBe(true)
    expect(result.cancelable).toBe(true)
    // Reading `target.checked` works because target IS the native input
    expect(result.target.checked).toBe(true)
  })

  it('synthesizes `nativeEvent` to return the original event', () => {
    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    expect(result.nativeEvent).toBe(nativeEvent)
  })

  it('synthesizes `persist` as a noop function', () => {
    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    expect(typeof result.persist).toBe('function')
    expect(() => result.persist()).not.toThrow()
    expect(result.persist()).toBeUndefined()
  })

  it('synthesizes `isDefaultPrevented` to reflect native state', () => {
    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    expect(result.isDefaultPrevented()).toBe(false)
    nativeEvent.preventDefault()
    expect(result.isDefaultPrevented()).toBe(true)
  })

  it('synthesizes `isPropagationStopped` to return false (native lacks the state)', () => {
    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    expect(result.isPropagationStopped()).toBe(false)
    nativeEvent.stopPropagation()
    // Native events don't track propagation-stop state after dispatch.
    // The shim returns `false` consistently; consumers checking
    // "did I already stop?" get a safe default.
    expect(result.isPropagationStopped()).toBe(false)
  })

  it('does not mutate the underlying native event', () => {
    const nativeKeys = Object.keys(nativeEvent)

    toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    expect(Object.keys(nativeEvent)).toEqual(nativeKeys)
  })

  it('forwards method calls to the native event', () => {
    const preventDefaultSpy = jest.spyOn(nativeEvent, 'preventDefault')
    const stopPropagationSpy = jest.spyOn(nativeEvent, 'stopPropagation')

    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    result.preventDefault()
    result.stopPropagation()

    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  it('binds native methods to the native event (avoids "Illegal invocation")', () => {
    let probeBoundToNativeEvent = false

    // A method that records whether its `this` is the native event. Native DOM
    // methods (stopPropagation, …) throw "Illegal invocation" in real browsers
    // when invoked with the Proxy as `this` instead of the native event.
    ;(nativeEvent as unknown as { probe: () => void }).probe = function probe() {
      probeBoundToNativeEvent = this === nativeEvent
    }

    const result =
      toReactEvent<React.ChangeEvent<HTMLInputElement>>(nativeEvent)

    ;(result as unknown as { probe: () => void }).probe()

    expect(probeBoundToNativeEvent).toBe(true)
  })
})

describe('toReactChangeEvent', () => {
  const makeNativeChangeEvent = (target: EventTarget | null): Event => {
    const event = new Event('change', { bubbles: true, cancelable: true })

    Object.defineProperty(event, 'target', { value: target, writable: false })

    return event
  }

  let consoleWarnSpy: jest.SpyInstance

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
  })

  afterEach(() => {
    consoleWarnSpy.mockRestore()
  })

  it('returns a React.ChangeEvent shape with the input target', () => {
    const input = document.createElement('input')

    input.type = 'text'
    input.value = 'hello'
    const nativeEvent = makeNativeChangeEvent(input)

    const result = toReactChangeEvent<HTMLInputElement>(nativeEvent)

    expect(result.target).toBe(input)
    expect(result.target.value).toBe('hello')
  })

  it('defaults the generic to HTMLInputElement', () => {
    const input = document.createElement('input')
    const nativeEvent = makeNativeChangeEvent(input)

    // No generic supplied — defaults to HTMLInputElement.
    const result = toReactChangeEvent(nativeEvent)

    // TypeScript should infer `result.target` as HTMLInputElement.
    expect(result.target).toBe(input)
  })

  it('delegates to toReactEvent (inherits Proxy shim methods)', () => {
    const input = document.createElement('input')
    const nativeEvent = makeNativeChangeEvent(input)

    const result = toReactChangeEvent<HTMLInputElement>(nativeEvent)

    expect(result.nativeEvent).toBe(nativeEvent)
    expect(typeof result.persist).toBe('function')
    expect(result.isDefaultPrevented()).toBe(false)
  })

  it('emits a dev-warning when target is null', () => {
    const nativeEvent = makeNativeChangeEvent(null)

    toReactChangeEvent<HTMLInputElement>(nativeEvent)

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'toReactChangeEvent: event.target is not a DOM element'
      )
    )
  })

  it('does not warn when target is a valid DOM element', () => {
    const input = document.createElement('input')
    const nativeEvent = makeNativeChangeEvent(input)

    toReactChangeEvent<HTMLInputElement>(nativeEvent)

    expect(consoleWarnSpy).not.toHaveBeenCalled()
  })
})
