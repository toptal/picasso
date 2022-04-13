import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@toptal/picasso/test-utils'

import Button from '../Button'
import Input from '../Input'
import PromptModal from '../PromptModal'
import { useModal } from '../utils'

describe('PromptModal', () => {
  const spy = jest.spyOn(global.console, 'error')

  afterEach(() => {
    spy.mockClear()
  })

  it('renders', () => {
    const { baseElement } = render(
      <PromptModal
        open
        title='Test title'
        message='Test message'
        onSubmit={async () => {}}
      />
    )

    expect(baseElement).toMatchSnapshot()
  })

  it('showPrompt opens and closes modal on Submit action', async () => {
    const TestComponent = () => {
      const { showModal, hideModal, isOpen } = useModal()

      return (
        <>
          <Button onClick={showModal}>Show</Button>
          <PromptModal
            open={isOpen}
            title='Test title'
            message='Test message'
            onSubmit={hideModal}
          />
        </>
      )
    }

    const { getByText, queryByText, baseElement } = render(<TestComponent />)

    const showModal = getByText('Show')

    expect(queryByText('Test title')).toBeFalsy()
    expect(baseElement).toMatchSnapshot()

    fireEvent.click(showModal)

    expect(queryByText('Test title')).toBeTruthy()
    expect(baseElement).toMatchSnapshot()

    const submitModal = getByText('Submit')

    fireEvent.click(submitModal)

    await waitForElementToBeRemoved(submitModal)

    expect(baseElement).toMatchSnapshot()
  })

  const identity = <T extends unknown>(value: T) => value

  it('showPrompt with input returns result on Submit action', async () => {
    const mockResult = jest.fn(identity)

    const TestComponent = () => {
      const { showModal, hideModal, isOpen } = useModal()

      return (
        <>
          <Button onClick={showModal}>Show</Button>
          <PromptModal
            open={isOpen}
            title='Test title'
            message='Test message'
            onSubmit={result => {
              mockResult(result)
            }}
            onClose={hideModal}
          >
            {({ setResult, result }) => (
              <Input
                aria-label='test-input'
                width='full'
                onChange={event => setResult(event.target.value)}
                value={String(result)}
              />
            )}
          </PromptModal>
        </>
      )
    }

    const { getByText, getByLabelText, baseElement } = render(<TestComponent />)

    const expectedResult = '42'

    const showModal = getByText('Show')

    fireEvent.click(showModal)

    const input = getByLabelText('test-input')

    fireEvent.change(input, { target: { value: expectedResult } })

    const submitModal = getByText('Submit')

    fireEvent.click(submitModal)

    await waitFor(() => {
      expect(mockResult.mock.results[0].value).toBe(expectedResult)
    })
    await waitForElementToBeRemoved(submitModal)
    expect(baseElement).toMatchSnapshot()
  })

  it('when unmounted while performing submit, should not do further state updates', async () => {
    const TestComponent = () => {
      const [isSubmitCompleted, setIsSubmitCompleted] = React.useState(false)
      const [shouldRenderPrompt, setShouldRenderPrompt] = React.useState(true)
      const { showModal, hideModal, isOpen } = useModal()

      return (
        <>
          <Button onClick={showModal}>Show</Button>
          <Button onClick={() => setShouldRenderPrompt(false)}>Unmount</Button>

          {isSubmitCompleted && 'Submitted'}
          {shouldRenderPrompt && (
            <PromptModal
              open={isOpen}
              title='Test title'
              message='Test message'
              onSubmit={hideModal}
              onAfterSubmit={() => setIsSubmitCompleted(true)}
            />
          )}
        </>
      )
    }

    const { getByText, queryByText } = render(<TestComponent />)

    // Open modal
    const showModal = getByText('Show')

    fireEvent.click(showModal)

    // Submit modal
    const submitModal = getByText('Submit')

    fireEvent.click(submitModal)

    // Unmount modal while submitting
    const unmount = getByText('Unmount')

    fireEvent.click(unmount)

    // Wait until submitting is done
    await waitFor(() => {
      expect(queryByText('Submitted')).toBeInTheDocument()
    })

    // Ensure React has not logged "Can't perform a React state update on an unmounted component"
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining(
        "Can't perform a React state update on an unmounted component"
      ),
      expect.anything(),
      expect.anything()
    )
  })
})
