import type {
  ReactNode,
  ReactElement,
  MouseEvent,
  ElementType,
  FC,
} from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type {
  StandardProps,
  SizeType,
  ButtonOrAnchorProps,
  OverridableComponent,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Button as ButtonBase } from '@mui/base/Button'
import { Loader } from '@toptal/picasso-loader'
import { Container } from '@toptal/picasso-container'
import { noop, toTitleCase } from '@toptal/picasso-utils'

import {
  createVariantClassNames,
  createCoreClassNames,
  createSizeClassNames,
  createIconClassNames,
} from './styles'

export type VariantType =
  | 'primary'
  | 'negative'
  | 'positive'
  | 'secondary'
  | 'transparent'

export type IconPositionType = 'left' | 'right'

export interface Props
  extends StandardProps,
    TextLabelProps,
    ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  focused?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** Shows a loading indicator and disables click events */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** A button can have different sizes */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** The variant to use */
  variant?: VariantType
  /** HTML Value of Button component */
  value?: string | number
  /** HTML title of Button component */
  title?: string
  /** HTML type of Button component */
  type?: 'button' | 'reset' | 'submit'
}

const getClickHandler = (loading?: boolean, handler?: Props['onClick']) =>
  loading ? noop : handler

const getIcon = ({
  children,
  icon,
  iconPosition,
  size,
}: {
  children: ReactNode
  icon?: ReactElement
  iconPosition?: IconPositionType
  size: SizeType<'small' | 'medium' | 'large'>
}) => {
  if (!icon) {
    return null
  }

  const iconClassNames = createIconClassNames({
    size,
    iconPosition: children && iconPosition ? iconPosition : undefined,
  })

  return React.cloneElement(icon, {
    className: cx(iconClassNames.join(' '), icon.props.className),
    key: 'button-icon',
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isReactComponent = (component: any) => {
  return (
    component &&
    (component.$$typeof === Symbol.for('react.forward_ref') ||
      typeof component === 'function')
  )
}

export const Button: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function Button(props, ref) {
  const {
    icon,
    iconPosition,
    loading,
    children,
    className,
    style,
    fullWidth,
    variant = 'primary',
    size = 'medium',
    focused,
    hovered,
    disabled,
    active,
    onClick,
    title,
    value,
    type,
    as = 'button',
    titleCase: propsTitleCase,
    ...rest
  } = props

  let RootElement: ElementType | FC = as

  if (isReactComponent(RootElement)) {
    console.log('RootElement: ', RootElement, isReactComponent(RootElement))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RootElement = forwardRef(
      ({ ownerState, ...restProps }: { ownerState: object }, rootRef) => {
        const Root = as

        return <Root ref={rootRef} {...restProps} />
      }
    )
  }

  const titleCase = useTitleCase(propsTitleCase)
  const finalChildren = [titleCase ? toTitleCase(children) : children]

  if (icon) {
    const iconComponent = getIcon({ children, icon, iconPosition, size })

    if (iconPosition === 'left') {
      finalChildren.unshift(iconComponent)
    } else {
      finalChildren.push(iconComponent)
    }
  }

  const coreClassNames = createCoreClassNames({
    disabled,
    focused,
    hovered,
    active,
  })
  const variantClassNames = createVariantClassNames(variant, {
    disabled,
    focused,
    hovered,
    active,
  })
  const sizeClassNames = createSizeClassNames(size)

  const finalClassName = cx(
    coreClassNames.join(' '),
    variantClassNames.join(' '),
    sizeClassNames.join(' '),
    fullWidth ? 'w-full' : '',
    className
  )

  const contentSizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string[]
  > = {
    small: ['text-button-small'],
    medium: ['text-button-medium'],
    large: ['text-button-large'],
  }

  const contentClassName = cx(
    'font-semibold whitespace-nowrap',
    contentSizeClassNames[size].join(' '),
    loading ? 'opacity-0' : ''
  )

  return (
    <ButtonBase
      {...rest}
      ref={ref}
      onClick={getClickHandler(loading, onClick)}
      className={finalClassName}
      style={style}
      disabled={disabled}
      title={title}
      value={value}
      type={type}
      data-component-type='button'
      tabIndex={disabled ? -1 : 0}
      slots={{ root: RootElement }}
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
    </ButtonBase>
  )
})

Button.defaultProps = {
  active: false,
  as: 'button',
  children: null,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  iconPosition: 'left',
  loading: false,
  onClick: noop,
  size: 'medium',
  type: 'button',
  variant: 'primary',
}

Button.displayName = 'Button'

export default Button
