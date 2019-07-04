import React, {
  FunctionComponent,
  ChangeEvent,
  ReactNode,
  useMemo
} from 'react'
import cx from 'classnames'
import MUISelect from '@material-ui/core/Select'
import { MenuProps } from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import OutlinedInput from '../OutlinedInput'
import InputAdornment from '../InputAdornment'
import MenuItem from '../MenuItem'
import Typography from '../Typography'
import { StandardProps } from '../Picasso'
import { DropdownArrows16 } from '../Icon'
import styles from './styles'

interface Option {
  key: number
  text: string | ReactNode
  value: string | number
}

type IconPosition = 'start' | 'end'

export interface Props extends StandardProps {
  /** If true, the 'Select' will be disabled */
  disabled?: boolean
  /** Indicate whether `Select` is in error state */
  error?: boolean
  /** Component ID */
  id?: string
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  /** Placeholder option which is selected by default */
  placeholder?: string
  /** Whether icon should be placed at the beginning or end of the `TextField` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside TextField */
  icon?: ReactNode
  /** Whether `Select` should be rendered as native HTML `<select />` */
  native?: boolean
  /** Callback invoked when `Select` changes its state. */
  onChange?: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void
  /** List of options to be rendered as `Select` */
  options: Option[]
  /** Selected value */
  value?: string | number
}

const renderOptions = (
  options: Option[],
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
      <OptionComponent disabled key='placeholder' value=''>
        {placeholder}
      </OptionComponent>
    )
  }

  return resultOptions
}

export const Select: FunctionComponent<Props> = ({
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
  value
}) => {
  const isPlaceholderShown = placeholder && value === ''

  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [value, options]
  )

  const outlinedInput = (
    <OutlinedInput
      classes={{
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

  const menuProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    getContentAnchorEl: undefined // needed to restore default behaviour
  } as Partial<MenuProps>

  return (
    <MUISelect
      className={className}
      style={style}
      classes={{
        root: cx(classes[`root${capitalize(width!)}`], {
          [classes.selectNative]: native
        }),
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
      renderValue={() => (
        <React.Fragment>
          {iconPosition === 'start' && iconAdornment}
          <Typography className={classes.inputValue} inline color='inherit'>
            {selectedOption && selectedOption.text}
            {!selectedOption && placeholder}
          </Typography>
          {iconPosition === 'end' && iconAdornment}
        </React.Fragment>
      )}
      IconComponent={({ className }: { className: string }) => (
        <DropdownArrows16
          className={cx(className, {
            [classes.caretDisabled]: disabled
          })}
        />
      )}
      MenuProps={menuProps}
      onChange={onChange}
    >
      {renderOptions(options, placeholder, native)}
    </MUISelect>
  )
}

Select.defaultProps = {
  disabled: false,
  error: false,
  iconPosition: 'start',
  native: false,
  onChange: () => {},
  value: '',
  width: 'full'
}

Select.displayName = 'Select'

export default withStyles(styles)(Select)
