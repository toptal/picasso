import type { ReactNode, HTMLAttributes, ReactElement } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { TabProps } from '@mui/base/Tab'
import { Tab as MUITab } from '@mui/base/Tab'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { UserBadge } from '@toptal/picasso-user-badge'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { TabsContext } from '../Tabs/Tabs'
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

  /** You can provide your own value. Otherwise, we fallback to the child position index */
  value?: TabProps['value']

  /** The label element */
  label?: ReactNode

  /** The Icon element */
  icon?: ReactElement

  /** Image URL */
  avatar?: string | null

  /** Description */
  description?: string

  // Properties below are managed by Tabs component

  selected?: boolean
  onChange?: TabProps['onChange']
  onClick?: TabProps['onClick']
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
    'm-0 [&:not(:last-child)]:mr-8 pt-[0.5625rem] pb-[0.4375rem] px-0',
    'text-center bg-transparent transition-shadow z-10 rounded-none',
    'text-inheritColor',
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
    onChange,
    onClick,
    titleCase: propsTitleCase,
    description,
    avatar,
    className,
    ...rest
  } = props
  const titleCase = useTitleCase(propsTitleCase)
  const { orientation, variant } = useContext(TabsContext)
  const isHorizontal = orientation === 'horizontal'

  const renderLabel = getLabelComponent({
    avatar,
    description,
    disabled,
    label,
    orientation,
    titleCase,
  })

  return (
    <MUITab
      className=''
      {...rest}
      ref={ref}
      tabIndex={0}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onClick={onClick}
      slotProps={{
        root: ownerState => {
          return {
            className: twMerge(
              getOpacityClass(
                ownerState.selected,
                ownerState.disabled,
                orientation
              ),
              rootClassesByOrientation(ownerState.selected)[orientation],
              classesByVariant[variant],
              ownerState.disabled
                ? 'cursor-default text-gray-500'
                : 'cursor-pointer',
              ownerState.disabled && 'pointer-events-none',
              icon && isHorizontal && 'min-h-0 pt-[0.5625rem] pr-6',
              'min-w-0 sm:min-w-[160px] md:min-w-[auto]',
              'border-0 cursor-pointer inline-flex outline-none',
              'items-center select-none align-middle appearance-none',
              'justify-center no-underline [-webkit-tap-highlight-color:transparent]',
              'normal-case whitespace-normal leading-4',
              'relative ',
              className
            ),
          }
        },
      }}
    >
      <span
        className={twJoin('w-full', wrapperClassesByOrientation[orientation])}
      >
        {renderLabel}
        {icon && <span className='absolute right-0 mb-0 h-4'>{icon}</span>}
      </span>
    </MUITab>
  )
})

Tab.defaultProps = {}

Tab.displayName = 'Tab'

type GetLabelComponentProps = {
  avatar?: string | null
  description?: string
  disabled?: boolean
  label?: React.ReactNode
  orientation: 'horizontal' | 'vertical'
  titleCase?: boolean
}
const getLabelComponent = ({
  avatar,
  description,
  disabled,
  label,
  orientation,
  titleCase,
}: GetLabelComponentProps): React.ReactNode => {
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
