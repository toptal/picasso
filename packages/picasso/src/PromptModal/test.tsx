import React from 'react'
import { render, fireEvent, wait } from '@toptal/picasso/test-utils'

import Button from '../Button'
import Input from '../Input'
import PromptModal from '../PromptModal'
import { useModal } from '../utils'

test('renders PromptModal', () => {
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

test('showPrompt opens and closes modal on Submit action', async () => {
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

  await wait(() => {
    expect(queryByText('Modal content')).toBeFalsy()
  })

  expect(baseElement).toMatchSnapshot()
})

const identity = <T extends unknown>(value: T) => value

test('showPrompt with input returns result on Submit action ', async () => {
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

  await wait(() => {
    expect(mockResult.mock.results[0].value).toBe(expectedResult)
  })

  expect(baseElement).toMatchSnapshot()
})

test('When PromptModal unmounted while performing submit, further state updates are short-circuited', async () => {
  global.console = { ...global.console, error: jest.fn() }

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
  await wait(() => {
    expect(queryByText('Submitted')).toBeInTheDocument()
  })

  // Ensure React has not logged "Can't perform a React state update on an unmounted component"
  expect(console.error).toBeCalledTimes(0)
})
