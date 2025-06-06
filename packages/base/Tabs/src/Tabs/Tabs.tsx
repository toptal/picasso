import type { ReactNode, ChangeEvent, Ref, ReactElement } from 'react'
import React, { forwardRef, useMemo, useCallback } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { TabsContext } from './TabsContext'
import type { TabProps } from '../Tab'
import { Tab } from '../Tab'

export interface TabsProps<T = number> extends BaseProps {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: ChangeEvent<{}>, value: T) => void

  /**
   * The value of the currently selected Tab.
   * If you don't want any selected Tab, you can set this property to null.
   */
  value: T

  /** The tabs orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'

  /** Determines additional display behavior of the tabs */
  variant?: 'scrollable' | 'fullWidth'

  /** The default value. Use when the component is not controlled. */
  defaultValue?: T

  /** The direction of the text. */
  direction?: 'ltr' | 'rtl'
}

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
}

const classesByVariant = {
  scrollable: {
    root: 'overflow-x-auto',
    scroller: '',
  },
  fullWidth: {
    root: '',
    scroller: 'w-full overflow-hidden',
  },
}

// eslint-disable-next-line func-style
function TabsInner<T = number>(props: TabsProps<T>, ref: Ref<HTMLDivElement>) {
  const {
    children,
    orientation = 'horizontal',
    onChange,
    value: valueProp,
    defaultValue,
    variant = 'scrollable',
    direction = 'ltr',
    className,
    ...rest
  } = props

  const [value, setValue] = React.useState<T>(defaultValue as T)
  const isControlled = valueProp !== undefined
  const currentValue = isControlled ? valueProp : value

  const handleChange = useCallback(
    (event: ChangeEvent<{}>, newValue: T) => {
      if (!isControlled) {
        setValue(newValue)
      }
      onChange?.(event, newValue)
    },
    [isControlled, onChange]
  )

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      onChange: handleChange,
      orientation,
      variant,
      direction,
    }),
    [currentValue, handleChange, orientation, variant, direction]
  )

  const isVertical = orientation === 'vertical'

  const childrenWithIndex = React.Children.map(children, (child, idx) => {
    if (
      React.isValidElement(child) &&
      child.type === Tab &&
      child.props.value === undefined
    ) {
      return React.cloneElement(child as React.ReactElement<TabProps<T>>, {
        value: idx as T,
      })
    }

    return child
  })

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        {...rest}
        ref={ref}
        data-component-type='tabs'
        className={twMerge(
          'relative min-h-0 flex overflow-hidden',
          classesByOrientation[orientation].root,
          classesByVariant[variant].root,
          className
        )}
        aria-orientation={orientation}
      >
        <div
          className={twJoin(
            classesByVariant[variant].scroller,
            classesByOrientation[orientation].scroller,
            'flex-auto inline-block relative whitespace-nowrap'
          )}
        >
          <div
            className={twJoin('flex', isVertical && 'flex-col')}
            role='tablist'
            tabIndex={-1}
          >
            {childrenWithIndex}
          </div>
        </div>
      </div>
    </TabsContext.Provider>
  )
}

TabsInner.displayName = 'Tabs'

export const Tabs = forwardRef(TabsInner) as <T = number>(
  props: TabsProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement | null

export default Tabs
