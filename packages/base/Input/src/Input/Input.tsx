/* eslint-disable max-lines */
import type {
  ReactNode,
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
} from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'
import { useHasMultilineCounter } from '@toptal/picasso-shared'
import { OutlinedInput } from '@toptal/picasso-outlined-input'
import {
  disableUnsupportedProps,
  usePropDeprecationWarning,
} from '@toptal/picasso-utils'
import type { FeatureOptions } from '@toptal/picasso-utils'
import {
  InputLimitAdornment,
  InputIconAdornment,
  InputValidIconAdornment,
} from '@toptal/picasso-input-adornment'
import { Container } from '@toptal/picasso-container'
import type {
  InputLimitAdornmentProps,
  InputIconAdornmentProps,
} from '@toptal/picasso-input-adornment'
import type { BaseInputProps, Status } from '@toptal/picasso-outlined-input'
import { useFieldsLayoutContext } from '@toptal/picasso-form'

import styles from './styles'

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
  /**
   * @deprecated Use the `status` prop instead to both support success and error states
   * Indicate whether `Input` is in error state
   */
  error?: boolean
  /** Indicate `Input` status */
  status?: Status
  /** If true, the `Input` will be disabled */
  disabled?: boolean
  /** Width of the component */
  width?: 'full' | 'shrink' | 'auto'
  /** Whether icon should be placed at the beginning or end of the `Input` */
  iconPosition?: InputIconAdornmentProps['position']
  /** Specify icon which should be rendered inside Input */
  icon?: InputIconAdornmentProps['icon']
  inputProps?: BaseInputProps
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
  /** Adds a counter of characters (ignored in combination with `counter: entered`) */
  limit?: InputLimitAdornmentProps['limit']
  /** Type of the counter of characters */
  counter?: InputLimitAdornmentProps['counter']
  /** Component size */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** Whether to render reset icon when there is a value in the input */
  enableReset?: boolean
  /** Callback invoked when reset button was clicked */
  onResetClick?: (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => void
  /** Ref of the input outline */
  outlineRef?: React.Ref<HTMLElement>
  testIds?: {
    inputAdornment?: string
    resetButton?: string
    validIcon?: string
  }
  setHasMultilineCounter?: (name: string, hasCounter: boolean) => void
  highlight?: 'autofill'
}

type StartAdornmentProps = Pick<Props, 'icon' | 'iconPosition' | 'disabled'>

type EndAdornmentProps = Pick<
  Props,
  | 'icon'
  | 'iconPosition'
  | 'disabled'
  | 'multiline'
  | 'limit'
  | 'counter'
  | 'status'
  | 'testIds'
> & { charsLength?: number; showCounter: boolean }

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoInput' })

const hasRemainingCounter = ({
  counter,
  limit,
}: Pick<Props, 'counter' | 'limit'>) =>
  Boolean(counter === 'remaining' && limit)

const hasEnteredCounter = ({ counter }: Pick<Props, 'counter'>) =>
  counter === 'entered'

const hasCounter = ({ counter, limit }: Pick<Props, 'counter' | 'limit'>) =>
  hasRemainingCounter({ counter, limit }) || hasEnteredCounter({ counter })

const hasMultilineAdornment = ({
  multiline,
  status,
  counter,
  limit,
}: Pick<Props, 'multiline' | 'status' | 'counter' | 'limit'>) =>
  multiline && (status === 'success' || hasCounter({ counter, limit }))

const StartAdornment = ({
  icon,
  iconPosition,
  disabled,
}: StartAdornmentProps) => {
  if (!icon || iconPosition !== 'start') {
    return null
  }

  return <InputIconAdornment disabled={disabled} position='start' icon={icon} />
}

const EndAdornment = (props: EndAdornmentProps) => {
  const {
    icon,
    iconPosition,
    disabled,
    limit,
    multiline,
    charsLength,
    testIds,
    counter,
    showCounter,
  } = props

  if (icon && iconPosition === 'end') {
    return <InputIconAdornment disabled={disabled} position='end' icon={icon} />
  }

  if (!multiline && showCounter) {
    return (
      <InputLimitAdornment
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        charsLength={charsLength!}
        multiline={multiline}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        counter={counter!}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        limit={limit!}
        testIds={testIds}
      />
    )
  }

  return null
}

type MultilineAdornmentProps = Pick<
  Props,
  'counter' | 'limit' | 'status' | 'testIds'
> &
  Pick<EndAdornmentProps, 'charsLength' | 'showCounter'>

const MultilineAdornment = ({
  charsLength,
  counter,
  limit,
  showCounter,
  status,
  testIds,
}: MultilineAdornmentProps) => {
  return (
    <Container flex>
      {showCounter && (
        <InputLimitAdornment
          testIds={testIds}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          charsLength={charsLength!}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          counter={counter!}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          limit={limit!}
          multiline
        />
      )}
      {status === 'success' && (
        <InputValidIconAdornment data-testid={testIds?.validIcon} multiline />
      )}
    </Container>
  )
}

const purifyProps = (props: Props) => {
  const sizeOptions: FeatureOptions<Props> = {
    featureProps: {
      size: 'small',
    },
    unsupportedProps: {
      multiline: false,
      icon: undefined,
      startAdornment: undefined,
      endAdornment: undefined,
      limit: undefined,
    },
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
    status,
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
    onClick,
    startAdornment,
    endAdornment,
    limit,
    counter,
    size,
    enableReset,
    onResetClick,
    outlineRef,
    testIds,
    setHasMultilineCounter,
    highlight,
    ...rest
  } = purifyProps(props)

  usePropDeprecationWarning({
    props,
    name: 'error',
    componentName: 'Input',
    description:
      'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
  })

  const charsLength = value ? value.length : 0

  const classes = useStyles()

  const { layout } = useFieldsLayoutContext()

  const showCounter = !!charsLength && hasCounter({ counter, limit })

  useHasMultilineCounter(name, showCounter && multiline, setHasMultilineCounter)

  return (
    <>
      <OutlinedInput
        ref={outlineRef}
        inputRef={ref}
        className={className}
        style={style}
        classes={{
          root: cx(classes.root, {
            [classes.rootMultiline]: multiline,
            [classes.highlightAutofill]: highlight === 'autofill',
            [classes.horizontalLayout]: layout === 'horizontal',
          }),
          input: cx(classes.input, {
            [classes.inputMultilineResizable]: multiline && multilineResizable,
          }),
        }}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        status={error ? 'error' : status}
        disabled={disabled}
        multiline={multiline}
        autoFocus={autoFocus}
        rows={rows}
        rowsMax={rowsMax}
        type={type}
        width={width}
        size={size}
        onClick={onClick}
        // html attributes
        inputProps={{
          ...rest,
          ...inputProps,
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
              status={status}
              testIds={testIds}
              showCounter={showCounter}
            />
          )
        }
        onChange={onChange}
        enableReset={enableReset}
        onResetClick={onResetClick}
        testIds={testIds}
      >
        {children}
      </OutlinedInput>
      {hasMultilineAdornment({
        multiline,
        status,
        limit,
        counter,
      }) && (
        <MultilineAdornment
          charsLength={charsLength}
          status={status}
          testIds={testIds}
          showCounter={showCounter}
          counter={counter}
          limit={limit}
        />
      )}
    </>
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
  onResetClick: () => {},
  status: 'default',
}

Input.displayName = 'Input'

export default Input
