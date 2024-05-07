import type { ComponentProps } from 'react'
import React, { forwardRef, useEffect, useRef } from 'react'
import { Slider as MUIBaseSlider } from '@mui/base/Slider'
import type {
  SliderMarkSlotProps,
  SliderValueLabelSlotProps,
} from '@mui/base/Slider'
import { useCombinedRefs, useOnScreen } from '@toptal/picasso-utils'
import { twJoin } from 'tailwind-merge'

import { getBgColor } from './utils/get-bg-color'
import { SliderContextProvider, useSliderContext } from './SliderContext'

type Value = number | number[]
type ValueLabelDisplay = 'on' | 'auto' | 'off'

export interface Props extends ComponentProps<typeof MUIBaseSlider> {
  /** Minimum slider value */
  min?: number
  /** Maximum slider value */
  max?: number
  /** Controlled value of the component */
  value?: Value
  /** The default value. Use when the component is not controlled */
  defaultValue?: Value
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
  tooltip?: ValueLabelDisplay
  /** The format function the value tooltip's value. */
  tooltipFormat?: string | ((value: number, index: number) => React.ReactNode)
  /** Callback invoked when slider changes its state. */
  onChange?: (event: Event, value: Value, activeThumb: number) => void
  /** Hide thumb when value is undefined or null. Works only when the component is controlled. */
  hideThumbOnEmpty?: boolean
  /** Disable track highlight. */
  disableTrackHighlight?: boolean
}

// We need custom Mark component because we have
// different bg color based on value of the Slider
const Mark = ({
  markActive,
  ownerState,
  'data-index': dataIndex,
  style,
  hideTrack,
}: SliderMarkSlotProps & { hideTrack: boolean }) => {
  return (
    <span
      data-index={dataIndex}
      style={style}
      className={twJoin(
        'absolute w-[6px] h-[6px] rounded-[50%] border-[2px] top-[1.5px] border-solid border-white opacity-100 -translate-x-2/4 box-content',
        getBgColor({ markActive, hideTrack, value: ownerState.value })
      )}
    />
  )
}

const tooltipStates: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  auto: 'hidden group-hover/thumb:flex justify-center items-center',
  on: 'flex justify-center items-center',
}

const ValueLabel = ({
  children,
  index = -1,
  tooltip = 'off',
  isOnScreen,
  ownerState,
}: SliderValueLabelSlotProps & {
  tooltip: ValueLabelDisplay
  isOnScreen: boolean
}) => {
  const { registerValueLabel, hasTooltipOverflow, checkTooltipsOverlap } =
    useSliderContext()
  const ref = useRef<HTMLSpanElement>(null)
  const sliderValue = ownerState.value
  const isRangeSlider = Array.isArray(sliderValue)
  const isRangeSliderCollapsed =
    isRangeSlider && sliderValue[0] === sliderValue[1]

  const getPosition = () => {
    if (!hasTooltipOverflow || isRangeSliderCollapsed) {
      return
    }

    return index === 0 ? 'right-[calc(100%-13px)]' : 'left-[calc(100%-13px)]'
  }

  useEffect(() => {
    if (!isRangeSlider) {
      return
    }
    checkTooltipsOverlap()
  }, [checkTooltipsOverlap, sliderValue, isRangeSlider])

  useEffect(() => {
    registerValueLabel(index, ref)
  }, [index, registerValueLabel])

  return (
    <span
      ref={ref}
      className={twJoin(
        'absolute will-change-transform shadow-4 transition-transform m-1 text-sm bg-graphite-800 text-white rounded-sm py-[2px] px-2',
        tooltipStates[tooltip],
        isOnScreen ? 'bottom-[calc(100%+4px)]' : 'top-[calc(100%+4px)]',
        getPosition()
      )}
    >
      {children}
    </span>
  )
}

export const Slider = forwardRef<HTMLElement, Props>(function Slider(
  props,
  ref
) {
  const {
    min,
    max,
    marks,
    value,
    defaultValue = 0,
    tooltip = 'off',
    tooltipFormat,
    step,
    disabled,
    onChange,
    hideThumbOnEmpty,
    disableTrackHighlight,
    ...rest
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))

  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)

  // The rootMargin is not working correctly in the storybooks iframe
  // To test properly we can open the iframe in new window
  const isOnScreen = useOnScreen({
    ref: containerRef,
    rootMargin: '-24px 0px 0px 0px',
    threshold: 1,
  })

  return (
    <SliderContextProvider>
      <div ref={containerRef} className='my-[6px] mx-0'>
        <MUIBaseSlider
          {...rest}
          ref={sliderRef}
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          step={step}
          marks={marks}
          disabled={disabled}
          slots={{
            mark: Mark,
            valueLabel: ValueLabel,
          }}
          slotProps={{
            mark: {
              // @ts-expect-error we have custom Mark component, where we extend props and MUI does not understand it
              hideTrack: disableTrackHighlight,
            },
            root: {
              className:
                'block cursor-pointer width-full relative py-[6px] -my-[6px]',
            },
            rail: {
              className:
                'block absolute w-full h-[1px] opacity-[0.24] rounded-none bg-gray-500',
            },
            thumb: {
              className: twJoin(
                'group/thumb flex justify-center items-center w-[15px] h-[15px] rounded-[50%] bg-blue-500 border-[2px] border-solid border-white -mt-[7px] outline-0 absolute -ml-[6px] transition-shadow cursor-pointer',
                isThumbHidden && 'hidden'
              ),
            },
            track: {
              className: twJoin(
                'block absolute h-[1px]',
                disableTrackHighlight ? 'bg-gray-200' : 'bg-blue-500'
              ),
            },
            valueLabel: {
              isOnScreen,
              tooltip,
            },
          }}
          valueLabelFormat={tooltipFormat}
          onChange={onChange}
        />
      </div>
    </SliderContextProvider>
  )
})

Slider.displayName = 'Slider'

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 100,
  tooltip: 'off',
  disablePortal: false,
}

export default Slider
