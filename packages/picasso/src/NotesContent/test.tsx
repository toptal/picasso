import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import NotesContent from './NotesContent'

const renderNotesContent = (children: ReactNode) => {
  return render(<NotesContent>{children}</NotesContent>)
}

describe('NotesContent', () => {
  it('default render', () => {
    const { container } = renderNotesContent('content')

    expect(container).toMatchSnapshot()
  })
})
