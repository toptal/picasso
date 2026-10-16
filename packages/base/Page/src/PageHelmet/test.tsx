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

  it('gives the title the attributes of a `<title>` child', async () => {
    render(
      <PageHelmet>
        <title lang='hr'>Poslovi</title>
      </PageHelmet>
    )

    await waitFor(() => {
      expect(document.head.querySelector('title')).toHaveAttribute('lang', 'hr')
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

    it('falls back to the `defaultTitle` for an empty title', async () => {
      render(
        <>
          <PageHelmet titleTemplate='%s | Toptal' defaultTitle='Toptal' />
          <PageHelmet title='' />
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Toptal')
      })
    })

    it('keeps `$` sequences in a title as they are', async () => {
      render(
        <>
          <PageHelmet titleTemplate='%s | Toptal' />
          <PageHelmet title='Rates $$ and $&' />
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Rates $$ and $& | Toptal')
      })
    })

    // A page's `title={job?.name}` while the job loads, for example
    it.each([
      ['title', <PageHelmet title={undefined} />, 'Toptal'],
      [
        'titleTemplate',
        <PageHelmet title='Jobs' titleTemplate={undefined} />,
        'Jobs',
      ],
    ])(
      "lets an inner helmet's `%s={undefined}` hide the outer one",
      async (_, innerHelmet, expectedTitle) => {
        render(
          <>
            <PageHelmet
              title='Dashboard'
              titleTemplate='%s | Toptal'
              defaultTitle='Toptal'
            />
            {innerHelmet}
          </>
        )

        await waitFor(() => {
          expect(document.title).toBe(expectedTitle)
        })
      }
    )

    it('takes a `<title>` child over the `title` prop', async () => {
      render(
        <>
          <PageHelmet titleTemplate='%s | Toptal' />
          <PageHelmet title='Fallback'>
            <title>Jobs</title>
          </PageHelmet>
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Jobs | Toptal')
      })
    })

    it('reads a `<title>` inside a fragment', async () => {
      render(
        <>
          <PageHelmet titleTemplate='%s | Toptal' />
          <PageHelmet>
            <>
              <title>Jobs</title>
              <meta name='description' content='Open jobs' />
            </>
          </PageHelmet>
        </>
      )

      await waitFor(() => {
        expect(document.title).toBe('Jobs | Toptal')
      })
    })
  })
})
