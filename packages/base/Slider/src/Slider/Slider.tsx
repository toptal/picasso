import type { ComponentProps } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Slider as MUIBaseSlider } from '@mui/base/Slider'
import type { SliderMarkSlotProps } from '@mui/base/Slider'
import { useCombinedRefs } from '@toptal/picasso-utils'
import { twJoin } from 'tailwind-merge'

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

const createCustomMark = (hideTrack?: boolean, hideThumb?: boolean) => {
  const Mark = ({
    markActive,
    ownerState,
    'data-index': dataIndex,
    style,
  }: SliderMarkSlotProps) => {
    return (
      <span
        data-index={dataIndex}
        style={style}
        className={twJoin(
          'absolute w-[6px] h-[6px] rounded-[50%] border-[2px] border-solid border-white opacity-100 top-[1.5px] -translate-x-2/4 box-content',
          hideThumb &&
            markActive &&
            ownerState.value === undefined &&
            dataIndex === 0 &&
            'bg-gray-500',
          markActive && !hideTrack ? 'bg-blue-500' : 'bg-gray-500'
        )}
      />
    )
  }

  return Mark
}

const tooltipStates: Record<ValueLabelDisplay, string> = {
  off: 'hidden',
  auto: 'hidden group-hover/thumb:flex justify-center items-center',
  on: 'flex justify-center items-center',
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

  const sliderRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))

  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)

  return (
    <div className='my-[6px] mx-0'>
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
          mark: createCustomMark(disableTrackHighlight, hideThumbOnEmpty),
          valueLabel: 'div',
        }}
        slotProps={{
          root: {
            className: 'block relative py-[6px] -my-[6px]',
          },
          rail: {
            className:
              'flex absolute w-full h-[1px] opacity-[0.24] rounded-none bg-gray-500',
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
            className: twJoin(
              'absolute -top-[34px] will-change-transform transition-transform m-1 text-sm bg-graphite-800 text-white rounded-sm py-[2px] px-2',
              tooltipStates[tooltip]
            ),
          },
        }}
        valueLabelFormat={tooltipFormat}
        onChange={onChange}
      />
    </div>
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
