import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'

import { useEnforceHighlightAutofill } from './use-enforce-highlight-autofill'
import { useFormConfig } from '../../FormConfig'

jest.mock('../../FormConfig', () => ({
  useFormConfig: jest.fn(),
}))

const mockedUseFormConfig = useFormConfig as jest.MockedFunction<
  typeof useFormConfig
>

const TestComponent = () => {
  const { enforceHighlightAutofill, registerChangeOrFocus } =
    useEnforceHighlightAutofill()

  return (
    <>
      <button onClick={registerChangeOrFocus}>trigger</button>
      <div data-testid='enforce-highlight-autofill-status'>
        {enforceHighlightAutofill ? 'true' : 'false'}
      </div>
    </>
  )
}

describe('useEnforceHighlightAutofill', () => {
  describe('when form does not highlight autofilled fields', () => {
    it('does not enforce highlighting', () => {
      mockedUseFormConfig.mockReturnValue({ highlightAutofill: false })
      const { getByText, getByTestId } = render(<TestComponent />)
      const button = getByText('trigger')
      const autofillStatusContainer = getByTestId(
        'enforce-highlight-autofill-status'
      )

      fireEvent.click(button)

      // After first update
      expect(autofillStatusContainer).toHaveTextContent('false')
    })
  })

  describe('when form highlights autofilled fields', () => {
    it('highlighting is enforced after first update and not enforced after following updates', async () => {
      mockedUseFormConfig.mockReturnValue({ highlightAutofill: true })
      const { getByText, getByTestId } = render(<TestComponent />)

      const button = getByText('trigger')
      const autofillStatusContainer = getByTestId(
        'enforce-highlight-autofill-status'
      )

      fireEvent.click(button)

      // After first update
      expect(autofillStatusContainer).toHaveTextContent('true')

      fireEvent.click(button)

      // After second update
      expect(autofillStatusContainer).toHaveTextContent('false')
    })
  })
})
