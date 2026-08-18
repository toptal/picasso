import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Switch'
import { Switch } from './Switch'

const renderSwitch = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { label, disabled, titleCase, onChange } = props

  return render(
    <Switch
      disabled={disabled}
      label={label}
      onChange={onChange}
      titleCase={titleCase}
      data-testid='switch'
    />,
    undefined,
    picassoConfig
  )
}

describe('Switch', () => {
  it('renders default Switch without label', () => {
    const { container } = renderSwitch({})

    expect(container).toMatchSnapshot()
  })

  it('renders default Switch with label', () => {
    const { getByRole } = renderSwitch({ label: 'A Switch' })

    expect(getByRole('switch', { name: 'A Switch' })).toBeVisible()
  })

  it('renders disabled state', () => {
    const { container } = renderSwitch({
      disabled: true,
      label: 'Disabled',
    })

    expect(container).toMatchSnapshot()
  })

  it('transforms text to title case when Picasso titleCase property is true', () => {
    const { getByText } = renderSwitch(
      { label: 'abc ac4' },
      { titleCase: true }
    )

    expect(getByText('Abc Ac4')).toBeVisible()
  })

  it('transforms text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    const { getByText } = renderSwitch(
      { label: 'abc dp3', titleCase: false },
      { titleCase: true }
    )

    expect(getByText('abc dp3')).toBeVisible()
  })

  it('behaves correctly when interacting', () => {
    const onChange = jest.fn()
    const label = 'Switch'

    const { getByTestId } = renderSwitch({ onChange, label })

    fireEvent.click(getByTestId('switch'))

    expect(onChange).toHaveBeenCalled()
    expect(getByTestId('switch')).toMatchSnapshot()
  })

  describe('single label-associated node', () => {
    it('matches getByLabelText once and resolves to the accessible control', () => {
      const { getByLabelText, getByRole } = renderSwitch({ label: 'A Switch' })

      expect(getByLabelText('A Switch')).toBe(
        getByRole('switch', { name: 'A Switch' })
      )
    })

    it('toggles when the label text is clicked', () => {
      const onChange = jest.fn()
      const { getByText } = renderSwitch({ label: 'A Switch', onChange })

      fireEvent.click(getByText('A Switch'))

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('does not toggle when disabled and the label text is clicked', () => {
      const onChange = jest.fn()
      const { getByText } = renderSwitch({
        label: 'A Switch',
        disabled: true,
        onChange,
      })

      fireEvent.click(getByText('A Switch'))

      expect(onChange).not.toHaveBeenCalled()
    })

    describe('when nested inside a role="menuitem"', () => {
      it('toggles on label-text click', () => {
        const onChange = jest.fn()
        const { getByText } = render(
          <div role='menuitem'>
            <Switch onChange={onChange} label='A Switch' />
          </div>
        )

        fireEvent.click(getByText('A Switch'))

        expect(onChange).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('testIds', () => {
    it('keeps the top-level data-testid on the role element, with and without label', () => {
      const labelled = render(<Switch data-testid='switch' label='A Switch' />)

      expect(labelled.getByTestId('switch')).toBe(labelled.getByRole('switch'))

      labelled.unmount()

      const bare = render(<Switch data-testid='switch' />)

      expect(bare.getByTestId('switch')).toBe(bare.getByRole('switch'))
    })

    it('places testIds.input on the visually hidden native input', () => {
      const { getByTestId, getByRole } = render(
        <Switch label='A Switch' testIds={{ input: 'switch-input' }} />
      )

      const input = getByTestId('switch-input')

      expect(input).toBeInstanceOf(HTMLInputElement)
      // the input is rendered beside the role element, not inside it
      expect(getByRole('switch')).not.toContainElement(input)

      fireEvent.click(getByRole('switch'))

      expect(input).toBeChecked()
    })
  })
})
