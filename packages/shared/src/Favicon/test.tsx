import React from 'react'
import { render, waitForDomChange } from '@toptal/picasso/test-utils'

import Favicon from './Favicon'

test('default render', async () => {
  render(<Favicon />)

  await waitForDomChange()

  expect(document.querySelectorAll('head > link')).toMatchSnapshot()
})

test('with environment specified', async () => {
  render(<Favicon environment='staging' />)

  await waitForDomChange()

  expect(document.querySelectorAll('head > link')).toMatchSnapshot()
})
