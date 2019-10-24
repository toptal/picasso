import React, {
  InputHTMLAttributes,
  KeyboardEvent,
  forwardRef,
  ReactNode,
  ComponentType,
  useRef
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'
import cx from 'classnames'
import Popper from '@material-ui/core/Popper'

import { StandardProps } from '../../Picasso'
import Input, { Props as InputProps } from '../../Input'
import Menu from '../../Menu'
import Container from '../../Container'
import Loader from '../../Loader'
import ScrollMenu from '../../ScrollMenu'
import Typography from '../../Typography'
import InputAdornment from '../../InputAdornment'
import { useWidthOf } from '../../utils'
import { Item } from './types'
import useAutocomplete, { EMPTY_INPUT_VALUE } from './useAutocomplete'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'defaultValue' | 'value' | 'onChange' | 'onSelect' | 'onKeyDown'
    > {
  /**  Callback invoked when `input` element value is changed */
  onChange?: (value: string) => void
  /** The value of the selected option, required for a controlled component. */
  value: string
  /**  Callback invoked when selection changes */
  onSelect?: (item: Item) => void
  /**  Callback invoked when other option selected */
  onOtherOptionSelect?: (item: Item) => void
  /** Placeholder for value */
  placeholder?: string
  /** Text prefix for other option */
  otherOptionText?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Shows the loading icon when options are loading */
  loading?: boolean
  /** Allow to show the other option in the list of options */
  showOtherOption?: boolean
  /** Label to show when no options were found */
  noOptionsText?: string
  /** List of options */
  options?: Item[]
  /** A function that takes a display value from the option item */
  getDisplayValue?: (item: Item | null) => string
  /**  Callback invoked when key is pressed */
  onKeyDown?: (
    event: KeyboardEvent<HTMLInputElement>,
    inputValue: string
  ) => void
  /** ReactNode for labels that will be used as start InputAdornment - */
  startAdornment?: ReactNode
  /** ReactNode for labels that will be used as end InputAdornment - */
  endAdornment?: ReactNode
  /** Indicate whether `Input` is in error state */
  error?: boolean
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Custom input component */
  inputComponent?: ComponentType<InputProps>
  /** Callback responsible for rendering the option given the option and its index in the list of options */
  renderOption?: (option: Item, index?: number) => ReactNode
  /** Specifies whether the autofill enabled or not, disabled by default */
  enableAutofill?: boolean
}

const getItemText = (item: Item | null) =>
  (item && item.text) || EMPTY_INPUT_VALUE

const getUniqueValue = (value: string) =>
  `${value.replace(/\s+/g, '-').toLowerCase()}-${new Date().getTime()}`

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  function Autocomplete(
    {
      classes,
      className,
      onChange,
      value,
      onSelect,
      onOtherOptionSelect,
      loading,
      placeholder,
      otherOptionText,
      noOptionsText,
      options,
      getDisplayValue,
      style,
      width,
      showOtherOption,
      onKeyDown,
      inputComponent,
      renderOption,
      endAdornment,
      icon,
      error,
      enableAutofill,
      autoComplete,
      ...rest
    },
    ref
  ) {
    const handleSelect = (item: Item) => {
      const displayValue = getDisplayValue!(item)

      const isInOptions = options!.find(
        option => getDisplayValue!(option) === displayValue
      )

      if (!isInOptions) {
        onOtherOptionSelect!(item)
        return
      }

      onSelect!(item)
    }

    const {
      highlightedIndex,
      isOpen,
      getItemProps,
      getInputProps
    } = useAutocomplete({
      value,
      options,
      enableAutofill,
      autoComplete,
      getDisplayValue: getDisplayValue!,
      onSelect: handleSelect,
      onChange,
      onKeyDown
    })

    const optionsLength = options!.length
    const otherOption = {
      text: value
    }

    const shouldShowOtherOption =
      showOtherOption &&
      value &&
      options!.every(option => getDisplayValue!(option) !== value)

    const optionsMenu = (
      <ScrollMenu selectedIndex={highlightedIndex}>
        {options!.map((option, index) => (
          <Menu.Item
            key={getDisplayValue!(option)}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getItemProps(index, option)}
          >
            {renderOption
              ? renderOption(option, index)
              : getDisplayValue!(option)}
          </Menu.Item>
        ))}

        {shouldShowOtherOption && (
          <Menu.Item
            key={getUniqueValue(value)}
            className={cx({
              [classes.otherOption]: true
            })}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getItemProps(optionsLength, otherOption)}
          >
            <span className={classes.stringContent}>
              <Typography as='span' color='dark-grey'>
                {otherOptionText}
              </Typography>
              {otherOption.text}
            </span>
          </Menu.Item>
        )}

        {!optionsLength && !shouldShowOtherOption && (
          <Menu.Item disabled>{noOptionsText}</Menu.Item>
        )}
      </ScrollMenu>
    )

    const InputComponent = inputComponent || Input
    const loadingComponent = (
      <InputAdornment position='end'>
        <Loader size='small' />
      </InputAdornment>
    )

    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const menuWidth = useWidthOf<HTMLDivElement>(inputWrapperRef)

    return (
      <div
        className={cx(
          classes.root,
          className,
          classes[`root${capitalize(width!)}`]
        )}
        style={style}
        role='combobox'
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <Container flex ref={inputWrapperRef}>
          <InputComponent
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...rest}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...getInputProps()}
            error={error}
            icon={icon}
            defaultValue={undefined}
            value={value}
            ref={ref}
            placeholder={placeholder}
            endAdornment={loading ? loadingComponent : endAdornment}
            width={width}
          />
        </Container>
        <div role='listbox'>
          {inputWrapperRef.current && (
            <Popper
              open={isOpen && !loading}
              anchorEl={inputWrapperRef.current}
              className={classes.popper}
              style={{ width: menuWidth }}
            >
              {optionsMenu}
            </Popper>
          )}
        </div>
      </div>
    )
  }
)

Autocomplete.defaultProps = {
  enableAutofill: false,
  getDisplayValue: getItemText,
  loading: false,
  noOptionsText: 'No options',
  onChange: () => {},
  onKeyDown: () => {},
  onOtherOptionSelect: () => {},
  onSelect: () => {},
  options: [],
  otherOptionText: 'Other option: ',
  showOtherOption: false,
  width: 'auto'
}

Autocomplete.displayName = 'Autocomplete'

export default withStyles(styles)(Autocomplete)
