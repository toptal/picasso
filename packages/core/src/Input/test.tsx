import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SearchIcon from '@material-ui/icons/Search'
import Picasso from '@toptal/picasso-shared'

import Input from './Input'

afterEach(cleanup)

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
