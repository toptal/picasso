import React from 'react'
import cx from 'classnames'
import MUISelect from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'

import FormControl from '../FormControl'
import InputLabel from '../InputLabel'
import Input from '../Input'
import OutlinedInput from '../OutlinedInput'
import MenuItem from '../MenuItem'
import { Classes } from '../styles/types'
import styles from './styles'

interface Option {
  key: number
  text: string | React.ReactNode
  value: string | number
}

export interface Props {
  classes: Classes
  className?: string
  /** If true, the switch will be disabled */
  disabled?: boolean
  /** Component id */
  id?: string
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Shrinking label */
  label?: string
  /** Placeholder option which is selected by default */
  placeholder?: string
  /** 'Whether Select should be rendered as native HTML &lt;select /&gt; */
  native?: boolean
  /**
   *  Callback fired when the state is changed.
   *   <br />
   *   <br />
   *   <b>Signature:</b>
   *   function(event: object, child: node) => void
   *   event: The event source of the callback.
   *   child: Child node which was selected by user
   */
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => void
  /**
   *  [<br/>
   *  &nbsp;&nbsp;{ value: '1', text: 'Option 1' },<br/>
   *  &nbsp;&nbsp;{ value: '2', text: 'Option 2' },<br/>
   *  &nbsp;&nbsp;{ value: '3', text: 'Option 3' },<br/>
   *  &nbsp;&nbsp;{ value: '4', text: 'Option 4' }<br/>
   *  ]
   */
  options: Option[]
  /** Selected value */
  value?: string | number
  /** The variant to use */
  variant?: 'standard' | 'outlined'
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
    // @ts-ignore
    <OptionComponent key={key || value} value={value}>
      {text}
    </OptionComponent>
  ))

  if (placeholder) {
    resultOptions.unshift(
      // @ts-ignore
      <OptionComponent disabled key='placeholder' value=''>
        {placeholder}
      </OptionComponent>
    )
  }

  return resultOptions
}

export const Select: React.FunctionComponent<Props> = props => {
  const {
    classes,
    className,
    fullWidth,
    id,
    label,
    native,
    options,
    placeholder,
    variant,
    ...rest
  } = props
  const hasLabel = !!label
  const outlinedInput =
    variant === 'outlined' ? (
      <OutlinedInput
        classes={{
          input: hasLabel ? classes.inputWithLabel : classes.input
        }}
        fullWidth={fullWidth}
        labelWidth={0}
      />
    ) : (
      <Input
        classes={{
          input: hasLabel ? classes.inputWithLabel : classes.input
        }}
        disableUnderline
        fullWidth={fullWidth}
      />
    )

  const select = (
    <MUISelect
      className={className}
      classes={{
        root: fullWidth ? classes.rootFullWidth : classes.root,
        icon: classes.icon,
        select: classes.select
      }}
      displayEmpty
      id={id}
      input={outlinedInput}
      native={native}
      variant={variant}
      {...rest}
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
    >
      {renderOptions(options, placeholder, native)}
    </MUISelect>
  )

  return (
    <FormControl
      className={cx(className, { [classes.rootFullWidth]: fullWidth })}
    >
      {hasLabel && (
        <InputLabel
          classes={{
            root: classes.label,
            shrink: classes.labelShrink
          }}
          htmlFor={id}
          variant={variant}
        >
          {label}
        </InputLabel>
      )}
      {select}
    </FormControl>
  )
}

Select.defaultProps = {
  native: false,
  onChange: () => {},
  value: '',
  variant: 'outlined'
}

export default withStyles(styles)(Select)
