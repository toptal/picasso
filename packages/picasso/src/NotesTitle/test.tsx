import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import NotesTitle from './NotesTitle'

const renderNotesTitle = (children: ReactNode) => {
  return render(<NotesTitle>{children}</NotesTitle>)
}

describe('NotesTitle', () => {
  it('default render', () => {
    const { container } = renderNotesTitle('title')

    expect(container).toMatchSnapshot()
  })
})
