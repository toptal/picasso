import type { ComponentProps, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type {
  StandardProps,
  ButtonOrAnchorProps,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { FormControlLabel } from '@toptal/picasso-form-label'

import { useRadioGroupContext } from '../RadioGroupContext'
import type { Props as RadioControlProps } from './RadioControl'
import { RadioControl } from './RadioControl'

export interface Props
  extends Omit<StandardProps, 'classes'>,
    TextLabelProps,
    Omit<ButtonOrAnchorProps, 'onChange' | 'value'> {
  /** Text label for the `Radio` */
  label?: ReactNode
  /** Value of the `Radio` component used with conjunction of `Radio.Group` */
  value?: string | number | boolean
  /** Defines if `Radio` is disabled */
  disabled?: boolean
  /** Defines if `Radio` is checked by default */
  checked?: boolean
  /** Callback invoked when `Radio` changes its state */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

export const Radio = forwardRef<HTMLButtonElement | HTMLLabelElement, Props>(
  function Radio({ disabled = false, ...props }, ref) {
    const {
      className,
      style,
      label,
      checked,
      value,
      onChange,
      titleCase,
      'data-private': dataPrivate,
      id,
      name,
      // runtime backstop: `classes` was dropped from the public Props; keep a
      // stray JS-consumer value out of the DOM spread below
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      classes: _classes,
      ...rest
    } = props as Props & { classes?: unknown }

    const radioGroup = useRadioGroupContext()

    const resolvedChecked =
      checked ?? (radioGroup ? radioGroup.value === value : undefined)
    const resolvedName = name ?? radioGroup?.name

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event, event.target.checked)
      radioGroup?.onChange?.(event, event.target.value)
    }

    const controlRest = rest as Omit<
      RadioControlProps,
      | 'checked'
      | 'disabled'
      | 'withLabel'
      | 'id'
      | 'name'
      | 'value'
      | 'onChange'
      | 'className'
      | 'style'
    >

    const radioControl = (
      <RadioControl
        {...controlRest}
        ref={label ? undefined : (ref as React.ForwardedRef<HTMLSpanElement>)}
        className={className}
        style={style}
        checked={resolvedChecked}
        disabled={disabled}
        withLabel={Boolean(label)}
        id={id}
        name={resolvedName}
        value={value}
        onChange={handleChange}
      />
    )

    if (!label) {
      return radioControl
    }

    const externalEventListeners = {
      onMouseLeave: rest.onMouseLeave,
      onMouseOver: rest.onMouseOver,
    } as ComponentProps<typeof FormControlLabel>

    return (
      <FormControlLabel
        {...externalEventListeners}
        ref={ref as React.ForwardedRef<HTMLLabelElement>}
        control={radioControl}
        classes={{
          // rem values are the em equivalents against FormLabel's 14px font
          // (`size='medium'`, the only size Radio renders): 0.25em→3.5px→0.21875rem,
          // 1.5em→21px→1.3125rem. Do not "round" to 0.25rem/1.5rem — that shifts the label.
          label: 'mt-[0.21875rem] max-w-[calc(100%_-_1.3125rem_+_1px)]',
          root: 'text-[1rem] items-start',
        }}
        style={style}
        label={label}
        data-private={dataPrivate}
        disabled={disabled}
        titleCase={titleCase}
      />
    )
  }
)

Radio.displayName = 'Radio'

export default Radio
