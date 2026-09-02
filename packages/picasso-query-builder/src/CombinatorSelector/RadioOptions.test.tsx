import React from 'react'
import { Radio } from '@toptal/picasso-radio'
import { render, renderedProps } from '@toptal/picasso-test-utils'
import type { OptionGroup, Option } from 'react-querybuilder'

import { RadioOptions } from './RadioOptions'

jest.mock('@toptal/picasso-radio', () => ({
  ...jest.requireActual('@toptal/picasso-radio'),
  Radio: Object.assign(jest.fn(), {
    Group: jest.fn(),
  }),
}))

const options: Option[] = [
  {
    name: 'and',
    label: 'AND',
  },
  {
    name: 'or',
    label: 'OR',
  },
]

const optionGroups: OptionGroup[] = [
  {
    label: 'logic',
    options: options,
  },
]

const RadioMock = Radio as unknown as jest.Mock
const RadioGroup = Radio.Group as unknown as jest.Mock

describe('RadioOptions', () => {
  beforeEach(() => {
    RadioMock.mockReturnValue(null)
    RadioGroup.mockImplementation(({ children }) => children)
  })

  describe('when options are an optionGroupArray', () => {
    it('renders radio with correct properties', () => {
      render(<>{RadioOptions({ options: optionGroups })}</>)

      expect(renderedProps(RadioMock)[0]).toEqual(
        expect.objectContaining({
          value: 'and',
          label: 'AND',
        })
      )

      expect(renderedProps(RadioMock)[1]).toEqual(
        expect.objectContaining({
          value: 'or',
          label: 'OR',
        })
      )
    })
  })

  describe('when options are not an optionGroupArray', () => {
    it('renders radio with correct properties', () => {
      render(<>{RadioOptions({ options })}</>)

      expect(renderedProps(RadioMock)[0]).toEqual(
        expect.objectContaining({
          value: 'and',
          label: 'AND',
        })
      )

      expect(renderedProps(RadioMock)[1]).toEqual(
        expect.objectContaining({
          value: 'or',
          label: 'OR',
        })
      )
    })
  })
})
