import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { Status as OutlinedInputStatus } from '@toptal/picasso-outlined-input'
import { InputMultilineAdornment } from '@toptal/picasso-input-adornment'
import type { BaseProps } from '@toptal/picasso-shared'
import { useHasMultilineCounter } from '@toptal/picasso-shared'
import { noop } from '@toptal/picasso-utils'
import cx from 'classnames'
import React, { forwardRef, useCallback, useRef, useState } from 'react'

import type {
  ChangeHandler,
  EditorPlugin,
  LexicalEditorProps,
} from '../LexicalEditor'
import LexicalEditor from '../LexicalEditor'
import type { ASTType } from '../RichText'
import { useCounter } from './hooks'
import styles from './styles'
import type { CounterMessageSetter } from './types'

export interface Props extends BaseProps {
  /** Indicates that an element is to be focused on page load */
  autoFocus?: boolean
  /** Default value in [HAST](https://github.com/syntax-tree/hast) format */
  defaultValue?: ASTType
  /**
   * This Boolean attribute indicates that the user cannot interact with the control.
   */
  disabled?: boolean
  /** unique identifier */
  id: string
  /** Indicate `RichTextEditor` is in `error` or `default` state */
  status?: Extract<OutlinedInputStatus, 'error' | 'default'>
  /** Used inside Form with combination of Label to enable forHtml functionality */
  hiddenInputId?: string
  /**
   * The maximum number of characters that the user can enter.
   * If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  maxLength?: number
  /**
   * The minimum number of characters required that the user should enter.
   */
  minLength?: number
  /** Name attribute of the input element */
  name?: string
  /**
   * Custom counter message for minLength
   */
  minLengthMessage?: CounterMessageSetter
  /**
   * Custom counter message for maxLength
   */
  maxLengthMessage?: CounterMessageSetter
  /**
   * Callback on text change
   */
  onChange?: ChangeHandler
  /**
   * Callback for blur event
   */
  onBlur?: () => void
  /**
   * Callback for focus event
   */
  onFocus?: () => void
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
  /** List of plugins to enable on the editor */
  plugins?: EditorPlugin[]
  setHasMultilineCounter?: (name: string, hasCounter: boolean) => void
  testIds?: {
    wrapper?: string
    editor?: string
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
  }
  highlight?: 'autofill'
  customEmojis?: LexicalEditorProps['customEmojis']
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'RichTextEditor',
})

export const RichTextEditor = forwardRef<HTMLDivElement, Props>(
  function RichTextEditor(props, ref) {
    const {
      'data-testid': dataTestId,
      plugins,
      autoFocus = false,
      className,
      defaultValue,
      disabled,
      id,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      placeholder,
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage,
      style,
      status,
      testIds,
      hiddenInputId,
      setHasMultilineCounter,
      name,
      highlight,
      customEmojis,
    } = props

    const classes = useStyles()
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    // Possibly use useRef for synchronous updates but no re-rendering effect
    const [hasFocus, setFocus] = useState(false)

    const handleFocus = useCallback(() => {
      setFocus(true)
      onFocus()
    }, [onFocus])

    const handleBlur = useCallback(() => {
      setFocus(false)
      onBlur()
    }, [onBlur])

    const { counterMessage, counterError, handleCounterMessage } = useCounter({
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage,
    })

    useHasMultilineCounter(name, !!counterMessage, setHasMultilineCounter)

    return (
      <>
        <div
          className={cx(
            classes.editorWrapper,
            {
              [classes.disabled]: disabled,
              [classes.focused]: hasFocus,
              [classes.error]: status === 'error',
              [classes.highlightAutofill]: highlight === 'autofill',
            },
            className
          )}
          style={style}
          ref={node => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref !== null) {
              ref.current = node
            }
            wrapperRef.current = node
          }}
          data-testid={testIds?.wrapper || dataTestId}
        >
          <LexicalEditor
            id={id}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            onTextLengthChange={handleCounterMessage}
            testIds={testIds}
            disabled={disabled}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            plugins={plugins}
            customEmojis={customEmojis}
            hiddenInputId={hiddenInputId}
          />
        </div>
        {counterMessage && (
          <InputMultilineAdornment error={counterError}>
            {counterMessage}
          </InputMultilineAdornment>
        )}
      </>
    )
  }
)

RichTextEditor.defaultProps = {
  autoFocus: false,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  disabled: false,
  status: 'default',
}

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
