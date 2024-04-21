import React, { Fragment } from 'react'
import type { ComponentProps } from 'react'
import { Container } from '@toptal/picasso-container'
import { List } from '@toptal/picasso-list'
import { render } from '@toptal/picasso-test-utils'

import { ValidationErrors } from './'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Fragment: jest.fn(),
}))

jest.mock('@toptal/picasso-container', () => ({
  Container: jest.fn(),
}))
jest.mock('@toptal/picasso-list', () => ({
  List: (() => {
    const mock: jest.Mock & {
      Item?: jest.Mock
    } = jest.fn()

    mock.Item = jest.fn()

    return mock
  })(),
}))
jest.mock('@toptal/picasso-typography', () => ({
  Typography: jest.fn(),
}))

const ContainerMock = Container as jest.Mock
const ListMock = List as unknown as jest.Mock
const ListItemMock = List.Item as unknown as jest.Mock
const FragmentMock = Fragment as unknown as jest.Mock

const invalidResult = {
  rule1: {
    valid: false,
    reasons: [
      {
        message: 'reason1',
        valid: false,
      },
      'reason2',
      undefined,
    ],
  },
}

const validResult = {
  rule1: {
    valid: true,
  },
  rule2: {
    valid: true,
  },
}

const renderComponent = ({
  validationResult,
}: ComponentProps<typeof ValidationErrors>) =>
  render(<ValidationErrors validationResult={validationResult} />)

describe('ValidationErrors', () => {
  beforeEach(() => {
    ContainerMock.mockImplementation(({ children }) => children)
    ListMock.mockImplementation(({ children }) => children)
    ListItemMock.mockReturnValue(null)
    FragmentMock.mockImplementation(({ children }) => children)
  })

  describe('when called with a valid result', () => {
    it('renders nothing', () => {
      renderComponent({
        validationResult: validResult,
      })

      expect(ContainerMock).not.toHaveBeenCalled()
    })
  })

  describe('when called with an invalid validationResult', () => {
    it('renders the validation errors', () => {
      renderComponent({
        validationResult: invalidResult,
      })

      expect(ContainerMock).toHaveBeenCalledTimes(1)
      expect(ListMock).toHaveBeenCalledTimes(1)

      expect(ListItemMock).toHaveBeenCalledTimes(2)
      expect(ListItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'reason1',
        }),
        {}
      )
      expect(ListItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'reason2',
        }),
        {}
      )
    })
  })
})
