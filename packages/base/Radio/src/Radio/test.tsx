import React from 'react'
import type { RenderResult, PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import type { Props } from './Radio'
import { RadioCompound as Radio } from '../RadioCompound'

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
        disabled: true,
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

    it('applies the narrowed classes slots to their elements', () => {
      const { getByRole } = render(
        <Radio
          label='LABEL'
          value='v'
          classes={{
            root: 'root-slot',
            input: 'input-slot',
            uncheckedIcon: 'unchecked-slot',
            checkedIcon: 'checked-slot',
          }}
        />
      )

      const input = getByRole('radio')
      const root = input.parentElement as HTMLElement

      expect(root).toHaveClass('root-slot')
      expect(input).toHaveClass('input-slot')
      expect(root.querySelector('.unchecked-slot')).toBeInTheDocument()
      expect(root.querySelector('.checked-slot')).toBeInTheDocument()
    })

    it('applies the disabled classes slot only when disabled', () => {
      const { getByRole, rerender } = render(
        <Radio
          label='LABEL'
          value='v'
          classes={{ disabled: 'disabled-slot' }}
        />
      )

      expect(getByRole('radio').parentElement).not.toHaveClass('disabled-slot')

      rerender(
        <Radio
          disabled
          label='LABEL'
          value='v'
          classes={{ disabled: 'disabled-slot' }}
        />
      )

      expect(getByRole('radio').parentElement).toHaveClass('disabled-slot')
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

    it('selects a radio and invokes the group onChange with its value', () => {
      const onGroupChange = jest.fn()
      const { getByLabelText } = render(
        <Radio.Group name='my-group' value='VALUE+1' onChange={onGroupChange}>
          <Radio label='LABEL+1' value='VALUE+1' />
          <Radio label='LABEL+2' value='VALUE+2' />
        </Radio.Group>
      )

      const firstRadio = getByLabelText('LABEL+1') as HTMLInputElement
      const secondRadio = getByLabelText('LABEL+2') as HTMLInputElement

      expect(firstRadio.checked).toBe(true)
      expect(secondRadio.checked).toBe(false)

      fireEvent.click(secondRadio)

      expect(onGroupChange).toHaveBeenCalledTimes(1)
      expect(onGroupChange.mock.calls[0][1]).toBe('VALUE+2')
    })

    it('renders radio in a grid group', () => {
      const { container } = render(
        <Radio.Group horizontal sm={4} name='my-group'>
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
