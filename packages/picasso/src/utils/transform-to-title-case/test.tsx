import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import transformToTitleCase from './tranform-to-title-case'

describe('transformToTitleCase()', () => {
  test('should transform strings to title case', () => {
    const { getByText } = render(
      <React.Fragment>
        {transformToTitleCase('convert regular string to the title case')}
      </React.Fragment>
    )
    expect(
      getByText('Convert Regular String to the Title Case')
    ).toBeInTheDocument()
  })

  test('should do nothing with non-strings', () => {
    const { getByText } = render(
      <React.Fragment>
        {transformToTitleCase(<div>convert React node to the title case</div>)}
      </React.Fragment>
    )
    expect(
      getByText('convert React node to the title case')
    ).toBeInTheDocument()
  })
})
