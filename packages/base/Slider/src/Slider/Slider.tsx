import type { ReactNode } from 'react'
import React, { forwardRef, useMemo, useRef } from 'react'
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

const computeMarkValues = ({
  marks,
  min,
  max,
  step,
}: {
  marks: boolean | undefined
  min: number
  max: number
  step?: number
}): number[] => {
  if (!marks) {
    return []
  }
  const inc = step && step > 0 ? step : 1
  const values: number[] = []

  for (let next = min; next <= max; next += inc) {
    values.push(next)
  }

  return values
}

const isMarkActive = (
  markValue: number,
  value: number | number[] | undefined
): boolean => {
  if (value === undefined || value === null) {
    return false
  }
  if (Array.isArray(value)) {
    const [first, second] = value
    const lo = Math.min(first, second)
    const hi = Math.max(first, second)

    return markValue >= lo && markValue <= hi
  }

  return markValue <= value
}

const formatValue = (
  raw: number,
  index: number,
  tooltipFormat: Props['tooltipFormat']
): ReactNode => {
  if (typeof tooltipFormat === 'function') {
    return tooltipFormat(raw, index)
  }
  if (typeof tooltipFormat === 'string') {
    return tooltipFormat
  }

  return raw
}

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

  const markValues = useMemo(
    () => computeMarkValues({ marks, min, max, step }),
    [marks, min, max, step]
  )

  const thumbCount = Array.isArray(value)
    ? value.length
    : Array.isArray(defaultValue)
    ? defaultValue.length
    : 1

  const handleValueChange = (
    newValue: number | readonly number[],
    eventDetails: BaseUISlider.Root.ChangeEventDetails
  ) => {
    if (!onChange) {
      return
    }

    const mapped = Array.isArray(newValue)
      ? ([...newValue] as number[])
      : (newValue as number)

    onChange(
      eventDetails.event as unknown as Event,
      mapped,
      eventDetails.activeThumbIndex
    )
  }

  const thumbClassName = twJoin(
    'group/thumb flex justify-center items-center w-[15px] h-[15px]',
    'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
    'outline-0 [&_input]:outline-none absolute transition-shadow cursor-pointer',
    isThumbHidden && 'hidden'
  )

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
        data-testid={dataTestid}
        data-private={dataPrivate}
        onFocus={onFocus}
        onBlur={onBlur}
        onValueChange={handleValueChange}
        name={name}
        id={id}
        className='block cursor-pointer width-full relative py-[6px] -my-[6px]'
      >
        <BaseUISlider.Control className='block absolute top-0 left-0 right-0 h-[13px]'>
          <BaseUISlider.Track className='block absolute w-full h-[1px] top-1/2 -translate-y-1/2 rounded-none bg-gray-500/24'>
            <BaseUISlider.Indicator
              className={twJoin(
                'block h-[1px]',
                disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
              )}
            />
          </BaseUISlider.Track>
          {(thumbCount === 2 ? ['range-low', 'range-high'] : ['single']).map(
            (thumbKey, index) => {
              const currentVal = Array.isArray(value)
                ? (value[index] as number)
                : (value as number | undefined) ?? min

              return (
                <BaseUISlider.Thumb
                  key={thumbKey}
                  index={index}
                  className={thumbClassName}
                  role='slider'
                >
                  <SliderValueLabel
                    index={index}
                    value={currentVal}
                    tooltip={isObserved ? tooltip : 'off'}
                    yPlacement={isOnScreen ? 'top' : 'bottom'}
                    isOverlaped={isPartiallyOverlapped}
                    onRender={handleValueLabelOnRender}
                  >
                    {formatValue(currentVal, index, tooltipFormat)}
                  </SliderValueLabel>
                </BaseUISlider.Thumb>
              )
            }
          )}
          {markValues.map((markValue, index) => {
            const percent = ((markValue - min) / (max - min)) * 100

            return (
              <SliderMark
                key={markValue}
                data-index={index}
                value={value}
                markActive={isMarkActive(markValue, value)}
                forceInactive={!!disableTrackHighlight}
                style={{ left: `${percent}%` }}
              />
            )
          })}
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
