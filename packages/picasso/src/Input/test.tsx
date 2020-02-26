import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import SearchIcon from '@material-ui/icons/Search'

import Input from './Input'

test('renders icon at the end', () => {
  const { container } = render(<Input icon={<SearchIcon />} />)

  expect(container).toMatchSnapshot()
})

test('renders icon at the beginning', () => {
  const { container } = render(
    <Input icon={<SearchIcon />} iconPosition='start' />
  )

  expect(container).toMatchSnapshot()
})

test('shows counter for regular input', () => {
  const { container } = render(<Input limit={10} />)

  expect(container).toMatchSnapshot()
})

test('shows counter for multiline input', () => {
  const { container } = render(<Input multiline rows={4} limit={10} />)

  expect(container).toMatchSnapshot()
})

test('is focused when autoFocus', () => {
  const { getByPlaceholderText } = render(
    <Input autoFocus placeholder='test input' />
  )

  const input = getByPlaceholderText('test input')

  expect(document.activeElement).toEqual(input)
})

test('should show reset button', () => {
  const { container } = render(<Input enableReset value='Some value' />)

  expect(container).toMatchSnapshot()
})

test('should show manual resize handler', () => {
  const { container } = render(
    <Input multiline multilineResizable rows={4} value='Some value' />
  )

  expect(container).toMatchSnapshot()
})
