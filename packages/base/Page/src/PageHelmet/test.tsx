import React from 'react'
import { cleanup, render, waitFor } from '@toptal/picasso-test-utils'

import { PageHelmet } from './PageHelmet'

const renderPageHelmet = (title: string) =>
  render(
    <PageHelmet>
      <title>{title}</title>
    </PageHelmet>
  )

describe('PageHelmet', () => {
  afterEach(() => {
    cleanup()
    // Setting `document.title` would add a `<title>` of its own, which then
    // precedes the one React 19 hoists in the next test
    document.head.querySelectorAll('title').forEach(title => title.remove())
  })

  it('sets the document title through the Picasso provider', async () => {
    renderPageHelmet('Dashboard')

    await waitFor(() => {
      expect(document.title).toBe('Dashboard')
    })
  })

  // React 17 and 18 merge through react-helmet-async's provider, React 19
  // through Page.Helmet itself
  describe('across helmets', () => {
    it("formats a page's title with the layout's `titleTemplate`", async () => {
      render(
        <>
          <PageHelmet titleTemplate='%s | Toptal' defaultTitle='Toptal' />
          <PageHelmet title='Overview' />
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Overview | Toptal')
      })
    })

    it('falls back to the `defaultTitle` while no helmet sets a title', async () => {
      render(<PageHelmet titleTemplate='%s | Toptal' defaultTitle='Toptal' />)

      await waitFor(() => {
        expect(document.title).toBe('Toptal')
      })
    })

    it('takes the innermost title, and the previous one once that unmounts', async () => {
      const { rerender } = render(
        <>
          <PageHelmet titleTemplate='%s | Toptal' />
          <PageHelmet title='Jobs' />
          <PageHelmet>
            <title>Job details</title>
          </PageHelmet>
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Job details | Toptal')
      })

      rerender(
        <>
          <PageHelmet titleTemplate='%s | Toptal' />
          <PageHelmet title='Jobs' />
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Jobs | Toptal')
      })
    })
  })
})
