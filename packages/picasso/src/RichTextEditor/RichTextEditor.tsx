import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import hastUtilToHtml from 'hast-util-to-html'

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

export interface Props extends BaseProps {
  /** Indicates that an element is to be focused on page load */
  autofocus?: boolean
  /** Default value in [HAST](https://github.com/syntax-tree/hast) format */
  defaultValue?: ASTType
  /**
   * This Boolean attribute indicates that the user cannot interact with the control.
   */
  disabled?: boolean
  /** unique identificator */
  id: string
  /**
   * The maximum number of characters that the user can enter.
   * If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  maxlength?: number
  /**
   * The minimum number of characters required that the user should enter.
   */
  minlength?: number
  /**
   * Custom counter message for minlength
   */
  minLengthMessage?: (minLength: number, currLength: number) => string
  /**
   * Custom counter message for maxlength
   */
  maxLengthMessage?: (maxLength: number, currLength: number) => string
  /**
   * Callback on text change
   */
  onChange: (value: string) => void
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
  testIds?: {
    wrapper?: string
    editor?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'RichTextEditor'
})

export const RichTextEditor = forwardRef<HTMLDivElement, Props>(
  function RichTextEditor(
    {
      'data-testid': dataTestId,
      autofocus,
      className,
      defaultValue,
      disabled,
      id,
      onChange,
      placeholder,
      minlength,
      maxlength,
      minLengthMessage,
      maxLengthMessage,
      style,
      testIds
    },
    ref
  ) {
    const classes = useStyles()
    const toolbarRef = useRef<HTMLDivElement>(null)
    const editorRef = useRef<HTMLDivElement>(null)
    const { dispatch, state } = useTextEditorState()
    const [isEditorFocused, setIsEditorFocused] = useState(autofocus!) // eslint-disable-line @typescript-eslint/no-non-null-assertion

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

    const { handleFocus, handleBlur } = useOnFocus({
      editorRef,
      toolbarRef,
      onFocus: useCallback(() => setIsEditorFocused(true), [
        setIsEditorFocused
      ]),
      onBlur: useCallback(() => setIsEditorFocused(false), [
        setIsEditorFocused
      ]),
      dispatch
    })

    const defaultValueInHtml = useMemo(
      () => (defaultValue ? hastUtilToHtml(defaultValue) : defaultValue),
      // this effects needs to happen only once on first render
      /* eslint-disable-next-line */
      []
    )

    const { counterMessage, handleCounterMessage } = useCounter({
      minlength,
      maxlength,
      minLengthMessage,
      maxLengthMessage
    })

    return (
      <Container
        className={cx(
          classes.editorWrapper,
          {
            [classes.disabled]: disabled,
            [classes.focused]: isEditorFocused
          },
          className
        )}
        tabIndex={-1}
        style={style}
        ref={ref}
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
        />
        <QuillEditor
          ref={editorRef}
          disabled={disabled!} // eslint-disable-line @typescript-eslint/no-non-null-assertion
          data-testid={testIds?.editor}
          id={id}
          isFocused={isEditorFocused}
          placeholder={placeholder}
          maxlength={maxlength}
          onTextLengthChange={handleCounterMessage}
          onTextFormat={handleTextFormat}
          onSelectionChange={handleSelectionChange}
          onTextChange={onChange}
          defaultValue={defaultValueInHtml}
        />
        {(minlength || maxlength) && <Counter message={counterMessage} />}
      </Container>
    )
  }
)

RichTextEditor.defaultProps = {
  autofocus: false,
  disabled: false,
  minLengthMessage: (minlength, currLength) =>
    `${minlength} characters required, current count is ${
      minlength - currLength
    }`,
  maxLengthMessage: (maxlength, currLength) =>
    `${maxlength - currLength} characters left`
}

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
