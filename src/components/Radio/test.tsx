import React from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import Radio, { Props } from './Radio'

const renderRadio = (props: OmitInternalProps<Props>) => {
  const { disabled, onChange } = props

  return render(<Radio disabled={disabled} onChange={onChange} />)
}

afterEach(cleanup)

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
