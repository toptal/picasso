import React, { forwardRef, useMemo, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import hastUtilToHtml from 'hast-util-to-html'
import hastSanitize from 'hast-util-sanitize'
import { noop } from '@toptal/picasso/utils'

import Container from '../Container'
import QuillEditor from '../QuillEditor'
import Toolbar from '../RichTextEditorToolbar'
import Counter from '../RichTextEditorCounter'
import styles from './styles'
import {
  useTextEditorState,
  useOnSelectionChange,
  useOnTextFormat,
  useOnFocus,
  useToolbarHandlers,
  useCounter
} from './hooks'
import { ASTType } from './types'

export type CounterMessageSetter = (
  limit: number,
  currLength: number,
  isError: boolean
) => string

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
  /**
   * Indicate wether the editor is in an error state
   */
  error?: boolean
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
  onChange?: (value: string) => void
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
  testIds?: {
    wrapper?: string
    editor?: string
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'RichTextEditor'
})

export const RichTextEditor = forwardRef<HTMLDivElement, Props>(
  function RichTextEditor(
    {
      'data-testid': dataTestId,
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
      error,
      testIds
    },
    ref
  ) {
    const classes = useStyles()
    const toolbarRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const { dispatch, state } = useTextEditorState()

    const { handleSelectionChange } = useOnSelectionChange({ dispatch })
    const { handleTextFormat } = useOnTextFormat({ dispatch })
    const {
      handleBold,
      handleItalic,
      handleHeader,
      handleOrdered,
      handleUnordered
    } = useToolbarHandlers({
      editorRef,
      handleTextFormat,
      format: state.toolbar.format
    })

    const { isEditorFocused, handleFocus, handleBlur } = useOnFocus({
      autoFocus,
      editorRef,
      toolbarRef,
      wrapperRef,
      onFocus,
      onBlur,
      dispatch
    })

    const defaultValueInHtml = useMemo(
      // this effects needs to happen only once on first render
      () =>
        defaultValue
          ? hastUtilToHtml(hastSanitize(defaultValue))
          : defaultValue,
      /* eslint-disable-next-line */
      []
    )

    const { counterMessage, counterError, handleCounterMessage } = useCounter({
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage
    })

    return (
      <Container
        className={cx(
          classes.editorWrapper,
          {
            [classes.disabled]: disabled,
            [classes.focused]: isEditorFocused,
            [classes.error]: error
          },
          className
        )}
        tabIndex={-1}
        style={style}
        ref={node => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref != null) {
            ref.current = node
          }
          // @ts-ignore
          wrapperRef.current = node
        }}
        data-testid={testIds?.wrapper || dataTestId}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Toolbar
          ref={toolbarRef}
          disabled={disabled || state.toolbar.disabled}
          id={id}
          format={state.toolbar.format}
          onBoldClick={handleBold}
          onItalicClick={handleItalic}
          onUnorderedClick={handleUnordered}
          onOrderedClick={handleOrdered}
          onHeaderChange={handleHeader}
          testIds={{
            headerSelect: testIds?.headerSelect,
            boldButton: testIds?.boldButton,
            italicButton: testIds?.italicButton,
            unorderedListButton: testIds?.unorderedListButton,
            orderedListButton: testIds?.orderedListButton
          }}
        />
        <QuillEditor
          ref={editorRef}
          disabled={disabled!} // eslint-disable-line @typescript-eslint/no-non-null-assertion
          data-testid={testIds?.editor}
          id={id}
          isFocused={isEditorFocused}
          placeholder={placeholder}
          onTextLengthChange={handleCounterMessage}
          onTextFormat={handleTextFormat}
          onSelectionChange={handleSelectionChange}
          onTextChange={onChange}
          defaultValue={defaultValueInHtml}
        />
        {counterMessage && (
          <Counter error={counterError} message={counterMessage} />
        )}
      </Container>
    )
  }
)

RichTextEditor.defaultProps = {
  autoFocus: false,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  disabled: false
}

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
