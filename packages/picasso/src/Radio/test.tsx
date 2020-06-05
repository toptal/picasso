import React from 'react'
import { render, fireEvent, RenderResult } from '@toptal/picasso/test-utils'
import { OmitInternalProps, PicassoDefaultProps } from '@toptal/picasso-shared'
import { titleCase } from 'title-case'

import Radio, { Props } from './Radio'

jest.mock('title-case')

const renderRadio = (
  props: OmitInternalProps<Props>,
  picassoDefaultProps?: PicassoDefaultProps
) => {
  const { disabled, onChange, label, titleCase } = props

  return render(
    <Radio
      disabled={disabled}
      label={label}
      titleCase={titleCase}
      onChange={onChange}
    />,
    undefined,
    picassoDefaultProps
  )
}

afterEach(() => {
  jest.resetAllMocks()
})

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

  test('renders default radio button', () => {
    const { container } = renderRadio({})

    expect(container).toMatchSnapshot()
  })

  test('should transform label text to title case when default titleCase property is true', () => {
    renderRadio({ label: 'test label' }, { Radio: { titleCase: true } })

    expect(titleCase).toBeCalledTimes(1)
  })

  test('should not transform label text to title case when default titleCase property is true but the component property overrides it', () => {
    renderRadio(
      { label: 'test label', titleCase: false },
      { Radio: { titleCase: true } }
    )

    expect(titleCase).toBeCalledTimes(0)
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
