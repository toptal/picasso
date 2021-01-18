import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Tab, { Props } from './Tab'
import { PicassoConfig } from '../test-utils'

jest.mock('ap-style-title-case')

const renderTab = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { label, disabled, icon, titleCase } = props

  return render(
    <Tab label={label} disabled={disabled} icon={icon} titleCase={titleCase} />,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Tab', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })
  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  describe('Tab', () => {
    it('renders', () => {
      const { container } = renderTab({
        label: 'Tab Label'
      })

      expect(container).toMatchSnapshot()
    })

    it('disabled tab', () => {
      const { container } = renderTab({
        label: 'Tab Label',
        disabled: true
      })

      expect(container).toMatchSnapshot()
    })

    it('tab with icon', () => {
      const Icon = () => <div id='Icon' />
      const { container } = renderTab({
        label: 'Tab Label',
        icon: <Icon />
      })

      expect(container).toMatchSnapshot()
    })

    it('should transform text to title case when Picasso titleCase property is true', () => {
      const LABEL_TEXT = 'Test vh2'

      renderTab({ label: LABEL_TEXT }, { titleCase: true })

      expect(spiedOnTitleCase).toHaveBeenCalledWith(LABEL_TEXT)
    })

    it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
      renderTab({ label: 'abc sp3', titleCase: false }, { titleCase: true })

      expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
    })
  })
})
