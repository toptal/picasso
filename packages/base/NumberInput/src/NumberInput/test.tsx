import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'

import type { Props as NumberInputProps } from './NumberInput'
import { NumberInput } from './NumberInput'

const NumberInputRenderer = (
  props: { initialValue: number | string } & Partial<NumberInputProps>
) => {
  const [value, setValue] = useState(props.initialValue)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value)
  }

  return (
    <NumberInput
      step={5}
      max={100}
      min={-100}
      value={value}
      onChange={handleChange}
      status={props.status}
      endAdornment={props.endAdornment}
      hideControls={props.hideControls}
      testIds={props.testIds}
    />
  )
}

const renderNumberInput = (
  props: Partial<NumberInputProps> & { initialValue?: number | string } = {}
) => {
  const { initialValue = '10' } = props

  return render(<NumberInputRenderer initialValue={initialValue} {...props} />)
}

describe('NumberInput', () => {
  it('renders', () => {
    const { container } = renderNumberInput()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('increases value by step', async () => {
    const { getByDisplayValue, queryAllByRole } = renderNumberInput()

    const input = getByDisplayValue('10') as HTMLInputElement

    const controls = queryAllByRole('button')
    const controlUp = controls[0]

    fireEvent.click(controlUp)

    expect(input.value).toBe('15')
  })

  it('decreases value by step', () => {
    const { getByDisplayValue, queryAllByRole } = renderNumberInput()

    const input = getByDisplayValue('10') as HTMLInputElement

    const controls = queryAllByRole('button')
    const controlDown = controls[1]

    fireEvent.click(controlDown)

    expect(input.value).toBe('5')
  })

  describe('near max/min limits', () => {
    it('increase value near max limit', () => {
      const { getByDisplayValue, queryAllByRole } = renderNumberInput({
        initialValue: '97',
      })

      const input = getByDisplayValue('97') as HTMLInputElement

      const controls = queryAllByRole('button')
      const controlUp = controls[0]

      fireEvent.click(controlUp)

      expect(input.value).toBe('100')
    })

    it('decrease value near min limit', () => {
      const { getByDisplayValue, queryAllByRole } = renderNumberInput({
        initialValue: '-97',
      })

      const input = getByDisplayValue('-97') as HTMLInputElement

      const controls = queryAllByRole('button')
      const controlDown = controls[1]

      fireEvent.click(controlDown)

      expect(input.value).toBe('-100')
    })

    it('decrease value when it is closer than step to max', () => {
      const { getByDisplayValue, queryAllByRole } = renderNumberInput({
        initialValue: '97',
      })

      const input = getByDisplayValue('97') as HTMLInputElement

      const controls = queryAllByRole('button')
      const controlDown = controls[1]

      fireEvent.click(controlDown)

      expect(input.value).toBe('95')
    })

    it('increase value when it is closer to min than step', () => {
      const { getByDisplayValue, queryAllByRole } = renderNumberInput({
        initialValue: '-97',
      })

      const input = getByDisplayValue('-97') as HTMLInputElement

      const controls = queryAllByRole('button')
      const controlUp = controls[0]

      fireEvent.click(controlUp)

      expect(input.value).toBe('-95')
    })
  })

  describe('when in a valid state', () => {
    it('shows valid icon', () => {
      const testProps: NumberInputProps = {
        value: '10',
        status: 'success',
        testIds: { validIcon: 'valid-icon' },
      }

      const { getByTestId, rerender } = renderNumberInput(testProps)

      const validIcon = getByTestId('valid-icon')

      expect(validIcon).toBeVisible()

      // re-render with different props
      rerender(<NumberInput {...testProps} status='error' />)

      expect(validIcon).not.toBeVisible()
    })
  })

  describe('end adornment', () => {
    describe('when endAdornment is passed', () => {
      it('renders endAdornment with control buttons', () => {
        const testProps: NumberInputProps = {
          value: '10',
          endAdornment: <div data-testid='custom-end-adornment' />,
        }

        const { getByTestId, getAllByRole } = renderNumberInput(testProps)

        expect(getByTestId('custom-end-adornment')).toBeVisible()
        expect(getAllByRole('button')).toHaveLength(2)
      })
    })

    describe('when endAdornment is passed and controls are hidden', () => {
      it('renders endAdornment without control buttons', () => {
        const testProps: NumberInputProps = {
          value: '10',
          endAdornment: <div data-testid='custom-end-adornment' />,
          hideControls: true,
        }

        const { getByTestId, queryAllByRole } = renderNumberInput(testProps)

        expect(getByTestId('custom-end-adornment')).toBeVisible()
        expect(queryAllByRole('button')).toHaveLength(0)
      })
    })
  })
})
