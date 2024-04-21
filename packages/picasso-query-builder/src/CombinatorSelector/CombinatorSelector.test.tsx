import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { ComponentProps } from 'react'
import { Typography } from '@toptal/picasso-typography'

import { CombinatorSelector } from './CombinatorSelector'

jest.mock('@toptal/picasso-typography', () => ({
  ...jest.requireActual('@toptal/picasso-typography'),
  Typography: jest.fn(),
}))

const TypographyMock = Typography as unknown as jest.Mock

const renderComponent = ({
  level = 0,
  handleOnChange = jest.fn(),
  options = [
    {
      name: 'and',
      label: 'AND',
    },
    {
      name: 'or',
      label: 'OR',
    },
  ],
  path = [0],
  ...props
}: Partial<ComponentProps<typeof CombinatorSelector>>) => {
  render(
    <CombinatorSelector
      options={options}
      path={path}
      level={level}
      handleOnChange={handleOnChange}
      {...props}
    />
  )
}

describe('CombinatorSelector', () => {
  beforeEach(() => {
    TypographyMock.mockReturnValue(null)
  })

  describe('when current combinator is on the first level', () => {
    it('renders a "Query" text', () => {
      renderComponent({
        level: 0,
      })

      expect(TypographyMock).toHaveBeenCalledTimes(1)
      expect(TypographyMock).toHaveBeenCalledWith(
        expect.objectContaining({ children: 'Query' }),
        {}
      )
    })
  })

  describe('when current combinator is not on the first level', () => {
    it('does not render a "Query" text', () => {
      renderComponent({
        level: 1,
      })

      expect(TypographyMock).toHaveBeenCalledTimes(0)
      expect(TypographyMock).not.toHaveBeenCalledWith(
        expect.objectContaining({ children: 'Query' }),
        {}
      )
    })
  })
})
