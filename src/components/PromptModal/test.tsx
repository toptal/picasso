import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/react/cleanup-after-each'

import Picasso from '../Picasso'
import Button from '../Button'
import PromptModal from './PromptModal'
import { useModals } from '../utils'

test('renders PromptModal', () => {
  const { baseElement } = render(
    <Picasso loadFonts={false}>
      <PromptModal
        open
        title='Test title'
        message='Test message'
        onSubmit={() => {}}
      />
    </Picasso>
  )

  expect(baseElement).toMatchSnapshot()
})

test('showPrompt opens and closes modal', () => {
  const TestComponent = () => {
    const { showPrompt } = useModals()

    const handleClick = () => {
      showPrompt('Test title', 'Test message')
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

  expect(queryByText('Modal content')).toBeFalsy()
  expect(baseElement).toMatchSnapshot()
})
