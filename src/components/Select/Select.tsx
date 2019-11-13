import React, {
  forwardRef,
  ChangeEvent,
  ReactNode,
  HTMLAttributes
} from 'react'
import cx from 'classnames'
import MUISelect from '@material-ui/core/Select'
import { MenuProps } from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import { Classes } from '../styles/types'
import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import MenuItem from '../MenuItem'
import Typography from '../Typography'
import { StandardProps } from '../Picasso'
import { DropdownArrows16 } from '../Icon'
import styles from './styles'

interface Option {
  key?: number
  text: ReactNode
  value: string | number
}

type IconPosition = 'start' | 'end'

export interface Props
  extends StandardProps,
    Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** If true, the 'Select' will be disabled */
  disabled?: boolean
  /** Indicate whether `Select` is in error state */
  error?: boolean
  /** Component ID */
  id?: string
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Placeholder option which is selected by default */
  placeholder?: string
  /** Whether icon should be placed at the beginning or end of the `Input` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Whether `Select` should be rendered as native HTML `<select />` */
  native?: boolean
  /** Callback invoked when `Select` changes its state. */
  onChange?: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    child: ReactNode
  ) => void
  /** List of options to be rendered as `Select` */
  options: Option[]
  /** Selected value */
  value?: string | number | (string | number)[]
  /** Allow selecting multiple values */
  multiple?: boolean
}

interface Select {
  isSelected(): boolean
  display(): ReactNode
}

function createSelectMultiple(
  allOptions: Option[],
  selectedValues: (string | number)[]
): Select {
  const isSelected = () => selectedValues.length > 0

  const display = () =>
    selectedOptions()
      .map(({ text }) => text)
      .join(', ')

  const selectedOptions = () =>
    allOptions.filter(({ value }) => selectedValues.includes(value))

  return {
    display,
    isSelected
  }
}

function createSelectSingle(
  allOptions: Option[],
  selectedValue: string | number
): Select {
  const isSelected = () => !!selectedValue

  const defaultOption = { text: '', value: '' }

  const selectedOption = () =>
    allOptions.find(option => option.value === selectedValue) || defaultOption

  const display = () => selectedOption().text

  return {
    display,
    isSelected
  }
}

const renderOptions = (
  options: Option[],
  classes: Classes,
  placeholder?: string,
  isNative?: boolean
) => {
  if (!options.length) {
    return null
  }

  const OptionComponent = isNative ? 'option' : MenuItem

  const resultOptions = options.map(({ key, value, text }) => (
    <OptionComponent key={key || value} value={value}>
      {text}
    </OptionComponent>
  ))

  if (placeholder) {
    resultOptions.unshift(
      <OptionComponent
        className={classes.placeholderOption}
        disabled
        key='placeholder'
        value=''
      >
        {placeholder}
      </OptionComponent>
    )
  }

  return resultOptions
}

export const Select = forwardRef<HTMLInputElement, Props>(function Select(
  {
    classes,
    className,
    style,
    width,
    id,
    icon,
    iconPosition,
    native,
    options,
    placeholder,
    disabled,
    error,
    onChange,
    multiple,
    value = multiple ? [] : '',
    ...rest
  },
  ref
) {
  const select = Array.isArray(value)
    ? createSelectMultiple(options, value)
    : createSelectSingle(options, value)

  const renderValue = () => {
    return select.isSelected() ? select.display() : placeholder
  }

  const isPlaceholderShown = placeholder && !select.isSelected()

  const outlinedInput = (
    <OutlinedInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={{
        root: cx({
          [classes.inputRootNative]: native
        }),
        input: cx(classes.input, {
          [classes.inputPlaceholder]: isPlaceholderShown,
          [classes.inputPlaceholderDisabled]: isPlaceholderShown && disabled,
          [classes.inputNative]: native
        })
      }}
      width={width}
    />
  )

  const iconAdornment = icon ? (
    <InputAdornment disabled={disabled} position={iconPosition!}>
      {icon}
    </InputAdornment>
  ) : null

  const menuProps: Partial<MenuProps> = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    getContentAnchorEl: undefined // needed to restore default behaviour
  }

  return (
    <MUISelect
      className={className}
      style={style}
      classes={{
        root: classes[`root${capitalize(width!)}`],
        icon: classes.caret,
        select: classes.select
      }}
      error={error}
      disabled={disabled}
      displayEmpty
      id={id}
      input={outlinedInput}
      native={native}
      variant='outlined'
      value={value}
      multiple={multiple}
      renderValue={() => (
        <React.Fragment>
          {iconPosition === 'start' && iconAdornment}
          <Typography className={classes.inputValue} inline color='inherit'>
            {renderValue()}
          </Typography>
          {iconPosition === 'end' && iconAdornment}
        </React.Fragment>
      )}
      IconComponent={({ iconClassName }: { iconClassName: string }) => (
        <DropdownArrows16
          className={cx(iconClassName, {
            [classes.caretDisabled]: disabled
          })}
        />
      )}
      MenuProps={menuProps}
      onChange={onChange}
    >
      {renderOptions(options, classes, placeholder, native)}
    </MUISelect>
  )
})

Select.defaultProps = {
  disabled: false,
  error: false,
  iconPosition: 'start',
  native: false,
  onChange: () => {},
  width: 'full'
}

Select.displayName = 'Select'

export default withStyles(styles)(Select)
