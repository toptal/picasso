import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import TagSelectorInput from './TagSelectorInput'
import { Props as InputProps } from '../Input/Input'

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
        resetButton: 'resetButton'
      }
    })

    expect(container).toMatchSnapshot()
  })
})
