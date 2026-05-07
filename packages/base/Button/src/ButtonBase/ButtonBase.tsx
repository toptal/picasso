/* eslint-disable complexity */
import type { ReactNode, ReactElement, MouseEvent, ElementType } from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type {
  StandardProps,
  ButtonOrAnchorProps,
  OverridableComponent,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Button as BaseUIButton } from '@base-ui/react/button'
import { Loader } from '@toptal/picasso-loader'
import { Container } from '@toptal/picasso-container'
import { noop, toTitleCase, withClasses } from '@toptal/picasso-utils'

import { createCoreClassNames } from './styles'

export type IconPositionType = 'left' | 'right'

export type ButtonClassKey = 'root' | 'label' | 'icon'

export interface Props
  extends StandardProps,
    TextLabelProps,
    ButtonOrAnchorProps {
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  /** ClassName for the content */
  contentClassName?: string
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** Shows a loading indicator and disables click events */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** HTML Value of Button component */
  value?: string | number
  /** HTML title of Button component */
  title?: string
  /** HTML type of Button component */
  type?: 'button' | 'reset' | 'submit'
  /** Override or extend internal slot classes */
  classes?: Partial<Record<ButtonClassKey, string>>
}

const getClickHandler = (loading?: boolean, handler?: Props['onClick']) =>
  loading ? noop : handler

const isValidAs = (value: Props['as']) => {
  const valueType = typeof value

  return (
    valueType === 'string' ||
    valueType === 'function' ||
    (valueType === 'object' && value !== null)
  )
}

export const ButtonBase: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function ButtonBase(
  {
    as = 'button',
    children = null,
    disabled = false,
    iconPosition = 'left',
    loading = false,
    onClick = noop,
    type = 'button',
    classes,
    ...props
  },
  ref
) {
  const {
    icon,
    className,
    contentClassName,
    style,
    title,
    value,
    titleCase: propsTitleCase,
    ...rest
  } = props

  const titleCase = useTitleCase(propsTitleCase)
  const finalAs: ElementType = isValidAs(as) ? as : 'a'
  const isNativeButton = finalAs === 'button'

  const baseClasses: Record<ButtonClassKey, string> = {
    root: twMerge(
      'base-Button-root',
      createCoreClassNames({ disabled }),
      className
    ),
    label: contentClassName ?? '',
    icon: 'text-[1.2em] flex-1',
  }
  const merged = withClasses(baseClasses, classes)

  const finalChildren: ReactNode[] = [
    titleCase ? toTitleCase(children) : children,
  ]

  if (icon) {
    const iconComponent = React.cloneElement(icon, {
      className: twMerge(merged.icon, icon.props.className),
      key: 'button-icon',
    })

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  return (
    <BaseUIButton
      {...(rest as BaseUIButton.Props)}
      ref={ref as React.Ref<HTMLElement>}
      onClick={
        getClickHandler(loading, onClick) as BaseUIButton.Props['onClick']
      }
      className={merged.root}
      style={style}
      aria-disabled={disabled}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
      data-component-type='button'
      tabIndex={rest.tabIndex ?? (disabled ? -1 : 0)}
      role={rest.role ?? 'button'}
      nativeButton={isNativeButton}
      render={isNativeButton ? undefined : React.createElement(finalAs)}
    >
      <Container
        as='span'
        inline
        flex
        direction='row'
        alignItems='center'
        className={merged.label}
      >
        {finalChildren}
      </Container>

      {loading && (
        <Loader
          variant='inherit'
          className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          inline
          size='small'
        />
      )}
    </BaseUIButton>
  )
})

ButtonBase.displayName = 'ButtonBase'

export default ButtonBase
