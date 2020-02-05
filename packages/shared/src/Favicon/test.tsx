import React from 'react'
import { render, waitForDomChange } from '@testing-library/react'

import Picasso from '../Picasso'
import Favicon from './Favicon'

test('default render', async () => {
  render(
    <Picasso loadFonts={false} loadFavicon={false}>
      <Favicon />
    </Picasso>
  )

  await waitForDomChange()

  expect(document.querySelectorAll('head > link')).toMatchSnapshot()
})

test('with environment specified', async () => {
  render(
    <Picasso loadFonts={false} loadFavicon={false}>
      <Favicon environment='staging' />
    </Picasso>
  )

  await waitForDomChange()

  expect(document.querySelectorAll('head > link')).toMatchSnapshot()
})
