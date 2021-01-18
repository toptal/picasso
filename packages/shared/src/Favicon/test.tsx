import React from 'react'
import { render, waitForDomChange } from '@toptal/picasso/test-utils'

import Favicon from './Favicon'

it('default render', async () => {
  render(<Favicon />)

  await waitForDomChange()

  expect(document.querySelectorAll('head > link')).toMatchSnapshot()
})

it('with environment specified', async () => {
  render(<Favicon environment='staging' />)

  await waitForDomChange()

  expect(document.querySelectorAll('head > link')).toMatchSnapshot()
})

it('with test environment renders nothing', async () => {
  const { container } = render(<Favicon environment='test' />)
  const picassoRoot = container.firstChild as Element

  expect(picassoRoot.children).toHaveLength(0)
})
