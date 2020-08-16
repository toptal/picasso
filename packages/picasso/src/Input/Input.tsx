import React, {
  ReactNode,
  ReactElement,
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef
} from 'react'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import InputAdornment from '../InputAdornment'
import OutlinedInput from '../OutlinedInput'
import { disableUnsupportedProps } from '../utils'
import { FeatureOptions } from '../utils/disable-unsupported-props'
import styles from './styles'

type IconPosition = 'start' | 'end'
type CounterType = 'remaining' | 'entered'

export interface Props
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  inputProps?: InputBaseComponentProps
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** Whether a multiline can be manually resized by the user, requires multiline prop to be set to true */
  multilineResizable?: boolean
  /** If true, the input element will be focused during the first mount */
  autoFocus?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /** Maximum number of rows to display when multiline option is set to true. */
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
  /** Adds a counter of characters - is ignored in combination with `counter: entered` */
  limit?: number
  /** Type of the counter of characters */
  counter?: CounterType
  /**
   * Size of component
   * @default medium
   */
  size?: SizeType<'small' | 'medium'>
  /** Whether to render reset icon when there is a value in the input */
  enableReset?: boolean
  /** Callback invoked when reset button was clicked */
  onResetClick?: () => void
}

type LimitAdornmentProps = Pick<Props, 'multiline' | 'limit' | 'counter'> & {
  charsLength: number
}

type IconAdornmentProps = Pick<Props, 'disabled' | 'icon'> & {
  position: Props['iconPosition']
}

type StartAdornmentProps = Pick<Props, 'icon' | 'iconPosition' | 'disabled'>

type EndAdornmentProps = Pick<
  Props,
  'icon' | 'iconPosition' | 'disabled' | 'multiline' | 'limit' | 'counter'
> & { charsLength?: number }

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoInput' })

const hasCounter = (counter: CounterType, limit?: number) =>
  limit || counter === 'entered'

const getCounter = (
  counter: CounterType,
  charsLength: number,
  limit?: number
) => {
  if (counter === 'remaining') {
    return {
      isNegative: charsLength >= limit!,
      limitValue: limit! - charsLength
    }
  }

  return {
    isNegative: false,
    limitValue: charsLength
  }
}

const getMultilineRemainingLabel = (limitValue: number) =>
  limitValue >= 0 ? ' characters left' : ' over the limit'

const LimitAdornment = (props: LimitAdornmentProps) => {
  const classes = useStyles(props)
  const { multiline, charsLength, counter, limit } = props

  const { limitValue, isNegative } = getCounter(counter!, charsLength!, limit)
  const multilineLabel = multiline
    ? counter === 'remaining' && limit
      ? getMultilineRemainingLabel(limitValue)
      : ' characters entered'
    : null

  return (
    <InputAdornment
      data-testid='multiline-label'
      position='end'
      className={cx({
        [classes.limiterMultiline]: multiline
      })}
    >
      <span
        className={cx(classes.limiter, {
          [classes.limiterNegative]: isNegative
        })}
      >
        {multiline ? Math.abs(limitValue) : limitValue}
        {multilineLabel}
      </span>
    </InputAdornment>
  )
}

const IconAdornment = (props: IconAdornmentProps) => {
  const { position, disabled, icon } = props
  const classes = useStyles(props)
  const styledIcon = React.cloneElement(icon as ReactElement, {
    className: classes.icon,
    role: 'presentation'
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
  const {
    icon,
    iconPosition,
    disabled,
    limit,
    multiline,
    charsLength,
    counter
  } = props

  if (icon && iconPosition === 'end') {
    return <IconAdornment disabled={disabled} position='end' icon={icon} />
  }

  if (hasCounter(counter!, limit)) {
    return (
      <LimitAdornment
        charsLength={charsLength!}
        multiline={multiline}
        counter={counter}
        limit={limit}
      />
    )
  }

  return null
}

const purifyProps = (props: Props) => {
  const sizeOptions: FeatureOptions<Props> = {
    featureProps: {
      size: 'small'
    },
    unsupportedProps: {
      multiline: false,
      icon: undefined,
      startAdornment: undefined,
      endAdornment: undefined,
      limit: undefined
    }
  }

  return disableUnsupportedProps('Input', props, sizeOptions)
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
    inputProps,
    children,
    multiline,
    multilineResizable,
    autoFocus,
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
    counter,
    size,
    enableReset,
    onResetClick,
    ...rest
  } = purifyProps(props)

  const charsLength = value ? value.length : 0

  const classes = useStyles(props)

  return (
    <OutlinedInput
      ref={ref}
      className={className}
      style={style}
      classes={{
        root: cx(classes.root, {
          [classes.rootMultiline]: multiline,
          [classes.rootMultilineLimiter]:
            multiline && hasCounter(counter!, limit)
        }),
        input: cx(classes.input, {
          [classes.inputMultilineResizable]: multiline && multilineResizable
        })
      }}
      id={id}
      name={name}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      multiline={multiline}
      autoFocus={autoFocus}
      rows={rows}
      rowsMax={rowsMax}
      type={type}
      width={width}
      size={size}
      // html attributes
      inputProps={{
        ...rest,
        ...inputProps
      }}
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
            multiline={multiline}
            counter={counter}
          />
        )
      }
      onChange={onChange}
      enableReset={enableReset}
      onResetClick={onResetClick}
    >
      {children}
    </OutlinedInput>
  )
})

Input.defaultProps = {
  autoComplete: 'none',
  counter: 'remaining',
  iconPosition: 'start',
  multiline: false,
  size: 'medium',
  width: 'auto',
  onChange: () => {},
  onResetClick: () => {}
}

Input.displayName = 'Input'

export default Input
