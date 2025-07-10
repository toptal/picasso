import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type {
  BaseProps,
  TextLabelProps,
  SizeType,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { toTitleCase } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { useFieldsLayoutContext } from '@toptal/picasso-form-layout'

import { classesBySize, getRootClasses } from './styles'

type ComponentType = 'label' | 'span'
export type RequiredDecoration = 'asterisk' | 'optional'

export type Size = SizeType<'medium' | 'large'>
export type Alignment = 'top' | 'middle'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /** Content of the label */
  children: ReactNode
  /** Whether to show asterisk or (optional) postfix as a 'required' decoration */
  requiredDecoration?: RequiredDecoration
  /** Is this label for disabled input or not */
  disabled?: boolean
  /** Specifies an id of the input */
  htmlFor?: string
  /** Whether label should act as inline element `display: inline-block` */
  inline?: boolean
  /** Component used for the root node */
  as?: ComponentType
  /** Component size */
  size?: Size
  /** Whether label should be aligned to top of the container or not */
  alignment?: Alignment
  /** Label's end adornment */
  labelEndAdornment?: ReactNode
}

export const FormLabel = forwardRef<HTMLLabelElement, Props>(function FormLabel(
  props,
  ref
) {
  const {
    children,
    disabled,
    htmlFor,
    className,
    style,
    inline = false,
    as: Component = 'label',
    titleCase: propsTitleCase,
    requiredDecoration,
    size = 'medium',
    alignment = 'middle',
    labelEndAdornment,
    ...rest
  } = props
  const isInline = inline || Component === 'span'
  const titleCase = useTitleCase(propsTitleCase)
  const { layout } = useFieldsLayoutContext()

  return (
    <Component
      {...rest}
      ref={ref}
      htmlFor={htmlFor}
      className={twMerge(
        getRootClasses({ disabled, isInline, layout, alignment }),
        className
      )}
      style={style}
    >
      <span
        className={
          isInline ? 'align-top text-[0.8125rem]' : classesBySize[size]
        }
      >
        {requiredDecoration === 'asterisk' && (
          <span className='align-top text-red-500 mr-[0.3125em]'>*</span>
        )}

        {titleCase ? toTitleCase(children) : children}

        {requiredDecoration === 'optional' && ' (optional)'}

        {labelEndAdornment}
      </span>
    </Component>
  )
})

FormLabel.displayName = 'FormLabel'

export default FormLabel
