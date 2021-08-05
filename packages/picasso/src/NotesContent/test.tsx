import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import { OmitInternalProps } from '@toptal/picasso-shared'
import NotesContent, { Props } from './NotesContent'

const renderNotesContent = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { /* add props you need */ } = props

  return render(<NotesContent>{children}</NotesContent>)
}

describe('NotesContent', () => {
  test('default render', () => {
    const { container } = renderNotesContent(null, {})

    expect(container).toMatchSnapshot()
  })
})
