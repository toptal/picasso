import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import type { Props } from './InputLimitAdornment'
import InputLimitAdornment from './InputLimitAdornment'

const renderAdornment = (props: Props) =>
  render(<InputLimitAdornment {...props} />)

describe('InputLimitAdornment', () => {
  describe("when counter type is 'entered'", () => {
    it.each([
      { charsLength: 1, expectedMessage: '1 character entered' },
      { charsLength: 2, expectedMessage: '2 characters entered' },
    ])(
      "expect '$expectedMessage' message for $charsLength characters",
      ({ charsLength, expectedMessage }) => {
        const { getByTestId } = renderAdornment({
          counter: 'entered',
          limit: 0,
          multiline: true,
          charsLength,
          testIds: { message: 'message' },
        })

        const limitText = getByTestId('message').textContent

        expect(limitText).toBe(expectedMessage)
      }
    )
  })

  describe("when counter type is 'remaining'", () => {
    it.each([
      { remainingChars: 0, expectedMessage: '0 characters left' },
      { remainingChars: 1, expectedMessage: '1 character left' },
      { remainingChars: 2, expectedMessage: '2 characters left' },
    ])(
      "expect '$expectedMessage' message for $remainingChars characters",
      ({ remainingChars, expectedMessage }) => {
        const { getByTestId } = renderAdornment({
          counter: 'remaining',
          limit: 3,
          multiline: true,
          charsLength: 3 - remainingChars,
          testIds: { message: 'message' },
        })

        const limitText = getByTestId('message').textContent

        expect(limitText).toBe(expectedMessage)
      }
    )
  })
})
