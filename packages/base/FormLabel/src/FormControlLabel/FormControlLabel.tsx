import type {
  ChangeEvent,
  LabelHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps, TextLabelProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { useFieldsLayoutContext } from '@toptal/picasso-form-layout'

import type { RequiredDecoration } from '../FormLabel'
import { FormLabel } from '../FormLabel'

export type FormControlLabelAttributesType =
  LabelHTMLAttributes<HTMLLabelElement> & {
    onChange?: (event: ChangeEvent<{}>, checked: boolean) => void
  }

export interface Props
  extends StandardProps,
    TextLabelProps,
    FormControlLabelAttributesType {
  /** A control element. For instance, it can be be a Radio or a Checkbox */
  control: ReactElement
  /** The text to be used in an enclosing label element */
  label?: ReactNode
  /** Shows whether label is disabled or not */
  disabled?: boolean
  /** Whether to show asterisk or (optional) postfix as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
  /**
   * Id of the label text node, for controls that name themselves via
   * `aria-labelledby` (base-ui Checkbox/Switch). When provided, the wrapper is
   * rendered as a non-`<label>` element so the control's hidden native input
   * is not a second label-associated node — this keeps `getByLabelText` /
   * `getByRole` matching a single accessible control. Label clicks are
   * forwarded to the control to preserve click-to-toggle.
   */
  labelId?: string
  classes?: {
    root?: string
    label?: string
  }
}

const FormControlLabel = forwardRef<HTMLLabelElement | HTMLDivElement, Props>(
  function FormControlLabel(props, ref) {
    const {
      control,
      label,
      className,
      style,
      disabled,
      requiredDecoration,
      titleCase,
      classes,
      labelId,
      onClick,
      ...rest
    } = props

    const { layout } = useFieldsLayoutContext()
    const isHorizontalLayout = layout === 'horizontal'

    const rootClassName = twMerge(
      'inline-flex items-center',
      'max-w-full',
      'align-middle',
      '-webkit-tap-highlight-color-transparent',
      'mx-0',
      disabled ? 'cursor-default' : 'cursor-pointer',
      isHorizontalLayout && 'col-start-1 col-span-2',
      classes?.root,
      className
    )

    const content = (
      <>
        {React.cloneElement(control, { disabled })}
        <FormLabel
          className={twMerge(disabled && 'pointer-events-auto', classes?.label)}
          as='span'
          id={labelId}
          requiredDecoration={requiredDecoration}
          disabled={disabled}
          titleCase={titleCase}
        >
          {label}
        </FormLabel>
      </>
    )

    // Opt-in path: control names itself via `aria-labelledby`, so we avoid a
    // native `<label>` (which would make the control's hidden native input a
    // second label-associated node) and re-create label click-to-toggle by
    // forwarding clicks to that hidden input.
    if (labelId !== undefined) {
      const handleClick: React.MouseEventHandler<HTMLDivElement> = event => {
        onClick?.(
          event as unknown as React.MouseEvent<HTMLLabelElement, MouseEvent>
        )

        if (disabled || event.defaultPrevented) {
          return
        }

        const target = event.target as HTMLElement

        // Only forward clicks that land on the label text. Clicks on the
        // control itself, its hidden input, or any interactive content inside
        // the label are handled by those elements — this mirrors a native
        // `<label>`, whose activation behavior excludes interactive descendants.
        if (
          target.closest(
            'a[href],button,input,select,textarea,[role="checkbox"],[role="switch"],[role="radio"],[role="button"],[role="link"],[role="menuitem"],[role="tab"],[role="option"]'
          )
        ) {
          return
        }

        const wrapper = event.currentTarget

        wrapper
          .querySelector<HTMLInputElement>('input[aria-hidden="true"]')
          ?.click()

        // A native `<label>` moves focus to its control on activation; restore
        // that so keyboard interaction keeps working after a label-text click.
        wrapper
          .querySelector<HTMLElement>(
            '[role="checkbox"],[role="switch"],[role="radio"]'
          )
          ?.focus()
      }

      return (
        // Element-variance boundary: `rest` carries label-typed HTML
        // attributes, but this wrapper renders a <div>. The attributes are
        // runtime-compatible, so we resolve the variance once here.
        <div
          {...(rest as unknown as React.HTMLAttributes<HTMLDivElement>)}
          ref={ref as React.ForwardedRef<HTMLDivElement>}
          className={rootClassName}
          style={style}
          onClick={handleClick}
        >
          {content}
        </div>
      )
    }

    return (
      <label
        {...rest}
        onClick={onClick}
        ref={ref as React.ForwardedRef<HTMLLabelElement>}
        className={rootClassName}
        style={style}
      >
        {content}
      </label>
    )
  }
)

FormControlLabel.displayName = 'FormControlLabel'

export default FormControlLabel
