/* eslint-disable complexity */
import type {
  ReactNode,
  ReactElement,
  MouseEvent,
  ElementType,
  Ref,
} from 'react'
import React, { forwardRef } from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type {
  StandardProps,
  ButtonOrAnchorProps,
  OverridableComponent,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Loader } from '@toptal/picasso-loader'
import { Container } from '@toptal/picasso-container'
import { noop, toTitleCase } from '@toptal/picasso-utils'
import { Slot } from '@radix-ui/react-slot'

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

export const ButtonBase: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function ButtonBase(props, ref) {
  const {
    icon,
    iconPosition,
    loading,
    children,
    className,
    contentClassName,
    style,
    disabled,
    onClick,
    title,
    value,
    type,
    as,
    titleCase: propsTitleCase,
    ...rest
  } = props

  const titleCase = useTitleCase(propsTitleCase)
  const finalChildren = [titleCase ? toTitleCase(children) : children]

  if (icon) {
    const iconComponent = getIcon({ icon })

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const finalClassName = twMerge(createCoreClassNames({ disabled }), className)

  const Component = as || 'button'
  const asChild = !!as && Component !== 'button' && Component !== 'a'

  const renderButton = (Comp: ElementType, buttonRef: Ref<any>) => (
    <Comp
      {...rest}
      ref={buttonRef}
      onClick={getClickHandler(loading, onClick)}
      className={finalClassName}
      style={style}
      aria-disabled={disabled}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
      data-component-type='button'
      tabIndex={rest.tabIndex ?? disabled ? -1 : 0}
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
    </Comp>
  )

  // Use Slot for custom components, otherwise use button/a directly
  if (asChild) {
    return <Slot ref={ref}>{renderButton(Component, null)}</Slot>
  }

  return renderButton(Component, ref)
})

ButtonBase.defaultProps = {
  as: 'button',
  children: null,
  disabled: false,
  iconPosition: 'left',
  loading: false,
  onClick: noop,
  type: 'button',
}

ButtonBase.displayName = 'ButtonBase'

export default ButtonBase
