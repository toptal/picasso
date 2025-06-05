import type { ReactNode, ChangeEvent } from 'react'
import React, { forwardRef, useMemo, useCallback } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { TabsContext, type TabsValueType } from './TabsContext'

export interface Props<V extends TabsValueType> extends BaseProps {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: ChangeEvent<{}>, value: V) => void

  /**
   * The value of the currently selected Tab.
   * If you don't want any selected Tab, you can set this property to null.
   */
  value: V

  /** The tabs orientation (layout flow direction). */
  orientation?: 'horizontal' | 'vertical'

  /** Determines additional display behavior of the tabs */
  variant?: 'scrollable' | 'fullWidth'

  /** The default value. Use when the component is not controlled. */
  defaultValue?: V

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

export const Tabs = forwardRef<HTMLDivElement, Props<TabsValueType>>(
  function Tabs(props, ref) {
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

    const [value, setValue] = React.useState<TabsValueType>(
      defaultValue ?? null
    )
    const isControlled = valueProp !== undefined
    const currentValue = isControlled ? valueProp : value

    const handleChange = useCallback(
      (event: ChangeEvent<{}>, newValue: TabsValueType) => {
        if (!isControlled) {
          setValue(newValue)
        }
        onChange?.(event, newValue as TabsValueType)
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
        // @ts-expect-error: type check for Picasso Tab
        (child.type.displayName === 'Tab' || child.type.name === 'Tab') &&
        child.props.value === undefined
      ) {
        return React.cloneElement(child as React.ReactElement<any>, {
          value: idx,
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
)

Tabs.displayName = 'Tabs'

export default Tabs
