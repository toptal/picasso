// import type { ComponentProps } from 'react'
import React, { forwardRef, useRef } from 'react'
import { Slider as MUIBaseSlider } from '@mui/base/Slider'
import { useCombinedRefs, useOnScreen } from '@toptal/picasso-utils'
import { twJoin, twMerge } from 'tailwind-merge'
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
    className,
    style,
    'data-private': dataPrivate,
    'data-testid': dataTestid,
  } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useCombinedRefs<HTMLElement>(ref, useRef<HTMLElement>(null))
  const { isPartiallyOverlapped, handleValueLabelOnRender } = useLabelOverlap({
    value,
  })

  const isThumbHidden =
    hideThumbOnEmpty && (typeof value === 'undefined' || value === null)

  // The rootMargin is not working correctly in the storybooks iframe
  // To test properly we can open the iframe in new window
  const isContainerOnScreen = useOnScreen({
    ref: containerRef,
    rootMargin: '-24px 0px 0px 0px',
    threshold: 1,
  })

  return (
    <div
      ref={containerRef}
      className={twMerge('my-[6px] mx-0', className)}
      style={style}
    >
      <MUIBaseSlider
        ref={sliderRef}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
        data-testid={dataTestid}
        data-private={dataPrivate}
        slots={{
          mark: SliderMark,
          valueLabel: SliderValueLabel,
        }}
        slotProps={{
          mark: {
            // @ts-expect-error we have custom Mark component, where we extend props and MUI does not understand it
            forceInactive: disableTrackHighlight,
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
              'group/thumb flex justify-center items-center w-[15px] h-[15px]',
              'rounded-[50%] bg-blue-500 border-[2px] border-solid border-white',
              '-mt-[7px] -ml-[6px] outline-0 absolute  transition-shadow cursor-pointer',
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
            tooltip,
            onRender: handleValueLabelOnRender,
            yPlacement: isContainerOnScreen ? 'top' : 'bottom',
            isOverlaped: isPartiallyOverlapped,
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
}

export default Slider
