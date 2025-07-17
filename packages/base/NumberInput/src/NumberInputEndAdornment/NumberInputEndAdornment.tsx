/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MouseEventHandler, RefObject } from 'react'
import React from 'react'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { isBrowser } from '@toptal/picasso-shared'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { Container } from '@toptal/picasso-container'
import {
  ArrowDownMinor16,
  ArrowUpMinor16,
  ArrowDownMinor24,
  ArrowUpMinor24,
} from '@toptal/picasso-icons'
import { twJoin } from '@toptal/picasso-tailwind-merge'

export type Size = SizeType<'small' | 'medium' | 'large'>

export interface Props extends BaseProps {
  /** Value of the `input` element. */
  value?: string | number
  /** Minimum value for the `input` element */
  min?: number | string
  /** Maximum value for the `input` element */
  max?: number | string
  /** Next value of the `input` element will be calculated based on step */
  step?: number | string
  /** Indicates whether component is in disabled state */
  disabled?: boolean
  /** Component size */
  size?: Size
  /** Ref of the input element */
  inputRef: RefObject<HTMLInputElement>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const nativeInputValueSetter = isBrowser()
  ? (
      Object.getOwnPropertyDescriptor(
        // eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
        window.HTMLInputElement.prototype,
        'value'
      ) as PropertyDescriptor
    ).set!
  : undefined

const classBySize: Record<Size, string> = {
  small: 'h-3 w-[1.375rem]',
  medium: 'h-4 w-[1.625rem]',
  large: 'h-6 w-[2.125rem]',
}

export const NumberInputEndAdornment = ({
  min = -Infinity,
  max = Infinity,
  value = 0,
  step = 1,
  disabled = false,
  size = 'medium',
  inputRef,
}: Props) => {
  const normalizedStep = Number(step)
  const normalizedValue = Number(value)
  const normalizedMin = Number(min)
  const normalizedMax = Number(max)

  const fireEvent = (nextValue: number) => {
    if (!nativeInputValueSetter) {
      return
    }

    const input = inputRef?.current

    nativeInputValueSetter.call(input, nextValue)

    const event = new Event('input', {
      bubbles: true,
      cancelable: true,
    })

    if (input) {
      input.dispatchEvent(event)
    }
  }

  const handleUpClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()

    if (typeof value === 'undefined') {
      return
    }

    let nextValue = normalizedValue + normalizedStep

    if (nextValue <= Number(max)) {
      if (normalizedValue < normalizedMin + normalizedStep) {
        nextValue = normalizedMin + normalizedStep
      }

      fireEvent(nextValue)
    } else if (normalizedValue !== normalizedMax) {
      nextValue = normalizedMax
      fireEvent(nextValue)
    }
  }

  const handleDownClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()

    if (typeof value === 'undefined') {
      return
    }

    let nextValue = normalizedValue - normalizedStep

    if (nextValue >= Number(min)) {
      if (normalizedValue > normalizedMax - normalizedStep) {
        nextValue = normalizedMax - normalizedStep
      }

      fireEvent(nextValue)
    } else if (normalizedValue !== normalizedMin) {
      nextValue = normalizedMin
      fireEvent(nextValue)
    }
  }

  const rootClassName = twJoin(
    `flex relative items-center justify-center align-middle 

    p-0 bottom-0 cursor-pointer

    text-graphite-700 decoration-graphite-700 bg-inherit bg-transparent

    border-y-0 border-x border-x-solid
    border-l-gray-400 border-r-transparent

    hover:bg-gray-400 hover:border-gray-400

    [&]:border-solid
    [&+&]:border-t [&+&]:border-solid
    [&+&]:border-t-gray-400

    active:[&+&]:border-t active:[&+&]:border-t-solid 
    active:[&+&]:border-gray-500

    active:bg-gray-500 active:border-t-gray-500 

    [&:first-child]:rounded-tr-sm [&:last-child]:rounded-br-sm 

    transition-[color,_border,_background] ease-out duration-350`,
    classBySize[size],
    disabled && 'opacity-[0.48]'
  )

  return (
    <InputAdornment position='end'>
      <Container flex direction='column' inline>
        <button
          type='button'
          disabled={disabled}
          className={rootClassName}
          onClick={handleUpClick}
        >
          {size === 'large' ? <ArrowUpMinor24 /> : <ArrowUpMinor16 />}
        </button>

        <button
          type='button'
          disabled={disabled}
          className={rootClassName}
          onClick={handleDownClick}
        >
          {size === 'large' ? <ArrowDownMinor24 /> : <ArrowDownMinor16 />}
        </button>
      </Container>
    </InputAdornment>
  )
}

NumberInputEndAdornment.displayName = 'NumberInputEndAdornment'

export default NumberInputEndAdornment
