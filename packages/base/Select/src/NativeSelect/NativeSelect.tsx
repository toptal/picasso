import React, { useRef } from 'react'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import {
  documentable,
  forwardRef,
  noop,
  useCombinedRefs,
} from '@toptal/picasso-utils'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { SelectCaret } from '../SelectCaret'
import type { ValueType, SelectProps } from '../SelectBase'
import {
  getOptionText,
  useAdornments,
  useSelectState,
  useSelectProps,
  renderOption as defaultRenderOption,
} from '../SelectBase'
import NativeSelectOptions from '../NativeSelectOptions'
import NativeSelectPlaceholder from '../NativeSelectPlaceholder'
import { NativeSelectInput } from './NativeSelectInput'

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

const classesByWidth: Record<
  Exclude<SelectProps['width'], undefined>,
  string
> = {
  full: 'w-full',
  shrink: 'w-auto',
  auto: '',
}

export const NativeSelect = documentable(
  forwardRef(
    <T extends ValueType, M extends boolean = false>(
      props: SelectProps<T, M>,
      ref: React.Ref<HTMLInputElement> | null
    ) => {
      const {
        className,
        style,
        width = 'full',
        loading = false,
        id,
        icon,
        iconPosition = 'start',
        name,
        renderOption = defaultRenderOption,
        placeholder,
        disabled = false,
        status = 'default',
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        size = 'medium',
        enableReset,
        onChange = noop,
        onBlur = noop,
        options,
        getDisplayValue = getOptionText,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        menuWidth,
        noOptionsText = 'No matches found',
        popperContainer,
        enableAutofill = false,
        autoComplete,
        searchPlaceholder = 'Search',
        searchThreshold = 10,
        limit,
        native,
        testIds,
        highlight,
        /* eslint-disable @typescript-eslint/no-unused-vars */
        enableResetSearch,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...rest
      } = props

      const selectRef = useCombinedRefs<HTMLInputElement>(
        ref,
        useRef<HTMLInputElement>(null)
      )
      const inputWrapperRef = useRef<HTMLDivElement>(null)

      const selectState = useSelectState({
        getDisplayValue,
        options,
        disabled,
        multiple,
        value,
        limit,
      })
      const { selection, emptySelectValue } = selectState
      const { getItemProps, getInputProps } = useSelectProps({
        selectRef,
        selectProps: props,
        selectState,
      })
      const [selectStartAdornment, selectEndAdornment] = useAdornments({
        position: iconPosition,
        icon,
        loading,
        disabled,
      })

      const startAdornment = selectStartAdornment && (
        <div className='absolute left-[0.625rem]'>{selectStartAdornment}</div>
      )
      const endAdornment = selectEndAdornment && (
        <div className='absolute right-[1.625rem]'>{selectEndAdornment}</div>
      )

      const children = (
        <>
          <NativeSelectPlaceholder
            emptySelectValue={emptySelectValue}
            disabled={!enableReset}
          >
            {placeholder}
          </NativeSelectPlaceholder>
          <NativeSelectOptions
            options={options}
            selection={selection}
            renderOption={renderOption as any}
            getItemProps={getItemProps}
          />
        </>
      )

      const nativeSelectComponent = (
        <OutlinedInput
          width={width}
          size={size}
          className='p-0 bg-white'
          testIds={testIds}
          status={status}
          highlight={highlight}
          onBlur={onBlur}
          {...getInputProps()}
          {...rest}
          ref={selectRef}
          disabled={disabled}
          name={name}
          id={id}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          value={value}
          onChange={onChange as any}
          inputComponent={NativeSelectInput as any}
          inputProps={{
            multiple,
            children,
            type: undefined, // We render a select. We can ignore the type provided by the `Input`.
            IconComponent: () => <SelectCaret disabled={disabled} />,
            className: twJoin(
              'w-full p-2 focus:bg-inheritColor',
              !selection.isSelected() && 'text-gray-600',
              React.isValidElement(startAdornment) && 'pl-[2.5625rem]',
              React.isValidElement(endAdornment) && 'pr-[3.5625rem]'
            ),
          }}
        />
      )

      return (
        <div
          className={twMerge(
            'relative inline-flex text-[1rem] cursor-pointer',
            className,
            classesByWidth[width],
            disabled && 'cursor-default'
          )}
          style={style}
          ref={inputWrapperRef}
        >
          {nativeSelectComponent}
        </div>
      )
    }
  )
)

NativeSelect.displayName = 'NativeSelect'

export default NativeSelect
