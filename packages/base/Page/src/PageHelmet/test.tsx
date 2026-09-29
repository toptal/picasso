import React from 'react'
import { render, waitFor } from '@toptal/picasso-test-utils'

import { PageHelmet } from './PageHelmet'

const renderPageHelmet = (title: string) =>
  render(
    <PageHelmet>
      <title>{title}</title>
    </PageHelmet>
  )

describe('PageHelmet', () => {
  afterEach(() => {
    document.title = ''
  })

  it('sets the document title through the Picasso provider', async () => {
    renderPageHelmet('Dashboard')

    await waitFor(() => {
      expect(document.title).toBe('Dashboard')
    })
  })
})
