import React from 'react'
import cx from 'classnames'
import MUITextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput'
import { InputLabelProps } from '@material-ui/core/InputLabel'

import InputAdornment from '../InputAdornment'
import { Classes } from '../styles/types'
import styles from './styles'

type IconPosition = 'start' | 'end'

export interface Props {
  /** Name attribute of the input element */
  name: string
  /** Text label for the `TextField` */
  label: string
  /** The value of the component */
  value: string
  /** Indicate whether `TextField` is in error state */
  error: boolean
  /** If true, the switch will be disabled */
  disabled?: boolean
  classes: Classes
  className?: string
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Whether icon should be placed at the beginning or end of the `TextField` */
  iconPosition: IconPosition
  /** Specify icon which should be rendered inside TextField */
  Icon: React.ReactNode
  InputProps: OutlinedInputProps
  InputLabelProps: Partial<InputLabelProps>
  /** Whether `TextField` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /**  Callback invoked when `TextField` changes its state */
  onChange: (
    event: React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void
}

export const TextField: React.FunctionComponent<Props> = props => {
  const {
    Icon,
    iconPosition,
    InputProps = {} as OutlinedInputProps,
    InputLabelProps = {},
    classes,
    children,
    multiline,
    fullWidth,
    className,
    ...restProps
  } = props

  if (Icon) {
    const IconAdornment = (
      <InputAdornment
        className={cx(
          classes.icon,
          iconPosition === 'end' ? classes.iconEnd : classes.iconStart
        )}
        position={iconPosition}
      >
        {Icon}
      </InputAdornment>
    )

    // InputLabelProps.shrink = 'auto' TODO: uncomment when 'auto' PR is merged
    InputProps.notched = false
    InputLabelProps.classes = { shrink: classes.shrink }

    if (iconPosition === 'end') {
      InputProps.endAdornment = IconAdornment
    } else {
      InputProps.startAdornment = IconAdornment
      InputLabelProps.className = classes.labelIconStart
    }
  }

  return (
    <MUITextField
      InputLabelProps={{
        ...InputLabelProps,
        classes: {
          root: classes.label,
          shrink: classes.labelShrink
        }
      }}
      InputProps={{
        ...InputProps,
        classes: {
          root: cx(classes.root, {
            [classes.rootMultiline]: multiline
          }),
          input: classes.input,
          inputMultiline: classes.inputMultiline
        }
      }}
      className={cx(classes.rootFixedWidth, className, {
        [classes.rootFullWidth]: fullWidth
      })}
      multiline={multiline}
      {...restProps}
      variant='outlined'
    >
      {children}
    </MUITextField>
  )
}

TextField.defaultProps = {
  iconPosition: 'end',
  multiline: false
}

TextField.displayName = 'TextField'

export default withStyles(styles)(TextField)
