import React from 'react'
import {
  render,
  fireEvent,
  RenderResult,
  PicassoConfig
} from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Radio, { Props } from './Radio'

jest.mock('ap-style-title-case')

const renderRadio = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
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
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Radio', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
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
    it('renders disabled version', () => {
      const { container } = api

      expect(container).toMatchSnapshot()
    })

    it('disables radio events', () => {
      const { container } = api

      fireEvent.click(container)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('radio button', () => {
    it('renders default radio button', () => {
      const { container } = renderRadio({})

      expect(container).toMatchSnapshot()
    })

    it('should transform label text to title case when Picasso titleCase property is true', () => {
      const LABEL_TEXT = 'Test bh6'

      renderRadio({ label: LABEL_TEXT }, { titleCase: true })

      expect(spiedOnTitleCase).toHaveBeenCalledWith(LABEL_TEXT)
    })

    it('should not transform label text to title case when Picasso titleCase property is true but the component property overrides it', () => {
      renderRadio(
        { label: 'test label', titleCase: false },
        { titleCase: true }
      )

      expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
    })
  })

  describe('Radio.Group', () => {
    it('renders radio in group', () => {
      const { container }: RenderResult = render(
        <Radio.Group name='my-group'>
          <Radio label='LABEL+1' value='VALUE+1' />
          <Radio label='LABEL+2' value='VALUE+2' />
        </Radio.Group>
      )

      expect(container).toMatchSnapshot()
    })

    it('renders radio in grid group', () => {
      const { container }: RenderResult = render(
        <Radio.Group horizontal small={4} name='my-group'>
          <Radio label='LABEL+1' value='VALUE+1' />
          <Radio label='LABEL+2' value='VALUE+2' />
          <Radio label='LABEL+3' value='VALUE+3' />
          <Radio label='LABEL+4' value='VALUE+4' />
          <Radio label='LABEL+5' value='VALUE+5' />
          <Radio label='LABEL+6' value='VALUE+6' />
        </Radio.Group>
      )

      expect(container).toMatchSnapshot()
    })
  })
})
