/* eslint-disable complexity */
import React, { useRef } from 'react'
import PopperJs from 'popper.js'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'

import { Search16 } from '../Icon'
import OutlinedInput from '../OutlinedInput'
import Popper from '../Popper'
import MenuItem from '../MenuItem'
import SelectCaret from '../SelectCaret'
import NonNativeSelectLoader from '../NonNativeSelectLoader'
import {
  useAdornments,
  useSelectState,
  useSelectProps,
  renderOption as defaultRenderOption,
  ValueType,
  SelectProps,
  getOptionText,
  DEFAULT_LIMIT,
  DEFAULT_SEARCH_THRESHOLD,
  countOptions
} from '../Select'
import NonNativeSelectOptions from '../NonNativeSelectOptions'
import { documentable, forwardRef, noop, useCombinedRefs } from '../utils'
import styles from './styles'
import NonNativeSelectLimitFooter from '../NonNativeSelectLimitFooter'

const useStyles = makeStyles<Theme>(styles)

const DEFAULT_EMPTY_ARRAY_VALUE: ValueType[] = []

export const NonNativeSelect = documentable(
  forwardRef(
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
        error,
        multiple,
        value = multiple ? DEFAULT_EMPTY_ARRAY_VALUE : '',
        size,
        enableReset,
        popperContainer,
        enableAutofill,
        autoComplete,
        searchPlaceholder,
        searchThreshold = DEFAULT_SEARCH_THRESHOLD,
        limit = DEFAULT_LIMIT,
        getDisplayValue = getOptionText,
        options,
        onChange,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        native,
        testIds,
        ...rest
      } = props

      const classes = useStyles()

      const selectRef = useCombinedRefs<HTMLInputElement>(
        ref,
        useRef<HTMLInputElement>(null)
      )
      const searchInputRef = useRef<HTMLInputElement>(null)
      const popperRef = useRef<PopperJs>(null)
      const inputWrapperRef = useRef<HTMLDivElement>(null)

      const selectState = useSelectState({
        getDisplayValue,
        options,
        disabled,
        multiple,
        value,
        searchThreshold,
        limit
      })
      const {
        highlightedIndex,
        isOpen,
        showSearch,
        filterOptionsValue,
        displayValue,
        selection,
        filteredOptions
      } = selectState
      const {
        getItemProps,
        getRootProps,
        getInputProps,
        getSearchInputProps
      } = useSelectProps({
        selectRef,
        popperRef,
        searchInputRef,
        selectProps: props,
        selectState
      })

      const searchInput = showSearch ? (
        <MenuItem as='div' size={size} nonSelectable>
          <OutlinedInput
            inputRef={searchInputRef}
            className={classes.searchOutlinedInput}
            startAdornment={<Search16 className={classes.searchInputIcon} />}
            placeholder={searchPlaceholder}
            size={size}
            value={filterOptionsValue}
            aria-autocomplete='list'
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getSearchInputProps()}
          />
        </MenuItem>
      ) : null

      const rootProps = getRootProps()

      const [startAdornment, endAdornment] = useAdornments({
        position: iconPosition,
        icon,
        disabled
      })

      const selectComponent = (
        <>
          <div {...rootProps} className={classes.inputWrapper}>
            {!enableAutofill && name && (
              <input type='hidden' value={displayValue} name={name} />
            )}
            <OutlinedInput
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              onChange={onChange as any}
              inputRef={selectRef}
              error={error}
              disabled={disabled}
              id={id}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              // Input specific props
              value={displayValue}
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...getInputProps()}
              placeholder={placeholder}
              width={width}
              readOnly
              defaultValue={undefined}
              className={classes.outlinedInput}
              inputProps={{
                size: 1 // let input to have smallest width by default for width:'shrink'
              }}
              size={size}
              role='textbox'
              enableReset={enableReset ? selection.isSelected() : false}
              autoComplete={
                enableAutofill ? autoComplete : autoComplete || 'off'
              }
              name={enableAutofill ? name : undefined}
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
            >
              {loading ? (
                <NonNativeSelectLoader data-testid={testIds?.loader} />
              ) : (
                <NonNativeSelectOptions
                  options={filteredOptions}
                  renderOption={renderOption as any}
                  highlightedIndex={highlightedIndex}
                  getItemProps={getItemProps}
                  // eslint-disable-next-line react/jsx-handler-names
                  onBlur={rootProps.onBlur}
                  selection={selection}
                  filterOptionsValue={filterOptionsValue}
                  size={size}
                  multiple={multiple}
                  noOptionsText={noOptionsText}
                  fixedHeader={searchInput}
                  fixedFooter={
                    <NonNativeSelectLimitFooter
                      totalCount={countOptions(options)}
                      limit={limit}
                      data-testid={testIds?.limitFooter}
                    />
                  }
                  testIds={{
                    noOptions: testIds?.noOptions
                  }}
                />
              )}
            </Popper>
          )}
        </>
      )

      return (
        <div
          className={cx(
            classes.root,
            className,
            classes[`root${capitalize(width)}`],
            {
              [classes.rootDisabled]: disabled
            }
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
  error: false,
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
  searchPlaceholder: 'Search'
}

NonNativeSelect.displayName = 'NonNativeSelect'

export default NonNativeSelect
