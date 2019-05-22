import React, { FunctionComponent, ChangeEvent, ReactNode } from 'react'
import cx from 'classnames'
import MUISelect from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core/utils/helpers'

import FormControl from '../FormControl'
import OutlinedInput from '../OutlinedInput'
import MenuItem from '../MenuItem'
import { StandardProps } from '../Picasso'
import { DropdownArrows } from '../Icon'
import styles from './styles'

interface Option {
  key: number
  text: string | ReactNode
  value: string | number
}

export interface Props extends StandardProps {
  /** If true, the switch will be disabled */
  disabled?: boolean
  error?: boolean
  /** Component ID */
  id?: string
  /** Width of the component which will apply `min-width` to the `input` */
  width?: 'full' | 'shrink' | 'auto'
  /** Placeholder option which is selected by default */
  placeholder?: string
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

const SelectIcon = ({ className }: { className: string }) => (
  <DropdownArrows className={className} size={1} />
)

export const Select: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  width,
  id,
  native,
  options,
  placeholder,
  disabled,
  error,
  onChange,
  value
}) => {
  const fullWidth = width === 'full'

  const outlinedInput = (
    <OutlinedInput
      classes={{
        input: classes.input
      }}
      fullWidth={fullWidth}
      labelWidth={0}
    />
  )

  const select = (
    <MUISelect
      className={className}
      style={style}
      classes={{
        root: cx(classes.root, classes[`root${capitalize(width!)}`]),
        icon: classes.icon,
        select: classes.select
      }}
      displayEmpty
      id={id}
      input={outlinedInput}
      native={native}
      variant='outlined'
      value={value}
      IconComponent={SelectIcon}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        getContentAnchorEl: undefined // needed to restore default behaviour
      }}
      onChange={onChange}
    >
      {renderOptions(options, placeholder, native)}
    </MUISelect>
  )

  return (
    <FormControl
      error={error}
      disabled={disabled}
      className={cx(className, { [classes.rootFull]: fullWidth })}
    >
      {select}
    </FormControl>
  )
}

Select.defaultProps = {
  disabled: false,
  error: false,
  native: false,
  onChange: () => {},
  value: '',
  width: 'full'
}

Select.displayName = 'Select'

export default withStyles(styles)(Select)
