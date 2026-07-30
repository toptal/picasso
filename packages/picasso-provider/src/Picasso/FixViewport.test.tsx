import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'

import FixViewport from './FixViewport'

const renderFixViewport = (responsive?: boolean) =>
  render(
    <HelmetProvider>
      <FixViewport responsive={responsive} />
    </HelmetProvider>
  )

const getViewportContent = () =>
  document
    .querySelector('meta[name="viewport"][data-picasso="true"]')
    ?.getAttribute('content')

describe('FixViewport', () => {
  afterEach(() => {
    document
      .querySelectorAll('meta[name="viewport"]')
      .forEach(tag => tag.remove())
  })

  it('follows the device width by default', async () => {
    renderFixViewport()

    await waitFor(() => {
      expect(getViewportContent()).toBe('width=device-width, user-scalable=no')
    })
  })

  describe('when the app is not responsive', () => {
    it('pins the layout viewport to the md breakpoint', async () => {
      renderFixViewport(false)

      await waitFor(() => {
        expect(getViewportContent()).toBe('width=768')
      })
    })

    it('leaves zoom enabled', async () => {
      renderFixViewport(false)

      await waitFor(() => {
        expect(getViewportContent()).toBeTruthy()
      })

      expect(getViewportContent()).not.toContain('user-scalable=no')
    })
  })
})
