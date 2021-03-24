/* eslint-disable complexity */
import React, { useRef } from 'react'
import PopperJs from 'popper.js'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import { Search16 } from '@toptal/picasso/Icon'

import OutlinedInput from '../OutlinedInput'
import Popper from '../Popper'
import MenuItem from '../MenuItem'
import SelectCaret from '../SelectCaret'
import {
  useAdornments,
  useSelectState,
  useSelectProps,
  renderOption as defaultRenderOption,
  ValueType,
  SelectProps,
  getOptionText,
  DEFAULT_SEARCH_THRESHOLD
} from '../Select'
import NonNativeSelectOptions from '../NonNativeSelectOptions'
import { useCombinedRefs } from '../utils'
import { documentable, forwardRef } from '../utils/forward-ref'
import noop from '../utils/noop'
import styles from './styles'

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
        getDisplayValue = getOptionText,
        options,
        onChange,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        native,
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
        searchThreshold
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
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getSearchInputProps()}
          />
        </MenuItem>
      ) : null

      const rootProps = getRootProps()

      const [startAdornment, endAdornment] = useAdornments({
        position: iconPosition,
        icon,
        loading,
        disabled
      })

      const selectComponent = (
        <>
          <div
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rootProps}
            className={classes.inputWrapper}
          >
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
          {!disabled && (
            <Popper
              ref={popperRef}
              autoWidth
              width={menuWidth}
              placement='bottom-start'
              open={isOpen}
              anchorEl={inputWrapperRef.current}
              container={popperContainer}
            >
              {isOpen && (
                <NonNativeSelectOptions
                  options={filteredOptions}
                  renderOption={renderOption as any}
                  highlightedIndex={highlightedIndex}
                  getItemProps={getItemProps}
                  // eslint-disable-next-line react/jsx-handler-names
                  onBlur={rootProps.onBlur}
                  value={value}
                  filterOptionsValue={filterOptionsValue}
                  multiple={multiple}
                  size={size}
                  noOptionsText={noOptionsText}
                  fixedHeader={searchInput}
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
  enableAutofill: false,
  searchPlaceholder: 'Search'
}

NonNativeSelect.displayName = 'NonNativeSelect'

export default NonNativeSelect
