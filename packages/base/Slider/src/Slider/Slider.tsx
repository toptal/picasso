import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { Slider as BaseUISlider } from '@base-ui/react/slider'
import type { SliderRoot } from '@base-ui/react/slider'
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

const toArray = (val: number | number[] | undefined): number[] => {
  if (Array.isArray(val)) {
    return val
  }

  if (typeof val === 'number') {
    return [val]
  }

  return [0]
}

type MarkEntry = {
  value: number
  active: boolean
  position: number
  index: number
}

const computeMarkEntries = ({
  min,
  max,
  stepValue,
  currentValues,
  isRange,
}: {
  min: number
  max: number
  stepValue: number
  currentValues: number[]
  isRange: boolean
}): MarkEntry[] => {
  const count = Math.floor((max - min) / stepValue) + 1
  const lo = currentValues[0]
  const hi = currentValues[currentValues.length - 1]

  return Array.from({ length: count }, (_, i) => {
    const markValue = min + i * stepValue
    const inRange = isRange
      ? markValue >= lo && markValue <= hi
      : markValue <= hi
    const position = ((markValue - min) / (max - min)) * 100

    return { value: markValue, active: inRange, position, index: i }
  })
}

const resolveCurrentValue = (
  value: number | number[] | undefined,
  internalValue: number | number[]
): number | number[] => (value !== undefined ? value : internalValue)

const detectIsRange = (
  value: number | number[] | undefined,
  defaultValue: number | number[]
): boolean =>
  Array.isArray(value) || (value === undefined && Array.isArray(defaultValue))

const detectThumbHidden = (
  hideThumbOnEmpty: boolean | undefined,
  value: number | number[] | undefined
): boolean =>
  Boolean(hideThumbOnEmpty) && (typeof value === 'undefined' || value === null)

export const Slider = forwardRef<HTMLDivElement, Props>(function Slider(
  { defaultValue = 0, min = 0, max = 100, tooltip = 'off', ...props },
  ref
) {
  const {
    marks,
    value,
    tooltipFormat,
    step,
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
  const sliderRef = useCombinedRefs<HTMLDivElement>(
    ref,
    useRef<HTMLDivElement>(null)
  )

  const [internalValue, setInternalValue] = useState<number | number[]>(
    value !== undefined ? value : defaultValue
  )
  const currentValue = resolveCurrentValue(value, internalValue)
  const currentValues = toArray(currentValue)
  const isRange = detectIsRange(value, defaultValue)

  // The rootMargin is not working correctly in the storybooks iframe
  // To test properly we can open the iframe in new window
  const { isOnScreen, isObserved } = useOnScreen({
    ref: containerRef,
    rootMargin: '-24px 0px 0px 0px',
    threshold: 1,
  })

  const { isPartiallyOverlapped, handleValueLabelOnRender } = useLabelOverlap({
    value: currentValue,
    // until IntersectionObserver starts observing the element, we don't render the tooltip
    isTooltipRendered: isObserved,
  })

  const isThumbHidden = detectThumbHidden(hideThumbOnEmpty, value)

  const handleValueChange = useCallback<
    NonNullable<SliderRoot.Props['onValueChange']>
  >(
    (newValue, details) => {
      const normalized: number | number[] = Array.isArray(newValue)
        ? [...newValue]
        : (newValue as number)

      setInternalValue(normalized)
      onChange?.(details.event as Event, normalized, details.activeThumbIndex)
    },
    [onChange]
  )

  const stepValue = step ?? 1
  const markEntries = useMemo(
    () =>
      marks
        ? computeMarkEntries({
            min,
            max,
            stepValue,
            currentValues,
            isRange,
          })
        : [],
    [marks, min, max, stepValue, currentValues, isRange]
  )

  const thumbCount = isRange ? toArray(value ?? defaultValue).length : 1

  return (
    <div
      ref={containerRef}
      className={twMerge('my-[6px] mx-0', className)}
      style={style}
    >
      <BaseUISlider.Root
        ref={sliderRef}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        name={name}
        id={id}
        data-testid={dataTestid}
        data-private={dataPrivate}
        onValueChange={handleValueChange}
        className='block cursor-pointer w-full relative py-[6px] -my-[6px]'
      >
        <BaseUISlider.Control className='block w-full h-full relative'>
          <BaseUISlider.Track className='block absolute w-full h-[1px] opacity-[0.24] rounded-none bg-gray-500' />
          <BaseUISlider.Indicator
            className={twJoin(
              'block absolute h-[1px]',
              disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
            )}
          />
          {markEntries.map(mark => (
            <SliderMark
              key={mark.index}
              dataIndex={mark.index}
              markActive={mark.active}
              forceInactive={Boolean(disableTrackHighlight)}
              value={currentValue}
              position={mark.position}
            />
          ))}
          {Array.from({ length: thumbCount }, (_, i) => (
            <BaseUISlider.Thumb
              key={i}
              index={i}
              onFocus={i === 0 ? onFocus : undefined}
              onBlur={i === 0 ? onBlur : undefined}
              className={twJoin(
                'group/thumb flex justify-center items-center w-[15px] h-[15px]',
                'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
                '-mt-[7px] -ml-[6px] outline-0 absolute transition-shadow cursor-pointer',
                isThumbHidden && 'hidden'
              )}
            >
              <SliderValueLabel
                index={i}
                value={currentValues[i] ?? 0}
                tooltip={isObserved ? tooltip : 'off'}
                tooltipFormat={tooltipFormat}
                onRender={handleValueLabelOnRender}
                yPlacement={isOnScreen ? 'top' : 'bottom'}
                isOverlaped={isPartiallyOverlapped}
              />
            </BaseUISlider.Thumb>
          ))}
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
