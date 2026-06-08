import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import { Slider as BaseUISlider } from '@base-ui/react/slider'
import { useCombinedRefs, useOnScreen } from '@toptal/picasso-utils'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps } from '@toptal/picasso-shared'

import SliderMark from '../SliderMark'
import SliderValueLabel from '../SliderValueLabel'
import { useLabelOverlap } from './hooks'

export interface Props extends BaseProps {
  /** Minimum slider value */
  min?: number
  /** Maximum slider value */
  max?: number
  /** Controlled value of the component */
  value?: number | number[]
  /** The default value. Use when the component is not controlled */
  defaultValue?: number | number[]
  /** Step for the thumb movement */
  step?: number
  /** Whether marks are shown or not */
  marks?: boolean
  /** Whether component is disabled or not */
  disabled?: boolean
  /** Controls when tooltip is displayed:
  - **auto** the value tooltip will display when the thumb is hovered or focused.
  - **on** will display persistently.
  - **off** will never display
  */
  tooltip?: 'on' | 'auto' | 'off'
  /** The format function the value tooltip's value. */
  tooltipFormat?: string | ((value: number, index: number) => React.ReactNode)
  /** Callback invoked when slider changes its state. */
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void
  /** Callback invoked on focus */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void
  /** Callback invoked on blur */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void
  /** Hide thumb when value is undefined or null. Works only when the component is controlled. */
  hideThumbOnEmpty?: boolean
  /** Disable track highlight. */
  disableTrackHighlight?: boolean
  /**
   * Name attribute of the `input` element.
   */
  name?: string
  /**
   * Id attribute of the `input` element.
   */
  id?: string
}

const formatTooltipValue = (
  value: number,
  index: number,
  tooltipFormat?: Props['tooltipFormat']
): React.ReactNode => {
  if (typeof tooltipFormat === 'function') {
    return tooltipFormat(value, index)
  }

  if (typeof tooltipFormat === 'string') {
    return tooltipFormat
  }

  return value
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  { defaultValue = 0, min = 0, max = 100, step = 1, tooltip = 'off', ...props },
  ref
) {
  const {
    marks,
    value,
    tooltipFormat,
    disabled,
    onChange,
    onBlur,
    onFocus,
    hideThumbOnEmpty,
    disableTrackHighlight,
    className,
    style,
    name,
    id,
    'data-private': dataPrivate,
    'data-testid': dataTestid,
  } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))
  // Local typed binding at the @base-ui/react boundary. SliderRoot renders
  // <div> and types its ref as RefObject<HTMLDivElement>; sliderRef is widened
  // to HTMLElement for public back-compat. HTMLDivElement IS HTMLElement at
  // runtime, so the narrow is sound at this kit boundary (not consumer-facing).
  const baseUiSliderRef = sliderRef as React.RefObject<HTMLDivElement>

  // The rootMargin is not working correctly in the storybooks iframe
  // To test properly we can open the iframe in new window
  const { isOnScreen, isObserved } = useOnScreen({
    ref: containerRef,
    rootMargin: '-24px 0px 0px 0px',
    threshold: 1,
  })

  const { isPartiallyOverlapped, handleValueLabelOnRender } = useLabelOverlap({
    value,
    // until IntersectionObserver starts observing the element, we don't render the tooltip
    isTooltipRendered: isObserved,
  })

  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)

  const handleValueChange = useCallback(
    (
      newValue: number | number[],
      eventDetails: { event: Event; activeThumbIndex: number }
    ) => {
      onChange?.(eventDetails.event, newValue, eventDetails.activeThumbIndex)
    },
    [onChange]
  )

  const marksList = useMemo(() => {
    if (!marks) {
      return []
    }

    const list: number[] = []

    for (let markValue = min; markValue <= max; markValue += step) {
      list.push(markValue)
    }

    return list
  }, [marks, min, max, step])

  // Derive active state from the live value (`state.values`), not from
  // `value ?? defaultValue`, which would freeze marks/labels in uncontrolled mode.
  const isMarkActive = (
    markValue: number,
    values: readonly number[]
  ): boolean => {
    if (values.length > 1) {
      const [start, end] = values

      return (
        markValue >= Math.min(start, end) && markValue <= Math.max(start, end)
      )
    }

    return markValue <= (values[0] ?? min)
  }

  const thumbClassName = twJoin(
    'group/thumb flex justify-center items-center w-[19px] h-[19px]',
    'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
    // No `contain-layout`/`transform-gpu` needed: @base-ui/react sets
    // `translate: -50% -50%` on the thumb (kept via rung -1), which already
    // establishes the containing block that sizes the nested `position: fixed`
    // range <input> to the thumb instead of the viewport.
    'outline-0 transition-shadow cursor-pointer',
    isThumbHidden && 'hidden'
  )

  // Public Props.onFocus/onBlur are typed for HTMLElement; @base-ui/react SliderThumb's
  // onFocus/onBlur are forwarded to the nested <input>, so the handler signature narrows
  // to HTMLInputElement. Cast at the helper boundary, not at the JSX call site.
  const handleThumbFocus = onFocus as
    | React.FocusEventHandler<HTMLInputElement>
    | undefined
  const handleThumbBlur = onBlur as
    | React.FocusEventHandler<HTMLInputElement>
    | undefined

  const renderThumb = (thumbValue: number, index: number) => (
    <BaseUISlider.Thumb
      key={index}
      index={index}
      className={thumbClassName}
      onFocus={handleThumbFocus}
      onBlur={handleThumbBlur}
      role='slider'
    >
      <SliderValueLabel
        index={index}
        value={thumbValue}
        tooltip={isObserved ? tooltip : 'off'}
        onRender={handleValueLabelOnRender}
        yPlacement={isOnScreen ? 'top' : 'bottom'}
        isOverlaped={isPartiallyOverlapped}
      >
        {formatTooltipValue(thumbValue, index, tooltipFormat)}
      </SliderValueLabel>
    </BaseUISlider.Thumb>
  )

  return (
    <div
      ref={containerRef}
      className={twMerge('mb-[4px] mt-[5px] mx-0 h-[15px]', className)}
      style={style}
    >
      <BaseUISlider.Root
        ref={baseUiSliderRef}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        // @base-ui/react defaults thumbCollisionBehavior to 'push' (thumbs shove
        // each other and stay merged). '@mui/base' swapped thumbs when dragged
        // past each other, so 'swap' preserves the prior range-slider behaviour
        // (drag one thumb through the other and the range re-separates).
        thumbCollisionBehavior='swap'
        disabled={disabled}
        data-testid={dataTestid}
        data-private={dataPrivate}
        onValueChange={handleValueChange}
        name={name}
        id={id}
        className='block cursor-pointer width-full relative'
      >
        <BaseUISlider.Control className='block absolute inset-0 h-[15px]'>
          <BaseUISlider.Track
            className='block w-full h-[1px] top-[7px] rounded-none bg-gray-500'
            render={(trackProps, { values }) => (
              <div {...trackProps}>
                <BaseUISlider.Indicator
                  className={twJoin(
                    'block h-[1px]',
                    disableTrackHighlight ? 'bg-gray-500' : 'bg-blue-500'
                  )}
                />

                {marksList.map((markValue, idx) => {
                  const percent = ((markValue - min) / (max - min)) * 100

                  return (
                    <SliderMark
                      key={markValue}
                      markActive={isMarkActive(markValue, values)}
                      value={values[0]}
                      style={{ left: `${percent}%` }}
                      forceInactive={Boolean(disableTrackHighlight)}
                      data-index={idx}
                    />
                  )
                })}

                {values.map((thumbValue, index) =>
                  renderThumb(thumbValue, index)
                )}
              </div>
            )}
          />
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
