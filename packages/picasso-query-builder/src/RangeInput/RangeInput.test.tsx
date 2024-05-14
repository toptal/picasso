import React from 'react'
import { Container } from '@toptal/picasso-container'
import { NumberInput } from '@toptal/picasso-number-input'
import { Typography } from '@toptal/picasso-typography'
import { render } from '@toptal/picasso-test-utils'
import type { ComponentProps } from 'react'

import { RangeInput } from './'

jest.mock('@toptal/picasso-container', () => ({
  Container: jest.fn(),
}))
jest.mock('@toptal/picasso-number-input', () => ({
  NumberInput: jest.fn(),
}))
jest.mock('@toptal/picasso-typography', () => ({
  Typography: jest.fn(),
}))

const ContainerMock = Container as jest.Mock
const NumberInputMock = NumberInput as unknown as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock

const renderComponent = (
  props: Omit<ComponentProps<typeof RangeInput>, 'handleOnChange'>
) => render(<RangeInput handleOnChange={jest.fn()} {...props} />)

describe('RangeInput', () => {
  beforeEach(() => {
    ContainerMock.mockImplementation(({ children }) => children)
    TypographyMock.mockReturnValue(null)
    NumberInputMock.mockReturnValue(null)
  })

  describe('when `value` is set', () => {
    it('displays the `from` and `to` values', () => {
      renderComponent({
        value: {
          from: 0,
          to: 100,
        },
        min: 0,
        max: 1000,
      })

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 0,
        }),
        {}
      )

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 100,
        }),
        {}
      )
    })
  })

  describe('when `from` value is invalid', () => {
    it('renders `from` input with an error status', () => {
      renderComponent({
        value: {
          from: 0,
          to: 100,
        },
        min: 12,
        max: 100,
        validation: {
          reasons: ['Invalid from value', undefined],
          valid: false,
        },
      })

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
        }),
        {}
      )

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'default',
        }),
        {}
      )
    })
  })

  describe('when `to` value is invalid', () => {
    it('renders `to` input with an error status', () => {
      renderComponent({
        value: {
          from: 12,
          to: 100,
        },
        min: 0,
        max: 10,
        validation: { reasons: [undefined, 'Invalid to value'], valid: false },
      })

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'default',
        }),
        {}
      )

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
        }),
        {}
      )
    })
  })

  describe('when `from` and `to` values are invalid', () => {
    it('renders `from` and `to` inputs with an error status', () => {
      renderComponent({
        value: {
          from: 12,
          to: 100,
        },
        min: 0,
        max: 10,
        validation: {
          reasons: ['Invalid to value', 'Invalid from value'],
          valid: false,
        },
      })

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
        }),
        {}
      )

      expect(NumberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'error',
        }),
        {}
      )
    })
  })
})
