import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import type { SliderRoot } from '@base-ui/react/slider'
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

const valueToPercent = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min)

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
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

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  // We mirror the value internally so that marks and value labels can reflect
  // the live value even when the component is used in an uncontrolled way.
  const [uncontrolledValue, setUncontrolledValue] = useState<number | number[]>(
    defaultValue
  )
  const currentValue = value !== undefined ? value : uncontrolledValue

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

  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)

  const handleValueChange = (
    newValue: number | number[],
    eventDetails: SliderRoot.ChangeEventDetails
  ) => {
    setUncontrolledValue(newValue)
    onChange?.(eventDetails.event, newValue, eventDetails.activeThumbIndex)
  }

  const marksData = useMemo(() => {
    if (!marks) {
      return []
    }

    const markStep = step ?? 1
    const count = Math.floor((max - min) / markStep)

    return Array.from({ length: count + 1 }, (_, index) => {
      const markValue = min + index * markStep

      return {
        value: markValue,
        percent: valueToPercent(markValue, min, max),
      }
    })
  }, [marks, step, min, max])

  const isMarkActive = (markValue: number) => {
    if (Array.isArray(currentValue)) {
      return (
        markValue >= currentValue[0] &&
        markValue <= currentValue[currentValue.length - 1]
      )
    }

    return markValue <= currentValue
  }

  const thumbValues = Array.isArray(currentValue)
    ? currentValue
    : [currentValue]

  const formatValueLabel = (
    thumbValue: number,
    index: number
  ): React.ReactNode => {
    if (typeof tooltipFormat === 'function') {
      return tooltipFormat(thumbValue, index)
    }

    if (typeof tooltipFormat === 'string') {
      return tooltipFormat
    }

    return thumbValue
  }

  const thumbClassName = twJoin(
    'group/thumb flex justify-center items-center w-[15px] h-[15px]',
    'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
    'outline-0 absolute transition-shadow cursor-pointer',
    isThumbHidden && 'hidden'
  )

  return (
    <div
      ref={containerRef}
      className={twMerge('my-[6px] mx-0', className)}
      style={style}
    >
      <BaseSlider.Root
        ref={setRootRef}
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
        className='block width-full relative'
      >
        <BaseSlider.Control className='block cursor-pointer width-full relative py-[6px] -my-[6px]'>
          <BaseSlider.Track className='block w-full h-[1px] rounded-none bg-gray-500/[0.24]'>
            <BaseSlider.Indicator
              className={twJoin(
                'block h-[1px]',
                disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
              )}
            />
            {marksData.map(mark => (
              <SliderMark
                key={mark.value}
                data-index={mark.value}
                markActive={isMarkActive(mark.value)}
                forceInactive={disableTrackHighlight}
                value={currentValue}
                style={{ left: `${mark.percent}%` }}
              />
            ))}
            {thumbValues.map((thumbValue, index) => (
              <BaseSlider.Thumb
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                index={index}
                className={thumbClassName}
                onFocus={onFocus}
                onBlur={onBlur}
              >
                <SliderValueLabel
                  index={index}
                  value={thumbValue}
                  tooltip={isObserved ? tooltip : 'off'}
                  yPlacement={isOnScreen ? 'top' : 'bottom'}
                  isOverlaped={isPartiallyOverlapped}
                  onRender={handleValueLabelOnRender}
                >
                  {formatValueLabel(thumbValue, index)}
                </SliderValueLabel>
              </BaseSlider.Thumb>
            ))}
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
