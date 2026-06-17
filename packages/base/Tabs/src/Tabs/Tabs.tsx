import type { ReactNode, ForwardedRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { Tabs as BaseUITabs } from '@base-ui/react/tabs'
import type { BaseProps } from '@toptal/picasso-shared'
import { toReactEvent } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

export type TabsValueType = string | number | null

export interface Props<V extends TabsValueType> extends BaseProps {
  /** Tabs content containing Tab components */
  children: ReactNode

  /** Callback fired when the value changes. */
  onChange?: (event: React.ChangeEvent<{}> | null, value: V) => void

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

const horizontalIndicatorClasses = [
  'absolute bottom-0 left-0 h-[2px] bg-blue-500 z-10',
  'w-[var(--active-tab-width)]',
  'translate-x-[var(--active-tab-left)]',
  // Tailwind v4 drives translate-x via the `translate` property (not
  // `transform`), so the slide transition must target `translate`.
  'transition-[translate,width] duration-300 ease-in-out',
]

const withFallbackValue = (children: ReactNode): ReactNode => {
  let index = -1

  return React.Children.map(children, child => {
    if (!React.isValidElement<{ value?: TabsValueType }>(child)) {
      return child
    }

    index += 1

    if (child.props.value === undefined) {
      return React.cloneElement(child, { value: index })
    }

    return child
  })
}

const Tabs = forwardRef(
  <V extends TabsValueType = TabsValueType>(
    {
      children,
      orientation = 'horizontal',
      onChange,
      value,
      variant = 'scrollable',
      className,
      ...rest
    }: Props<V>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
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
        <BaseUITabs.Root
          {...rest}
          ref={ref}
          className={twMerge(
            'relative min-h-0 flex overflow-hidden',
            classesByOrientation[orientation].root,
            classesByVariant[variant].root,
            className
          )}
          onValueChange={(val, { event }) =>
            onChange?.(
              toReactEvent<React.ChangeEvent<HTMLButtonElement>>(event),
              val as V
            )
          }
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
            <BaseUITabs.List
              className={twJoin('relative flex', isVertical && 'flex-col')}
            >
              {withFallbackValue(children)}
              {!isVertical && (
                <BaseUITabs.Indicator
                  className={twJoin(horizontalIndicatorClasses)}
                />
              )}
            </BaseUITabs.List>
          </div>
        </BaseUITabs.Root>
      </TabsContext.Provider>
    )
  }
) as <V extends TabsValueType = TabsValueType>(
  props: Props<V> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element

export default Tabs
