import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Input from './Input'
import Search16 from '../Icon/Search16'

it('renders icon in the end', () => {
  const { container } = render(<Input icon={<Search16 />} />)

  expect(container).toMatchSnapshot()
})

it('renders icon in the beginning', () => {
  const { container } = render(
    <Input icon={<Search16 />} iconPosition='start' />
  )

  expect(container).toMatchSnapshot()
})

it('shows counter for regular input', () => {
  const { container } = render(<Input limit={10} />)

  expect(container).toMatchSnapshot()
})

it('shows counter for multiline input', () => {
  const { container } = render(<Input multiline rows={4} limit={10} />)

  expect(container).toMatchSnapshot()
})

it('shows remaining chars for for multiline input with limit', () => {
  const { getByTestId } = render(<Input multiline limit={1} value='A' />)

  expect(getByTestId('limit-adornment-multiline-label')).toMatchSnapshot()
})

it('shows excess chars for multiline input with exceeded limit', () => {
  const { getByTestId } = render(<Input multiline limit={1} value='AB' />)

  expect(getByTestId('limit-adornment-multiline-label')).toMatchSnapshot()
})

it('shows entered characters for multiline input with `counter: entered`, ignoring the limit', () => {
  const { getByTestId } = render(
    <Input multiline counter='entered' limit={1} value='AB' />
  )

  const inputText = getByTestId('limit-adornment-multiline-label').textContent

  expect(inputText).toContain('2 characters entered')
  expect(inputText).not.toContain('limit')
})

it('is focused when autoFocus', () => {
  const { getByPlaceholderText } = render(
    <Input autoFocus placeholder='test input' />
  )

  const input = getByPlaceholderText('test input')

  expect(document.activeElement).toEqual(input)
})

it('should show reset button', () => {
  const { container } = render(<Input enableReset value='Some value' />)

  expect(container).toMatchSnapshot()
})

it('should show manual resize handler', () => {
  const { container } = render(
    <Input multiline multilineResizable rows={4} value='Some value' />
  )

  expect(container).toMatchSnapshot()
})
