import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import NotesSubtitle from './NotesSubtitle'

const renderNotesSubtitle = (children: ReactNode) => {
  return render(<NotesSubtitle>{children}</NotesSubtitle>)
}

describe('NotesSubtitle', () => {
  it('default render', () => {
    const { container } = renderNotesSubtitle('subtitle')

    expect(container).toMatchSnapshot()
  })
})
