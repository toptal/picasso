import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import { OmitInternalProps } from '@toptal/picasso-shared'
import NotesSubtitle, { Props } from './NotesSubtitle'

const renderNotesSubtitle = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { /* add props you need */ } = props

  return render(<NotesSubtitle>{children}</NotesSubtitle>)
}

describe('NotesSubtitle', () => {
  test('default render', () => {
    const { container } = renderNotesSubtitle(null, {})

    expect(container).toMatchSnapshot()
  })
})
