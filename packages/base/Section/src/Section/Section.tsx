import type { ReactNode } from 'react'
import React, { forwardRef, useState } from 'react'
import type { SizeType, BaseProps } from '@toptal/picasso-shared'
import { ButtonCircular } from '@toptal/picasso-button'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { isString, Rotate180 } from '@toptal/picasso-utils'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import { twMerge, twJoin } from '@toptal/picasso-tailwind-merge'
import { Collapse } from '@toptal/picasso-collapse'

type VariantType = 'bordered' | 'default' | 'withHeaderBar'

export interface Props extends BaseProps {
  /** Title of the Section */
  title?: ReactNode
  /** Subtitle of the Section */
  subtitle?: ReactNode
  /** Additional actions of the Section */
  actions?: ReactNode
  /** Main content of the Section */
  children?: ReactNode
  /** Whether section can be collapsed */
  collapsible?: boolean
  /** Default collapsed value **(applied if `collapsible: true`)** */
  defaultCollapsed?: boolean
  /** Controlled collapsed state */
  collapsed?: boolean
  /** Callback when the collapsed state changes */
  onToggle?: (collapsed: boolean) => void
  testIds?: {
    header?: string
    title?: string
    subtitle?: string
    actions?: string
    collapse?: string
  }
  variant?: VariantType
  /** Title size of the inner text */
  titleSize?: SizeType<'small' | 'medium'>
}

const defaultChildMargin = '[&>:last-child:not(:first-child)]:mt-6'

const classesByVariant: Record<VariantType, string | string[]> = {
  default: defaultChildMargin,
  bordered: [
    defaultChildMargin,
    'border rounded-md border-solid border-gray-300',
    'p-8 [&>:last-child]:pb-0',
  ],
  withHeaderBar: 'p-0 rounded-md border border-solid border-gray-400',
}

const headerBarClasses = [
  'pt-3 pb-3 pl-4 pr-4',
  'rounded-tl-md rounded-tr-md rounded-br-0 rounded-bl-0',
  'border-solid border-l-0 border-r-0 border-t-0 border-b border-gray-400',
  'bg-gray-100',
]

const classesByCollapsedHeader: Record<VariantType, string | string[]> = {
  default: 'pb-0',
  bordered: 'pb-0',
  withHeaderBar: ['border-b-0 rounded-md', 'transition delay-300'],
}

export const Section = forwardRef<HTMLDivElement, Props>(function Section(
  props,
  ref
) {
  const {
    className,
    style,
    title,
    subtitle,
    actions,
    children,
    testIds,
    collapsible = false,
    defaultCollapsed = true,
    collapsed,
    onToggle,
    variant = 'default',
    titleSize = 'medium',
    ...rest
  } = props

  const [internalCollapsed, setInternalCollapsed] = useState(
    collapsible ? defaultCollapsed : false
  )

  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed

    if (onToggle) {
      onToggle(newCollapsed)
    } else {
      setInternalCollapsed(newCollapsed)
    }
  }

  const renderTitle = () =>
    title ? (
      <Typography
        as={isString(title) ? undefined : 'div'}
        className='mr-4 min-w-0'
        data-testid={testIds?.title}
        variant='heading'
        size={titleSize}
      >
        {title}
      </Typography>
    ) : null

  const renderSubtitle = () =>
    subtitle ? (
      <Typography
        as={isString(subtitle) ? undefined : 'div'}
        className='self-center !mr-4 min-w-0'
        data-testid={testIds?.subtitle}
        size='medium'
        color='dark-grey'
      >
        {subtitle}
      </Typography>
    ) : null

  const renderCollapse = () =>
    collapsible ? (
      <ButtonCircular
        onClick={toggleCollapse}
        data-testid={testIds?.collapse}
        variant='flat'
        icon={
          <Rotate180 on={!isCollapsed}>
            <ArrowDownMinor16 />
          </Rotate180>
        }
      />
    ) : null

  const hasActions = actions || collapsible
  const renderActions = () =>
    hasActions ? (
      <Container
        data-testid={testIds?.actions}
        flex
        alignItems='center'
        className='ml-auto'
      >
        {actions}
        {renderCollapse()}
      </Container>
    ) : null

  const hasHeader = title || subtitle || hasActions

  return (
    <Container
      ref={ref}
      variant={
        ['bordered', 'withHeaderBar'].includes(variant) ? 'white' : undefined
      }
      style={style}
      {...rest}
      className={twMerge(
        'pt-8',
        classesByVariant[variant],
        variant === 'default' && isCollapsed && 'pb-8',
        collapsible && variant === 'bordered' && 'p-6',
        className
      )}
    >
      {hasHeader && (
        <Container
          data-testid={testIds?.header}
          className={twJoin(
            'flex items-center',
            variant === 'withHeaderBar' && headerBarClasses,
            isCollapsed && classesByCollapsedHeader[variant]
          )}
        >
          {renderTitle()}
          {renderSubtitle()}
          {renderActions()}
        </Container>
      )}
      <Collapse in={!isCollapsed} unmountOnExit>
        <Container className={variant === 'withHeaderBar' ? 'p-6' : ''}>
          {children}
        </Container>
      </Collapse>
    </Container>
  )
})

Section.displayName = 'Section'
Section.defaultProps = {
  collapsible: false,
  defaultCollapsed: true,
  titleSize: 'medium',
}

export default Section
