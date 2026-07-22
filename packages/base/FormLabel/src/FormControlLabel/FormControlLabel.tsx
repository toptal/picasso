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
   * Id of the label text node. When set, the wrapper renders as a non-`<label>`
   * element that forwards label clicks — lets base-ui Checkbox/Switch name
   * themselves via `aria-labelledby` without a duplicate label association.
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

    if (labelId !== undefined) {
      const handleClick: React.MouseEventHandler<HTMLDivElement> = event => {
        const forwardOnClick = onClick as
          | React.MouseEventHandler<HTMLElement>
          | undefined

        forwardOnClick?.(event)

        if (disabled || event.defaultPrevented) {
          return
        }

        const target = event.target as HTMLElement
        const wrapper = event.currentTarget

        const interactive = target.closest(
          'a[href],button,input,select,textarea,[role="checkbox"],[role="switch"],[role="radio"],[role="button"],[role="link"],[role="menuitem"],[role="tab"],[role="option"]'
        )

        if (interactive && wrapper.contains(interactive)) {
          return
        }

        wrapper
          .querySelector<HTMLInputElement>('input[aria-hidden="true"]')
          ?.click()

        wrapper
          .querySelector<HTMLElement>(
            '[role="checkbox"],[role="switch"],[role="radio"]'
          )
          ?.focus()
      }

      return (
        <div
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
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
