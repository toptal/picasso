import React from 'react'
import { render } from '@toptal/picasso-test-utils'

import { FormCompound as Form } from '../FormCompound'
import { NumberInput, type Props } from './NumberInput'

const numberInputMock = jest.fn()

jest.mock('@toptal/picasso-number-input', () => ({
  ...jest.requireActual('@toptal/picasso-number-input'),
  NumberInput: (props: any) => numberInputMock(props),
}))

const renderFormWithNumberInput = (props: Props) =>
  render(
    <Form.ConfigProvider value={{}}>
      <Form onSubmit={() => {}}>
        <NumberInput label='Test' data-testid='number-input' {...props} />
      </Form>
    </Form.ConfigProvider>
  )

describe('Form.NumberInput', () => {
  describe('when "min" and "max" props are provided', () => {
    it('passes them to NumberInput', () => {
      renderFormWithNumberInput({
        min: '8',
        max: '12',
        name: 'test-input',
      })

      expect(numberInputMock).toHaveBeenCalledWith(
        expect.objectContaining({
          min: '8',
          max: '12',
          name: 'test-input',
        })
      )
      // react-final-form v7 registers the field in an effect and re-renders
      // once after mount (v6 registered during render and rendered once)
      expect(numberInputMock).toHaveBeenCalledTimes(2)
    })
  })
})
