import type { ComponentProps } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Slider as MUIBaseSlider } from '@mui/base/Slider'
import { useCombinedRefs, useOnScreen } from '@toptal/picasso-utils'
import { twJoin } from 'tailwind-merge'

import { SliderContextProvider } from './SliderContext'
import SliderMark from '../SliderMark'
import SliderValueLabel from '../SliderValueLabel'

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
            mark: SliderMark,
            valueLabel: SliderValueLabel,
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
