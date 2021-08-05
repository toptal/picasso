import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import NotesTitle, { Props } from './NotesTitle'

const renderNotesTitle = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { /* add props you need */ } = props

  return render(<NotesTitle>{children}</NotesTitle>)
}

describe('NotesTitle', () => {
  test('default render', () => {
    const { container } = renderNotesTitle(null, {})

    expect(container).toMatchSnapshot()
  })
})
