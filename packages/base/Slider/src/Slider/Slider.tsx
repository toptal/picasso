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
  const baseUiSliderRef: React.RefObject<HTMLDivElement> =
    sliderRef as React.RefObject<HTMLDivElement>

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

  const resolvedValue = value ?? defaultValue
  const valuesArr = Array.isArray(resolvedValue)
    ? resolvedValue
    : [resolvedValue]
  const isRange = Array.isArray(resolvedValue)

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

  const isMarkActive = (markValue: number): boolean => {
    if (isRange) {
      const [start, end] = valuesArr as number[]

      return (
        markValue >= Math.min(start, end) && markValue <= Math.max(start, end)
      )
    }

    return markValue <= (valuesArr[0] ?? min)
  }

  const thumbClassName = twJoin(
    'group/thumb flex justify-center items-center w-[15px] h-[15px]',
    'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
    // Margin compensation preserves @mui/base baseline positioning
    // (top:50% + insetInlineStart:X% with -7px / -6px offset). The kit's
    // `translate: -50% -50%` centering is defeated via rung-0 `style` prop
    // on <BaseUISlider.Thumb> below — see code-standards.md §"CSS specificity
    // ladder" rung 0 (mergeProps shallow-merges consumer style with rightmost
    // wins, so style={{ translate: 'none' }} beats the kit's inline style).
    //'-mt-[7px] -ml-[6px]',
    // `transform-gpu` (`transform: translate3d(0,0,0)`) creates a transform
    // containing block on the thumb so @base-ui/react's hidden range <input>
    // (rendered with `position: fixed; width: 100%; height: 100%`) sizes
    // relative to the 15x15 thumb instead of the viewport. Without this the
    // input grows to viewport size in Cypress component tests, blowing up the
    // body's bounding rect (1280x60 → 1280x1023 Happo regression).
    'transform-gpu',
    'outline-0 absolute transition-shadow cursor-pointer',
    isThumbHidden && 'hidden'
  )

  // Type alignment at the boundary — see code-standards §"Type alignment at the boundary".
  // Public Props.onFocus/onBlur are typed for HTMLElement; @base-ui/react SliderThumb's
  // onFocus/onBlur are forwarded to the nested <input>, so the handler signature narrows
  // to HTMLInputElement. Cast at the helper boundary, not at the JSX call site.
  const handleThumbFocus:
    | React.FocusEventHandler<HTMLInputElement>
    | undefined = onFocus as
    | React.FocusEventHandler<HTMLInputElement>
    | undefined
  const handleThumbBlur: React.FocusEventHandler<HTMLInputElement> | undefined =
    onBlur as React.FocusEventHandler<HTMLInputElement> | undefined

  const renderThumb = (index: number) => (
    <BaseUISlider.Thumb
      key={index}
      index={index}
      className={thumbClassName}
      // eslint-disable-next-line no-inline-styles/no-inline-styles -- rung-0 override of @base-ui/react's internal `translate: -50% -50%`; see thumbClassName comment
      //style={{ translate: 'none' }}
      onFocus={handleThumbFocus}
      onBlur={handleThumbBlur}
      role='slider'
    >
      <SliderValueLabel
        index={index}
        tooltip={isObserved ? tooltip : 'off'}
        onRender={handleValueLabelOnRender}
        yPlacement={isOnScreen ? 'top' : 'bottom'}
        isOverlaped={isPartiallyOverlapped}
        ownerState={{ value: valuesArr[index] ?? 0 }}
      >
        {formatTooltipValue(valuesArr[index] ?? 0, index, tooltipFormat)}
      </SliderValueLabel>
    </BaseUISlider.Thumb>
  )

  return (
    <div
      ref={containerRef}
      className={twMerge('my-[6px] mx-0', className)}
      style={style}
    >
      <BaseUISlider.Root
        ref={baseUiSliderRef}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        data-testid={dataTestid}
        data-private={dataPrivate}
        onValueChange={handleValueChange}
        name={name}
        id={id}
      >
        <BaseUISlider.Control className='block cursor-pointer w-full relative py-[6px] -my-[6px]'>
          {/* Custom rail rendered as a SIBLING of Slider.Track — mirrors the
              @mui/base slot structure (rail + track were peer absolute spans)
              and prevents CSS `opacity` from cascading into Slider.Indicator,
              which is nested inside Slider.Track per @base-ui/react's API. */}
          <span className='block absolute w-full h-[1px] opacity-[0.24] rounded-none bg-gray-500' />
          {/* Override @base-ui/react's inline `position: relative` on Track via
              rung-0 `style` prop so it stays at the same y as the rail
              (top:auto = top:0). `bg-transparent` keeps Track invisible —
              Indicator paints the blue. See code-standards.md §"CSS specificity
              ladder" rung 0 (mergeProps shallow-merges consumer style last). */}
          <BaseUISlider.Track
            className='block w-full h-[1px] bg-transparent'
            // eslint-disable-next-line no-inline-styles/no-inline-styles -- rung-0 override of @base-ui/react's internal `position: relative`
            //style={{ position: 'absolute' }}
          >
            <BaseUISlider.Indicator
              className={twJoin(
                'block h-[1px]',
                disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
              )}
            />
          </BaseUISlider.Track>

          {marksList.map((markValue, idx) => {
            const percent = ((markValue - min) / (max - min)) * 100

            // Pass the controlled `value` prop unchanged so SliderMark's
            // getBgColor can detect the undefined case (matches @mui/base's
            // baseline behavior: an unset value renders all marks gray).
            const ownerStateValue = (
              Array.isArray(value) ? value[0] : value
            ) as number

            return (
              <SliderMark
                key={markValue}
                markActive={isMarkActive(markValue)}
                ownerState={{ value: ownerStateValue }}
                style={{ left: `${percent}%` }}
                forceInactive={Boolean(disableTrackHighlight)}
                data-index={idx}
              />
            )
          })}

          {isRange ? [0, 1].map(renderThumb) : renderThumb(0)}
        </BaseUISlider.Control>
      </BaseUISlider.Root>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider
