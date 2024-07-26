import type {
  ChangeEventHandler,
  ReactType,
  ReactNode,
  InputHTMLAttributes,
  MouseEvent,
} from 'react'
import type { SizeType, BaseProps } from '@toptal/picasso-shared'
// TODO: replace with mui/base
import type { InputBaseComponentProps } from '@material-ui/core/InputBase'

export type WidthType = 'full' | 'shrink' | 'auto'

export type Size = SizeType<'small' | 'medium' | 'large'>

export type ValueType =
  | (string | number | boolean | object)[]
  | string
  | number
  | boolean
  | object

export type Status = 'error' | 'success' | 'default'

export type BaseInputProps = InputBaseComponentProps & {
  variant?: 'dark' | 'light'
}

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    BaseProps {
  size?: number | 'small' | 'medium' | 'large'
  multiple?: boolean | undefined
}

export interface Props
  extends BaseProps,
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'value' | 'defaultValue' | 'size' | 'color'
    > {
  /** Classes for input and root */
  classes?: { input?: string; root?: string }
  /** Width of the component */
  width?: WidthType
  inputComponent?: ReactType<InputBaseComponentProps>
  inputProps?: BaseInputProps
  defaultValue?: ValueType
  value?: ValueType
  /** Whether `Input` should be rendered as `TextArea` or not */
  multiline?: boolean
  /** If true, `TextArea` would be resizable vertical */
  multilineResizable?: boolean
  /** If true, the input element will be focused during the first mount */
  autoFocus?: boolean
  /** Specify rows amount for `TextArea` */
  rows?: string | number
  /* Maximum number of rows to display when multiline option is set to true. */
  rowsMax?: string | number
  /** Type attribute of the Input element. It should be a valid HTML5 input type */
  type?: string
  /**
   * @deprecated [FX-4715] Use the `status` prop instead to both support success and error states
   * Indicate whether input is in error state
   */
  error?: boolean
  /** Indicate input status */
  status?: Status
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement>
  /** Component size */
  size?: Size
  /** Whether to render reset icon when there is a value in the input */
  enableReset?: boolean
  /** Callback invoked when reset button was clicked */
  onResetClick?: (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => void
  /** Ref of the input element */
  inputRef?: React.Ref<HTMLInputElement>
  testIds?: {
    resetButton?: string
    validIcon?: string
  }
  highlight?: 'autofill'
}
