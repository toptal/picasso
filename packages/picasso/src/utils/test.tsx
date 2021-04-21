import {
  capitalize,
  getNameInitials,
  isBoolean,
  isNumber,
  isString,
  isSubstring,
  toTitleCase,
  kebabToCamelCase,
  useCombinedRefs,
  useWidthOf,
  ReferenceObject,
  useSafeState,
  forwardRef,
  documentable,
  disableUnsupportedProps,
  isDarkMode
} from '@toptal/picasso/utils'
import { render, act } from '@toptal/picasso/test-utils'
import React, { createRef, Ref, useEffect } from 'react'
import MatchMediaMock from 'jest-matchmedia-mock'
import type MatchMedia from 'jest-matchmedia-mock'

import unsafeErrorLog from './unsafe-error-log'

jest.mock('./unsafe-error-log')

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    const string = capitalize('test string')

    expect(string).toBe('Test string')
  })
})

describe('getNameInitials', () => {
  it('should extract first letters', () => {
    expect(getNameInitials('John Doe')).toBe('JD')
  })

  it('should ignore extra spaces', () => {
    expect(getNameInitials(' John  Doe ')).toBe('JD')
  })

  it('should ignore single letter middle names', () => {
    expect(getNameInitials('John T Doe')).toBe('JD')
  })

  it('should extract up to 3 letters', () => {
    expect(getNameInitials('John Doe John Doe')).toBe('JDJ')
  })
})

describe('isDarkMode', () => {
  let matchMedia: MatchMedia

  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
  })

  it('should return true for dark mode', () => {
    const mediaQuery = '(prefers-color-scheme: dark)'

    matchMedia.useMediaQuery(mediaQuery)

    expect(isDarkMode()).toBe(true)
  })

  it('should return false for light mode', () => {
    const mediaQuery = '(prefers-color-scheme: light)'

    matchMedia.useMediaQuery(mediaQuery)

    expect(isDarkMode()).toBe(false)
  })

  it('should return false when there is no support for matchMedia', () => {
    matchMedia.clear()

    expect(isDarkMode()).toBe(false)
  })
})

describe('isBoolean', () => {
  it('should return true for booleans', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('should return false for other types', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('1')).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
  })
})

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(1)).toBe(true)
  })

  it('should return false for other types', () => {
    expect(isNumber(true)).toBe(false)
    expect(isNumber('1')).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
  })
})

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('')).toBe(true)
    expect(isString('1')).toBe(true)
  })

  it('should return false for other types', () => {
    expect(isString(true)).toBe(false)
    expect(isString(1)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
  })
})

describe('toTitleCase', () => {
  it('should convert strings', () => {
    expect(toTitleCase('ab bc')).toBe('Ab Bc')
  })

  it('should ignore react nodes', () => {
    const node = <div>ab bc</div>

    expect(toTitleCase(node)).toBe(node)
  })
})

describe('isSubstring', () => {
  it('should check if a string contains another ignoring case', () => {
    expect(isSubstring('TEST', 'a test string')).toBe(true)
    expect(isSubstring('test', 'a test string')).toBe(true)
    expect(isSubstring('test word', 'a test string')).toBe(false)
  })
})

describe('kebabToCamelCase', () => {
  it('should convert kebab to camel case', () => {
    expect(kebabToCamelCase('a-test-string')).toBe('aTestString')
  })
})

const TestUseCombinedRefs = ({ refs }: { refs: Ref<HTMLDivElement>[] }) => {
  return <div ref={useCombinedRefs(...refs)} />
}

describe('useCombinedRefs', () => {
  it('should combine object and function refs', async () => {
    const refObject = createRef<HTMLDivElement>()
    const refFunction = jest.fn()

    render(<TestUseCombinedRefs refs={[refObject, refFunction]} />)

    expect(refObject.current).toBeDefined()
    expect(refFunction.mock.calls[0][0]).toBeDefined()
  })
})

const TestForwardRef = documentable(
  forwardRef(
    <T extends string>(
      { item }: { ref: Ref<HTMLDivElement>; item: T },
      ref: Ref<HTMLDivElement>
    ) => {
      return <div ref={ref}>{item}</div>
    }
  )
)

describe('forwardRef', () => {
  it('should forward a ref with generic component', () => {
    const ref = createRef<HTMLDivElement>()

    render(<TestForwardRef ref={ref} item='item' />)

    expect(ref.current).toBeDefined()
    expect(ref.current?.tagName).toBe('DIV')
  })
})

const TestUseSafeState = () => {
  const [state, setState] = useSafeState('initial')

  useEffect(() => {
    setTimeout(() => setState('changed'), 100)
  }, [setState])

  return <div>{state}</div>
}

describe('useSafeState', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should use initial state', () => {
    const { queryByText } = render(<TestUseSafeState />)

    expect(queryByText('initial')).toBeInTheDocument()
  })

  it('should set state in an async effect', () => {
    const { queryByText } = render(<TestUseSafeState />)

    act(() => {
      jest.runAllTimers()
    })

    expect(queryByText('changed')).toBeInTheDocument()
  })

  it('should not throw when state is set after unmounting', () => {
    const { unmount } = render(<TestUseSafeState />)

    unmount()

    expect(() =>
      act(() => {
        jest.runAllTimers()
      })
    ).not.toThrow()
  })
})

const TestUseWidthOf = ({ element }: { element: ReferenceObject }) => {
  const width = useWidthOf(element)

  return <div>{width}</div>
}

describe('useWidthOf', () => {
  it('should measure width of passed element', () => {
    const rect = {
      top: 10,
      left: 10,
      right: 110,
      bottom: 30,
      width: 100,
      height: 20
    }
    const element = {
      getBoundingClientRect: () => rect
    }

    const { queryByText } = render(<TestUseWidthOf element={element} />)
    const message = queryByText('100px')

    expect(message).toBeInTheDocument()
  })
})

const TestDisableUnsupportedProps = (props: {
  type: string
  max?: number | string
}) => {
  const { type, max } = disableUnsupportedProps(
    'TestDisableUnsupportedProps',
    props,
    {
      featureProps: {
        type: 'text'
      },
      unsupportedProps: {
        max: ''
      }
    }
  )

  return <input type={type} max={max} />
}

describe('disableUnsupportedProps', () => {
  it('should render with supported props', () => {
    const { getByRole } = render(
      <TestDisableUnsupportedProps type='number' max={2} />
    )
    const input = getByRole('spinbutton')

    expect(input).toHaveProperty('type', 'number')
    expect(input).toHaveProperty('max', '2')
    expect(unsafeErrorLog).not.toHaveBeenCalled()
  })

  it('should override unsupported props and warn the developer', () => {
    const { getByRole } = render(
      <TestDisableUnsupportedProps type='text' max={2} />
    )
    const input = getByRole('textbox')

    expect(input).toHaveProperty('type', 'text')
    expect(input).toHaveProperty('max', '')
    expect(unsafeErrorLog).toHaveBeenCalledWith(
      'TestDisableUnsupportedProps doesn\'t support: max props when used with {"type":"text"}'
    )
  })
})
