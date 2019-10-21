import React, {
  ReactNode,
  ReactElement,
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useState
} from 'react'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'

import InputAdornment from '../InputAdornment'
import OutlinedInput from '../OutlinedInput'
import { BaseProps } from '../Picasso'
import styles from './styles'

type IconPosition = 'start' | 'end'

export interface Props
  extends BaseProps,
    InputHTMLAttributes<HTMLInputElement> {
  /** The id of the `input` element. */
  id?: string
  /** Name attribute of the input element */
  name?: string
  /** The default `input` element value. Use when the component is not controlled. */
  defaultValue?: string
  /** The value of the `input` element, required for a controlled component. */
  value?: string
  /** Placeholder for value */
  placeholder?: string
  /** Indicate whether `Input` is in error state */
  error?: boolean
  /** If true, the `Input` will be disabled */
  disabled?: boolean
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Whether icon should be placed at the beginning or end of the `Input` */
  iconPosition?: IconPosition
  /** Specify icon which should be rendered inside Input */
  icon?: ReactNode
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: string | number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /** Adds element at the start of the input - can't be used in combination with `iconPosition: start` */
  startAdornment?: ReactNode
  /** Adds element at the end of the input - can't be used in combination with `iconPosition: end` */
  endAdornment?: ReactNode
  /**  Callback invoked when `Input` changes its state */
  onChange?: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void
  /** Adds a counter of characters */
  limit?: number
}

type LimitAdornmentProps = Pick<Props, 'multiline'> & {
  charsLength: number
  limit: number
}

type IconAdornmentProps = Pick<Props, 'disabled' | 'icon'> & {
  position: Props['iconPosition']
}

type StartAdornmentProps = Pick<Props, 'icon' | 'iconPosition' | 'disabled'>

type EndAdornmentProps = Pick<
  Props,
  'icon' | 'iconPosition' | 'disabled' | 'limit' | 'multiline'
> & { charsLength?: number }

const useStyles = makeStyles<Theme, Props>(styles)

const LimitAdornment = (props: LimitAdornmentProps) => {
  const { multiline, charsLength, limit } = props
  const classes = useStyles(props)

  return (
    <InputAdornment
      position='end'
      classes={{
        root: multiline ? classes.counterMultiline : ''
      }}
    >
      <span
        className={cx(classes.counter, {
          [classes.counterNegative]: charsLength >= limit
        })}
      >
        {limit - charsLength}
      </span>
    </InputAdornment>
  )
}

const IconAdornment = (props: IconAdornmentProps) => {
  const { position, disabled, icon } = props
  const classes = useStyles(props)
  const styledIcon = React.cloneElement(icon as ReactElement, {
    className: classes.icon
  })

  return (
    <InputAdornment position={position!} disabled={disabled}>
      {styledIcon}
    </InputAdornment>
  )
}

const StartAdornment = ({
  icon,
  iconPosition,
  disabled
}: StartAdornmentProps) => {
  if (!icon || iconPosition !== 'start') return null

  return <IconAdornment disabled={disabled} position='start' icon={icon} />
}

const EndAdornment = (props: EndAdornmentProps) => {
  const { icon, iconPosition, disabled, limit, multiline, charsLength } = props

  if (icon && iconPosition === 'end') {
    return <IconAdornment disabled={disabled} position='end' icon={icon} />
  } else if (limit) {
    return (
      <LimitAdornment
        limit={limit}
        charsLength={charsLength as number}
        multiline={multiline}
      />
    )
  }

  return null
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  props,
  ref
) {
  const {
    id,
    name,
    defaultValue,
    value,
    placeholder,
    error,
    disabled,
    icon,
    iconPosition,
    children,
    multiline,
    width,
    className,
    style,
    rows,
    rowsMax,
    type,
    onChange,
    startAdornment,
    endAdornment,
    limit,
    ...rest
  } = props
  const [charsLength, setCharsLength] = useState(value ? value.length : 0)

  const handleChange: Props['onChange'] = e => {
    if (limit) {
      setCharsLength(e.target.value.length)
    }

    if (onChange) {
      onChange(e)
    }
  }

  const classes = useStyles(props)

  return (
    <OutlinedInput
      ref={ref}
      className={className}
      style={style}
      classes={{
        root: cx(classes.root, {
          [classes.rootMultiline]: multiline
        }),
        input: classes.input
      }}
      id={id}
      name={name}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      type={type}
      width={width}
      // html attributes
      inputProps={rest}
      startAdornment={
        startAdornment || (
          <StartAdornment
            icon={icon}
            iconPosition={iconPosition}
            disabled={disabled}
          />
        )
      }
      endAdornment={
        endAdornment || (
          <EndAdornment
            icon={icon}
            iconPosition={iconPosition}
            disabled={disabled}
            limit={limit}
            charsLength={charsLength}
          />
        )
      }
      onChange={handleChange}
    >
      {children}
    </OutlinedInput>
  )
})

Input.defaultProps = {
  autoComplete: 'none',
  iconPosition: 'start',
  multiline: false,
  width: 'auto'
}

Input.displayName = 'Input'

export default Input
