import React, { useRef } from 'react'
import type PopperJs from 'popper.js'
import cx from 'classnames'
import { Search16 } from '@toptal/picasso-icons'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import { Popper } from '@toptal/picasso-popper'
import { MenuItem } from '@toptal/picasso-menu'
import {
  documentable,
  forwardRef,
  noop,
  useCombinedRefs,
} from '@toptal/picasso-utils'
import { InputAdornment } from '@toptal/picasso-input-adornment'
import { useFieldsLayoutContext } from '@toptal/picasso-form'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import SelectCaret from '../SelectCaret'
import { NonNativeSelectLoader } from '../NonNativeSelectLoader'
import type { ValueType, SelectProps } from '../SelectBase'
import {
  useAdornments,
  useSelectState,
  useSelectProps,
  renderOption as defaultRenderOption,
  getOptionText,
  DEFAULT_LIMIT,
  DEFAULT_SEARCH_THRESHOLD,
  countOptions,
  filterFlatOptions as defaultFilterOptions,
} from '../SelectBase'
import { NonNativeSelectOptions } from '../NonNativeSelectOptions'
import { NonNativeSelectLimitFooter } from '../NonNativeSelectLimitFooter'

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

const classesByWidth: Record<
  Exclude<SelectProps['width'], undefined>,
  string
> = {
  auto: '',
  full: 'w-full',
  shrink: 'w-auto',
}

export const NonNativeSelect = documentable(
  forwardRef(
    // eslint-disable-next-line max-lines-per-function, complexity
    <T extends ValueType, M extends boolean = false>(
      props: SelectProps<T, M>,
      ref: React.Ref<HTMLInputElement> | null
    ) => {
      const {
        className,
        style,
        width = 'full',
        menuWidth,
        loading,
        id,
        icon,
        iconPosition = 'start',
        name,
        noOptionsText,
        renderOption = defaultRenderOption,
        placeholder,
        disabled,
        disablePortal,
        error,
        status,
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        size,
        enableReset,
        popperContainer,
        enableAutofill,
        enableResetSearch,
        autoComplete,
        searchPlaceholder,
        searchThreshold = DEFAULT_SEARCH_THRESHOLD,
        limit = DEFAULT_LIMIT,
        getDisplayValue = getOptionText,
        options,
        onChange,
        filterOptions = defaultFilterOptions,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        native,
        testIds,
        highlight,
        ...rest
      } = props

      const selectRef = useCombinedRefs<HTMLInputElement>(
        ref,
        useRef<HTMLInputElement>(null)
      )
      const searchInputRef = useRef<HTMLInputElement>(null)
      const popperRef = useRef<PopperJs>(null)
      const inputWrapperRef = useRef<HTMLDivElement>(null)

      const selectState = useSelectState({
        getDisplayValue,
        filterFlatOptions: filterOptions,
        options,
        disabled,
        multiple,
        value,
        searchThreshold,
        limit,
      })
      const {
        highlightedIndex,
        isOpen,
        showSearch,
        filterOptionsValue,
        displayValue,
        selection,
        filteredOptions,
      } = selectState
      const { getItemProps, getRootProps, getInputProps, getSearchInputProps } =
        useSelectProps({
          selectRef,
          popperRef,
          searchInputRef,
          selectProps: props,
          selectState,
        })

      const { layout } = useFieldsLayoutContext()

      const searchInput = showSearch ? (
        <MenuItem
          as='div'
          nonSelectable
          className='pt-[0.375rem] pl-2 pb-2 pr-2'
        >
          <OutlinedInput
            inputRef={searchInputRef}
            className='w-full'
            startAdornment={
              <InputAdornment position='start' disablePointerEvents>
                <Search16 />
              </InputAdornment>
            }
            placeholder={searchPlaceholder}
            enableReset={enableResetSearch}
            size={size}
            value={filterOptionsValue}
            testIds={testIds}
            aria-autocomplete='list'
            data-testid={testIds?.searchInput}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getSearchInputProps()}
          />
        </MenuItem>
      ) : null

      const rootProps = getRootProps()

      const [startAdornment, endAdornment] = useAdornments({
        position: iconPosition,
        icon,
        disabled,
      })

      const selectComponent = (
        <>
          <div
            {...rootProps}
            className={cx('w-[inherit] outline-0', {
              'w-full': layout === 'horizontal',
            })}
          >
            {!enableAutofill && name && (
              <input type='hidden' value={displayValue} name={name} />
            )}
            <OutlinedInput
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              onChange={onChange as any}
              inputRef={selectRef}
              status={error ? 'error' : status}
              disabled={disabled}
              id={id}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              // Input specific props
              value={displayValue}
              {...getInputProps()}
              placeholder={placeholder}
              width={width}
              readOnly
              defaultValue={undefined}
              className='pr-[1.625rem]'
              highlight={highlight}
              inputProps={{
                size: 1, // let input to have smallest width by default for width:'shrink'
              }}
              size={size}
              role='textbox'
              enableReset={enableReset ? selection.isSelected() : false}
              autoComplete={
                enableAutofill ? autoComplete : autoComplete || 'off'
              }
              name={enableAutofill ? name : undefined}
              testIds={testIds}
            />
            <SelectCaret disabled={disabled} />
          </div>
          {!disabled && isOpen && (
            <Popper
              ref={popperRef}
              autoWidth
              width={menuWidth}
              placement='bottom-start'
              open
              anchorEl={inputWrapperRef.current}
              container={popperContainer}
              disablePortal={disablePortal}
            >
              {loading ? (
                <NonNativeSelectLoader data-testid={testIds?.loader} />
              ) : (
                <NonNativeSelectOptions
                  options={filteredOptions}
                  renderOption={renderOption as any}
                  highlightedIndex={highlightedIndex}
                  getItemProps={getItemProps}
                  onBlur={rootProps.onBlur}
                  selection={selection}
                  filterOptionsValue={filterOptionsValue}
                  multiple={multiple}
                  noOptionsText={noOptionsText}
                  fixedHeader={searchInput}
                  fixedFooter={
                    limit < countOptions(options) ? (
                      <NonNativeSelectLimitFooter
                        totalCount={countOptions(options)}
                        limit={limit}
                        data-testid={testIds?.limitFooter}
                      />
                    ) : null
                  }
                  testIds={{
                    noOptions: testIds?.noOptions,
                  }}
                />
              )}
            </Popper>
          )}
        </>
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
          {selectComponent}
        </div>
      )
    }
  )
)

NonNativeSelect.defaultProps = {
  disabled: false,
  status: 'default',
  getDisplayValue: getOptionText,
  iconPosition: 'start',
  loading: false,
  noOptionsText: 'No matches found',
  onChange: noop,
  onBlur: noop,
  renderOption: defaultRenderOption,
  size: 'medium',
  width: 'full',
  searchThreshold: DEFAULT_SEARCH_THRESHOLD,
  limit: DEFAULT_LIMIT,
  enableAutofill: false,
  searchPlaceholder: 'Search',
  filterOptions: defaultFilterOptions,
}

NonNativeSelect.displayName = 'NonNativeSelect'

export default NonNativeSelect
