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
import { noop, toTitleCase } from '@toptal/picasso-utils'

import { createCoreClassNames } from './styles'

export type IconPositionType = 'left' | 'right'

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
}

const getClickHandler = (loading?: boolean, handler?: Props['onClick']) =>
  loading ? noop : handler

const getIcon = ({ icon }: { icon?: ReactElement }) => {
  if (!icon) {
    return null
  }

  return React.cloneElement(icon, {
    className: twMerge('text-[1.2em] flex-1', icon.props.className),
    key: 'button-icon',
  })
}

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
  const finalChildren = [titleCase ? toTitleCase(children) : children]
  const finalAs: ElementType = isValidAs(as) ? as : 'a'

  if (icon) {
    const iconComponent = getIcon({ icon })

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const finalClassName = twMerge(
    'base-Button-root',
    createCoreClassNames({ disabled }),
    className
  )
  const isNativeButton = finalAs === 'button'

  return (
    <BaseUIButton
      {...rest}
      ref={ref as React.Ref<HTMLElement>}
      onClick={
        getClickHandler(loading, onClick) as BaseUIButton.Props['onClick']
      }
      className={finalClassName}
      style={style}
      nativeButton={isNativeButton}
      render={isNativeButton ? undefined : React.createElement(finalAs)}
      aria-disabled={disabled}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
      data-component-type='button'
      tabIndex={rest.tabIndex ?? (disabled ? -1 : 0)}
      role={rest.role ?? 'button'}
    >
      <Container
        as='span'
        inline
        flex
        direction='row'
        alignItems='center'
        className={contentClassName}
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
