import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'

import Picasso from '../../Picasso'
import Button from '../../Button'
import Input from '../../Input'
import PromptModal from './../PromptModal'
import { useModals } from '../utils'

test('renders PromptModal', () => {
  const { baseElement } = render(
    <Picasso loadFonts={false}>
      <PromptModal
        open
        title='Test title'
        message='Test message'
        onSubmit={async () => {}}
      />
    </Picasso>
  )

  expect(baseElement).toMatchSnapshot()
})

test('showPrompt opens and closes modal on Submit action', async () => {
  const TestComponent = () => {
    const { showPrompt } = useModals()

    const handleClick = () => {
      showPrompt({
        title: 'Test title',
        message: 'Test message',
        onSubmit: async () => {}
      })
    }

    return <Button onClick={handleClick}>Show</Button>
  }

  const { getByText, queryByText, baseElement } = render(
    <Picasso loadFonts={false}>
      <TestComponent />
    </Picasso>
  )

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

test('showPrompt with input returns result on Submit action ', async () => {
  const mockResult = jest.fn(x => x)

  const TestComponent = () => {
    const { showPrompt } = useModals()

    const handleClick = async () => {
      showPrompt({
        title: 'Test title',
        message: 'Test message',
        onSubmit: (result: any) => {
          mockResult(result)
        },
        // eslint-disable-next-line react/display-name
        children: ({ setResult, result }) => (
          <Input
            aria-label='test-input'
            width='full'
            onChange={event => setResult(event.target.value)}
            value={result}
          />
        )
      })
    }

    return <Button onClick={handleClick}>Show</Button>
  }

  const { getByText, getByLabelText, baseElement } = render(
    <Picasso loadFonts={false}>
      <TestComponent />
    </Picasso>
  )

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
