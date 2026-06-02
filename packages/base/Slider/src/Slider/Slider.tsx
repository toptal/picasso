import type { ReactNode } from 'react'
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Slider as BaseUISlider } from '@base-ui/react/slider'
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

// Overrides Base UI's inline `translate: -50% -50%` on the thumb. On a 15px
// thumb `-50%` resolves to `-7.5px`, and a fractional transform makes the
// thumb render blurry on non-retina (1x) displays. We reproduce MUI's
// whole-pixel technique instead: Base UI's inline `top: 50%` resolves to 6px
// (half of the 12px control), and the `-mt-[7px] -ml-[6px]` classes apply the
// same whole-pixel offsets the MUI implementation used.
const thumbResetTranslateStyle: React.CSSProperties = { translate: 'none' }

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

  const handleRootRef = useCallback(
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
  // the live value even when the component is used in an uncontrolled way
  // (MUI exposed the resolved value via `ownerState`, Base UI does not).
  const [internalValue, setInternalValue] = useState<number | number[]>(
    defaultValue
  )
  const resolvedValue = value ?? internalValue
  const thumbValues = Array.isArray(resolvedValue)
    ? resolvedValue
    : [resolvedValue]

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

  const handleValueChange = (
    newValue: number | number[],
    eventDetails: SliderRoot.ChangeEventDetails
  ) => {
    setInternalValue(newValue)
    onChange?.(eventDetails.event, newValue, eventDetails.activeThumbIndex)
  }

  // Generates the same marks MUI generated for `marks={true}`:
  // one mark per step between min and max
  const markValues = useMemo(() => {
    if (!marks) {
      return []
    }

    const markStep = step ?? 1

    return Array.from(
      { length: Math.floor((max - min) / markStep) + 1 },
      (_, index) => min + markStep * index
    )
  }, [marks, step, min, max])

  const isMarkActive = (markValue: number) =>
    thumbValues.length > 1
      ? markValue >= thumbValues[0] &&
        markValue <= thumbValues[thumbValues.length - 1]
      : markValue <= thumbValues[0]

  const formatValueLabel = (thumbValue: number, index: number): ReactNode => {
    if (typeof tooltipFormat === 'function') {
      return tooltipFormat(thumbValue, index)
    }

    if (typeof tooltipFormat === 'string') {
      return tooltipFormat
    }

    return thumbValue
  }

  return (
    <div
      ref={containerRef}
      className={twMerge('my-[6px] mx-0', className)}
      style={style}
    >
      <BaseUISlider.Root
        ref={handleRootRef}
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
        <BaseUISlider.Control className='block absolute inset-0'>
          {/* the rail; the value indicator is nested so it is not affected
              by the rail's opacity, hence bg opacity instead of `opacity-[0.24]` */}
          <BaseUISlider.Track className='block w-full h-[1px] top-1/2 rounded-none bg-gray-500/[0.24]'>
            <BaseUISlider.Indicator
              className={twJoin(
                'block h-[1px]',
                disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
              )}
            />
          </BaseUISlider.Track>
          {markValues.map((markValue, index) => (
            <SliderMark
              key={markValue}
              data-index={index}
              markActive={isMarkActive(markValue)}
              forceInactive={disableTrackHighlight}
              value={value}
              style={{ left: `${valueToPercent(markValue, min, max)}%` }}
            />
          ))}
          {thumbValues.map((thumbValue, index) => (
            <BaseUISlider.Thumb
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              role='slider'
              className={twJoin(
                'group/thumb flex justify-center items-center w-[15px] h-[15px]',
                'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
                '-mt-[7px] -ml-[6px] outline-0 absolute transition-shadow cursor-pointer',
                // keeps the visually hidden `input` contained by the thumb
                // even without Base UI's `translate` transform
                'contain-layout',
                isThumbHidden && 'hidden'
              )}
              style={thumbResetTranslateStyle}
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
            </BaseUISlider.Thumb>
          ))}
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
