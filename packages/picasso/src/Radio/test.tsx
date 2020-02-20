import React from 'react'
import { render, fireEvent, RenderResult } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Radio, { Props } from './Radio'

const renderRadio = (props: OmitInternalProps<Props>) => {
  const { disabled, onChange } = props

  return render(<Radio disabled={disabled} onChange={onChange} />)
}

describe('disabled radio button', () => {
  let onChange: () => void
  let api: RenderResult

  beforeEach(() => {
    onChange = jest.fn()

    api = renderRadio({
      onChange,
      disabled: true
    })
  })
  test('renders disabled version', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('disables radio events', () => {
    const { container } = api

    fireEvent.click(container)
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('radio button', () => {
  test('renders default radio button', () => {
    const { container } = renderRadio({})

    expect(container).toMatchSnapshot()
  })
})

describe('Radio.Group', () => {
  test('renders radio in group', () => {
    const { container }: RenderResult = render(
      <Radio.Group>
        <Radio label='LABEL+1' value='VALUE+1' />
        <Radio label='LABEL+2' value='VALUE+2' />
      </Radio.Group>
    )

    expect(container).toMatchSnapshot()
  })
})
