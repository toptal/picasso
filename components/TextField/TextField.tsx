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
  /** TextField label */
  label: string
  /** The value of the component */
  value: string
  /** Indicate whether TextField is in error state */
  error: boolean
  /** If true, the switch will be disabled */
  disabled?: boolean
  classes: Classes
  className?: string
  /** Whether icon should be placed at the begining or end of TextField' */
  iconPosition: IconPosition
  /** Specify icon which should be rendered inside TextField */
  Icon: React.ReactNode
  InputProps: OutlinedInputProps
  InputLabelProps: Partial<InputLabelProps>
  /** Whether TextField should be rendered as TextArea or not */
  multiline?: boolean
  /** Specify rows amount for TextArea */
  rows?: number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /**  Callback fired when the state is changed.
   * <br />
   * <br />
   * <b>Signature:</b><br />
   * function(event: object, checked: boolean) => void<br />
   *  event: The event source of the callback. You can pull out the new value by accessing event.target.checked.<br />
   *  checked: The checked value of the switch
   */
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
          root: multiline ? classes.rootMultiline : classes.root,
          input: classes.input,
          inputMultiline: classes.inputMultiline
        }
      }}
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

export default withStyles(styles)(TextField)
