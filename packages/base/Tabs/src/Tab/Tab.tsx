import type { ReactNode, HTMLAttributes, ReactElement } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { UserBadge } from '@toptal/picasso-user-badge'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { useTabsContext, type TabsValueType } from '../Tabs/TabsContext'
import { TabLabel } from '../TabLabel'
import { TabDescription } from '../TabDescription'

export interface Props
  extends BaseProps,
    TextLabelProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /**
   * If true, the tab will be disabled
   * @default false
   */
  disabled?: boolean

  /** The value of the tab */
  value?: TabsValueType

  /** The label element */
  label?: ReactNode

  /** The Icon element */
  icon?: ReactElement

  /** Image URL */
  avatar?: string | null

  /** Description */
  description?: string

  // Properties below are managed by Tabs component

  // selected?: boolean
  // onChange?: TabProps['onChange']
  // onClick?: TabProps['onClick']
}

const getOpacityClass = (
  selected: boolean,
  disabled: boolean,
  orientation: 'horizontal' | 'vertical'
) => {
  if (disabled) {
    return 'opacity-50'
  }
  if (selected || orientation === 'vertical') {
    return 'opacity-100 '
  }

  return 'opacity-70'
}

const wrapperClassesByOrientation = {
  horizontal: 'inline-flex items-center flex-col justify-center',
  vertical: 'block',
}

const rootClassesByOrientation = (selected: boolean) => ({
  horizontal: [
    'm-0 [&:not(:last-child)]:mr-8 pt-0 pb-[0.4375rem] px-0',
    'text-center bg-transparent transition-shadow z-10 rounded-none',
    'text-black',
    selected && 'shadow-blue-500 shadow-[inset_0_-2px_0]',
  ],
  vertical: [
    ' first:mt-4 last:mb-4 my-1 mx-0 py-2 px-4',
    'text-left rounded-l-sm rounded-r-none transition-all',
    'w-full overflow-hidden',
    selected && 'shadow-1',
    selected && [
      'before:absolute',
      'before:content-[""]',
      'before:bottom-0',
      'before:left-0',
      'before:top-0',
      'before:w-[3px]',
      'before:bg-blue-500',
    ],
    selected
      ? 'bg-gray-50 text-black'
      : 'bg-gray-100 hover:bg-gray-200 text-graphite-700 hover:text-black',
  ],
})

const classesByVariant = {
  scrollable: 'shrink-0 max-w-[264px]',
  fullWidth: 'shrink flex-grow basis-0',
}

export const Tab = forwardRef<HTMLButtonElement, Props>(function Tab(
  props,
  ref
) {
  const {
    disabled,
    value,
    label,
    icon,
    titleCase: propsTitleCase,
    description,
    avatar,
    className,
    onClick,
    ...rest
  } = props
  const titleCase = useTitleCase(propsTitleCase)
  const {
    value: selectedValue,
    onChange,
    orientation,
    variant,
  } = useTabsContext()
  const isHorizontal = orientation === 'horizontal'
  const selected = value === selectedValue

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onChange) {
      onChange(event, value as TabsValueType)
    }
    onClick?.(event)
  }

  const renderLabel = getLabelComponent({
    avatar,
    description,
    disabled,
    label,
    orientation,
    titleCase,
  })

  return (
    <button
      className={twMerge(
        getOpacityClass(selected, !!disabled, orientation),
        rootClassesByOrientation(selected)[orientation],
        classesByVariant[variant],
        disabled ? 'cursor-default text-gray-500' : 'cursor-pointer',
        disabled && 'pointer-events-none',
        icon && isHorizontal && 'min-h-0 pt-0 pr-6',
        'min-w-0 sm:min-w-[160px] md:min-w-[auto]',
        'border-0 cursor-pointer inline-flex outline-none',
        'items-center select-none align-middle appearance-none',
        'justify-center no-underline [-webkit-tap-highlight-color:transparent]',
        'normal-case whitespace-normal leading-4',
        'relative ',
        className
      )}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={handleClick}
      role='tab'
      aria-selected={selected}
      aria-disabled={disabled}
      type='button'
      {...rest}
    >
      <span
        className={twJoin('w-full', wrapperClassesByOrientation[orientation])}
      >
        {renderLabel}
        {icon && <span className='absolute right-0 mb-0'>{icon}</span>}
      </span>
    </button>
  )
})

Tab.displayName = 'Tab'

const getLabelComponent = ({
  avatar,
  description,
  disabled,
  label,
  orientation,
  titleCase,
}: {
  avatar?: string | null
  description?: string
  disabled?: boolean
  label?: React.ReactNode
  orientation: 'horizontal' | 'vertical'
  titleCase?: boolean
}): React.ReactNode => {
  if (!label) {
    return null
  }
  const isHorizontal = orientation === 'horizontal'
  const isCustomLabel = typeof label !== 'string'
  const Label = () => (
    <TabLabel titleCase={titleCase} label={label} orientation={orientation} />
  )

  if (isHorizontal || isCustomLabel) {
    return <Label />
  }
  if (typeof avatar === 'undefined') {
    return (
      <>
        <Label />
        {description && (
          <TabDescription disabled={disabled}>{description}</TabDescription>
        )}
      </>
    )
  }

  return (
    <UserBadge renderName={Label} name={label} avatar={avatar}>
      {description && (
        <TabDescription disabled={disabled}>{description}</TabDescription>
      )}
    </UserBadge>
  )
}

export default Tab
