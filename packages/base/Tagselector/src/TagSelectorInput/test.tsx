import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import type { Props as InputProps } from '@toptal/picasso-input'

import { TagSelectorInput } from './TagSelectorInput'

const renderTagSelectorInput = (props: OmitInternalProps<InputProps>) => {
  return render(<TagSelectorInput {...props} />)
}

describe('TagSelectorInput', () => {
  it('renders', () => {
    const { container } = renderTagSelectorInput({
      disabled: false,
      placeholder: 'placeholder',
      value: 'value',
      'data-testid': 'data-testid',
      testIds: {
        inputAdornment: 'inputAdornment',
        resetButton: 'resetButton',
      },
    })

    expect(container).toMatchSnapshot()
  })
})
