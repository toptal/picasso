import React from 'react'
import { render } from '@testing-library/react'
import SearchIcon from '@material-ui/icons/Search'
import Picasso from '@toptal/picasso-shared'

import Input from './Input'

test('renders icon at the end', () => {
  const { container } = render(
    <Picasso loadFonts={false}>
      <Input icon={<SearchIcon />} />
    </Picasso>
  )

  expect(container).toMatchSnapshot()
})

test('renders icon at the beginning', () => {
  const { container } = render(
    <Picasso loadFonts={false}>
      <Input icon={<SearchIcon />} iconPosition='start' />
    </Picasso>
  )

  expect(container).toMatchSnapshot()
})

test('shows counter for regular input', () => {
  const { container } = render(
    <Picasso loadFonts={false}>
      <Input limit={10} />
    </Picasso>
  )

  expect(container).toMatchSnapshot()
})

test('shows counter for multiline input', () => {
  const { container } = render(
    <Picasso loadFonts={false}>
      <Input multiline rows={4} limit={10} />
    </Picasso>
  )

  expect(container).toMatchSnapshot()
})

test('is focused when autoFocus', () => {
  const { getByPlaceholderText } = render(
    <Picasso loadFonts={false}>
      <Input autoFocus placeholder='test input' />
    </Picasso>
  )

  const input = getByPlaceholderText('test input')

  expect(document.activeElement).toEqual(input)
})

test('should show reset button', () => {
  const { container } = render(
    <Picasso loadFonts={false}>
      <Input allowReset value='Some value' />
    </Picasso>
  )

  expect(container).toMatchSnapshot()
})
