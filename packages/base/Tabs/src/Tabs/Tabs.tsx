import type { ReactNode } from 'react'
import React, { forwardRef, useState } from 'react'
import type { TabsProps } from '@mui/base/Tabs'
import { Tabs as MUITabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (
    event: React.ChangeEvent<{}> | null,
    value: TabsProps['value']
  ) => void

  /** The value of the currently selected Tab. If you don't want any selected Tab, you can set this property to false. */
  value: TabsProps['value']

  /** The tabs orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'

  /** Determines additional display behavior of the tabs */
  variant?: 'scrollable' | 'fullWidth'
}

export const TabsContext = React.createContext<{
  orientation: 'horizontal' | 'vertical'
  variant: 'scrollable' | 'fullWidth'
}>({ orientation: 'horizontal', variant: 'scrollable' })

// eslint-disable-next-line react/display-name
export const Tabs = forwardRef<HTMLDivElement, Props>(function Tabs(
  props,
  ref
) {
  const {
    children,
    orientation = 'horizontal',
    onChange,
    value,
    variant = 'scrollable',
    className,
    ...rest
  } = props

  const [contextValue] = useState({
    orientation,
    variant,
  })

  const classesByOrientation = {
    vertical: 'w-[200px] m-0 flex-col',
    horizontal:
      'after:absolute after:content-[""] after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gray-500 after:z-0',
  }

  const classesByVariant = {
    scrollable: 'overflow-x-auto',
    fullWidth: '',
  }

  const isVertical = orientation === 'vertical'

  return (
    <TabsContext.Provider value={contextValue}>
      <MUITabs
        {...rest}
        className=''
        slotProps={{
          root: {
            ref,
            className: twMerge(
              'relative min-h-0 flex overflow-hidden',
              classesByOrientation[orientation],
              classesByVariant[variant],
              className
            ),
          },
        }}
        onChange={onChange}
        value={value}
        orientation={orientation}
      >
        <div
          className={twJoin(
            isVertical && 'pl-2',
            variant === 'fullWidth' && 'w-full overflow-hidden',
            'flex-auto inline-block relative whitespace-nowrap'
          )}
        >
          <TabsList className={twJoin('flex', isVertical && 'flex-col')}>
            {children}
          </TabsList>
        </div>
      </MUITabs>
    </TabsContext.Provider>
  )
})

Tabs.displayName = 'Tabs'

export default Tabs
