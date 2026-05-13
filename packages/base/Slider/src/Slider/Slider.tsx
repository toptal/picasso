import type { FocusEventHandler } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Slider as BaseUISlider } from '@base-ui/react/slider'
import type { SliderRootChangeEventDetails } from '@base-ui/react/slider'
import { useOnScreen } from '@toptal/picasso-utils'
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

const formatValueLabel = (
  value: number,
  index: number,
  format?: string | ((value: number, index: number) => React.ReactNode)
): React.ReactNode => {
  if (typeof format === 'function') {
    return format(value, index)
  }

  if (typeof format === 'string') {
    return format
  }

  return value
}

const generateMarkPositions = (
  min: number,
  max: number,
  step: number
): number[] => {
  const positions: number[] = []
  const range = max - min

  if (range <= 0 || step <= 0) {
    return positions
  }

  for (let mark = min; mark <= max; mark += step) {
    positions.push(mark)
  }

  return positions
}

const resolveThumbValues = (
  value: number | number[] | undefined,
  defaultValue: number | number[],
  min: number
): number[] => {
  if (Array.isArray(value)) {
    return value
  }

  if (typeof value === 'number') {
    return [value]
  }

  if (Array.isArray(defaultValue)) {
    return defaultValue
  }

  return [typeof defaultValue === 'number' ? defaultValue : min]
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  { defaultValue = 0, min = 0, max = 100, tooltip = 'off', ...props },
  ref
) {
  const {
    marks,
    value,
    tooltipFormat,
    step = 1,
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

  const isRange = Array.isArray(value) || Array.isArray(defaultValue)
  const thumbValues = resolveThumbValues(value, defaultValue, min)

  const handleValueChange = (
    newValue: number | readonly number[],
    eventDetails: SliderRootChangeEventDetails
  ) => {
    if (!onChange) {
      return
    }

    const normalizedValue = Array.isArray(newValue)
      ? [...newValue]
      : (newValue as number)

    onChange(
      eventDetails.event as unknown as Event,
      normalizedValue,
      eventDetails.activeThumbIndex
    )
  }

  const handleFocus = onFocus as
    | FocusEventHandler<HTMLInputElement>
    | undefined
  const handleBlur = onBlur as FocusEventHandler<HTMLInputElement> | undefined

  const thumbClassName = twJoin(
    'group/thumb flex justify-center items-center w-[15px] h-[15px]',
    'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
    'outline-0 absolute transition-shadow cursor-pointer',
    isThumbHidden && 'hidden'
  )

  const indicatorClassName = twJoin(
    'block h-[1px]',
    disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
  )

  const markPositions = marks ? generateMarkPositions(min, max, step) : []

  return (
    <div
      ref={containerRef}
      className={twMerge('my-[6px] mx-0', className)}
      style={style}
    >
      <BaseUISlider.Root
        ref={ref as React.Ref<HTMLDivElement>}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        name={name}
        data-testid={dataTestid}
        data-private={dataPrivate}
        onValueChange={handleValueChange}
        className='block cursor-pointer w-full relative py-[6px] -my-[6px]'
      >
        <BaseUISlider.Control className='block w-full relative h-[1px]'>
          <BaseUISlider.Track className='block absolute w-full h-[1px] opacity-[0.24] rounded-none bg-gray-500'>
            <BaseUISlider.Indicator className={indicatorClassName} />
          </BaseUISlider.Track>
          {marks &&
            markPositions.map((markValue, index) => (
              <SliderMark
                key={`mark-${markValue}`}
                index={index}
                markValue={markValue}
                sliderValue={value}
                positionPercent={
                  max === min ? 0 : ((markValue - min) / (max - min)) * 100
                }
                forceInactive={Boolean(disableTrackHighlight)}
              />
            ))}
          {thumbValues.map((thumbValue, index) => {
            const thumbId = index === 0 ? id : undefined
            const label = formatValueLabel(thumbValue, index, tooltipFormat)

            return (
              <BaseUISlider.Thumb
                // eslint-disable-next-line react/no-array-index-key
                key={`thumb-${index}`}
                index={index}
                id={thumbId}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={thumbClassName}
              >
                <SliderValueLabel
                  index={index}
                  value={thumbValue}
                  tooltip={isObserved ? tooltip : 'off'}
                  onRender={handleValueLabelOnRender}
                  yPlacement={isOnScreen ? 'top' : 'bottom'}
                  isOverlaped={isPartiallyOverlapped}
                >
                  {label}
                </SliderValueLabel>
              </BaseUISlider.Thumb>
            )
          })}
          {!isRange && thumbValues.length === 0 && (
            <BaseUISlider.Thumb
              index={0}
              id={id}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={thumbClassName}
            />
          )}
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
