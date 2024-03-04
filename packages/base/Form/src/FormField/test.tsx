import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import { FormField } from './index'
import { FieldsLayoutContextProvider } from '../FieldsLayout'
import type {
  LabelColumnSize,
  ResponsiveLabelColumnSize,
} from '../FieldsLayout'

const renderFormField = (
  layout: 'horizontal' | 'vertical' = 'vertical',
  labelWidth?: LabelColumnSize | ResponsiveLabelColumnSize
) => {
  return render(
    <FieldsLayoutContextProvider layout={layout} labelWidth={labelWidth}>
      <FormField>
        <input />
      </FormField>
    </FieldsLayoutContextProvider>
  )
}

describe('FormField', () => {
  describe('when layout is vertical', () => {
    it('renders FormField with appropriate for vertical layout styles and classNames', () => {
      const { container } = renderFormField('vertical')

      expect(container).toMatchSnapshot()
    })
  })

  describe('when layout is horizontal', () => {
    it('renders FormField with appropriate for horizontal layout styles and classNames', () => {
      const { container } = renderFormField('horizontal')

      expect(container).toMatchSnapshot()
    })

    describe('when labelWidth is 4', () => {
      it('renders FormField with appropriate for horizontal layout styles and classNames', () => {
        const { container } = renderFormField('horizontal', 4)

        expect(container).toMatchSnapshot()
      })
    })
  })
})
