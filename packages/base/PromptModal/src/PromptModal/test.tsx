import React from 'react'
import { render, fireEvent, waitFor } from '@toptal/picasso-test-utils'
import { Button } from '@toptal/picasso-button'
import { useModal, noop } from '@toptal/picasso-utils'

import { PromptModal } from '../PromptModal'

describe('PromptModal', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(noop)
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

    await waitFor(() => {
      expect(queryByText('Test title')).toBeFalsy()
    })

    expect(baseElement).toMatchSnapshot()
  })

  it('showPrompt with input returns result on Submit action', async () => {
    const mockResult = jest.fn()

    const TestComponent = () => {
      const { showModal, hideModal, isOpen } = useModal()

      return (
        <>
          <Button onClick={showModal}>Show</Button>
          <PromptModal
            open={isOpen}
            title='Test title'
            message='Test message'
            onSubmit={async value => {
              mockResult(value)
              hideModal()

              return value
            }}
            onClose={hideModal}
          />
        </>
      )
    }

    const { getByText, queryByText, baseElement } = render(<TestComponent />)

    const showModal = getByText('Show')

    fireEvent.click(showModal)

    const submitModal = getByText('Submit')

    fireEvent.click(submitModal)

    await waitFor(
      () => {
        expect(queryByText('Test title')).toBeFalsy()
      },
      { timeout: 3000 }
    )

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
