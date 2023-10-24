import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'
import type { ComponentProps } from 'react'

import { AddGroupButton } from './AddGroupButton'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn(),
}))

const ButtonMock = Button as unknown as jest.Mock

const renderComponent = ({
  context = {
    maxDepth: 0,
  },
  level = 0,
  path = [0],
  handleOnClick = jest.fn(),
  ruleOrGroup = {
    rules: [
      {
        field: 'firstName',
        operator: '=',
        value: '',
        id: 'af499947-e46a-4a26-945b-511765901cdb',
      },
    ],
    combinator: 'and',
    id: '15420a95-2075-401b-b51b-e68929717bc6',
  },
  ...props
}: Partial<ComponentProps<typeof AddGroupButton>>) => {
  render(
    <AddGroupButton
      ruleOrGroup={ruleOrGroup}
      handleOnClick={handleOnClick}
      context={context}
      path={path}
      level={level}
      {...props}
    />
  )
}

describe('AddGroupButton', () => {
  beforeEach(() => {
    ButtonMock.mockReturnValue(null)
  })

  describe('when the current level is greater than the maxDepth', () => {
    it('does not render the add group button', () => {
      renderComponent({
        context: {
          maxDepth: 0,
        },
        level: 1,
      })

      expect(ButtonMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when the current level is equal to the maxDepth', () => {
    it('does not render the add group button', () => {
      renderComponent({
        context: {
          maxDepth: 0,
        },
        level: 0,
      })

      expect(ButtonMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when the current level is less than the maxDepth', () => {
    it('renders the add group button', () => {
      renderComponent({
        context: {
          maxDepth: 1,
        },
        level: 0,
      })

      expect(ButtonMock).toHaveBeenCalledTimes(1)
    })
  })
})
