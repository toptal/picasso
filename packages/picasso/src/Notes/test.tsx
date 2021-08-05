import React, { ReactNode } from 'react'
import { render } from '@toptal/picasso/test-utils'

import { OmitInternalProps } from '@toptal/picasso-shared'
import Notes, { Props } from './Notes'

const renderNotes = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { /* add props you need */ } = props

  return render(<Notes>{children}</Notes>)
}

describe('Notes', () => {
  test('default render', () => {
    const { container } = renderNotes(null, {})

    expect(container).toMatchSnapshot()
  })
})
