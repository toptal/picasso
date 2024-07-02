import type { ReactNode } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { Tabs as MUITabs } from '@mui/base/Tabs'
import { TabsList } from '@mui/base/TabsList'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

export type TabsValueType = string | number | null

export interface Props<V extends TabsValueType> extends BaseProps {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: React.SyntheticEvent | null, value: V) => void

  /**
   * The value of the currently selected Tab.
   * If you don't want any selected Tab, you can set this property to null.
   */
  value: V

  /** The tabs orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'

  /** Determines additional display behavior of the tabs */
  variant?: 'scrollable' | 'fullWidth'
}

export const TabsContext = React.createContext<{
  orientation: 'horizontal' | 'vertical'
  variant: 'scrollable' | 'fullWidth'
}>({ orientation: 'horizontal', variant: 'scrollable' })

const indicatorClasses = [
  'after:absolute',
  'after:content-[""]',
  'after:bottom-0',
  'after:left-0',
  'after:right-0',
  'after:h-[1px]',
  'after:bg-gray-500',
  'after:z-0',
]

const classesByOrientation = {
  vertical: {
    root: 'w-[200px] m-0 flex-col',
    scroller: 'pl-2',
  },
  horizontal: {
    root: '',
    scroller: indicatorClasses,
  },
} as const

const classesByVariant = {
  scrollable: {
    root: 'overflow-x-auto',
    scroller: '',
  },
  fullWidth: {
    root: '',
    scroller: 'w-full overflow-hidden',
  },
} as const

// eslint-disable-next-line react/display-name
const TabsComponent = <V extends TabsValueType>(
  props: Props<V>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    children,
    orientation = 'horizontal',
    onChange,
    value,
    variant = 'scrollable',
    className,
    ...rest
  } = props

  const contextValue = useMemo(
    () => ({
      orientation,
      variant,
    }),
    [orientation, variant]
  )

  const isVertical = orientation === 'vertical'

  return (
    <TabsContext.Provider value={contextValue}>
      <MUITabs
        {...rest}
        slotProps={{
          root: {
            ref,
            className: twMerge(
              'relative min-h-0 flex overflow-hidden',
              classesByOrientation[orientation].root,
              classesByVariant[variant].root,
              className
            ),
          },
        }}
        onChange={(event, newValue) => onChange?.(event, newValue as V)}
        value={value}
        orientation={orientation}
      >
        <div
          className={twJoin(
            classesByVariant[variant].scroller,
            classesByOrientation[orientation].scroller,
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
}

export const Tabs = forwardRef(TabsComponent)

Tabs.displayName = 'Tabs'

export default Tabs
