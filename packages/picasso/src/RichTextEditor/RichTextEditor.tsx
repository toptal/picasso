import React, { forwardRef, useCallback, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import Container from '../Container'
import QuillEditor from '../QuillEditor'
import Toolbar from '../RichTextEditorToolbar'
import styles from './styles'
import {
  useTextEditorState,
  useOnSelectionChange,
  useOnTextFormat,
  useOnFocus,
  useToolbarHandlers
} from './hooks'

export interface Props extends BaseProps {
  /** Indicates that an element is to be focused on page load */
  autofocus?: boolean
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
  getMinLengthMessage?: (minLength: number, currLength: number) => string
  /**
   * Custom counter message for maxlength
   */
  getMaxLengthMessage?: (maxLength: number, currLength: number) => string
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
      disabled,
      id,
      onChange,
      placeholder,
<<<<<<< HEAD
=======
      minlength,
      maxlength,
<<<<<<< HEAD
>>>>>>> 403109da7 (chore: initial commit)
=======
      getMinLengthMessage,
      getMaxLengthMessage,
>>>>>>> ce941ed45 (chore: add counter component)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const [counterMessage, setCounterMessage] = useState(
      'initial counter message'
    )
>>>>>>> 403109da7 (chore: initial commit)
=======
    const [counterMessage, setCounterMessage] = useState('')
>>>>>>> ce941ed45 (chore: add counter component)

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

<<<<<<< HEAD
<<<<<<< HEAD
=======
    React.useEffect(() => {
      console.log(counterMessage)
    }, [counterMessage])

>>>>>>> 403109da7 (chore: initial commit)
=======
>>>>>>> ce941ed45 (chore: add counter component)
    return (
      <Container
        className={cx(
          classes.editorWrapper,
          {
            [classes.disabled]: disabled,
            [classes.isFocused]: isEditorFocused
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
<<<<<<< HEAD
=======
          minLength={minlength}
          maxLength={maxlength}
          getMinLengthMessage={getMinLengthMessage}
          getMaxLengthMessage={getMaxLengthMessage}
          counterMessageHandler={setCounterMessage}
>>>>>>> 403109da7 (chore: initial commit)
          onTextFormat={handleTextFormat}
          onSelectionChange={handleSelectionChange}
          onTextChange={onChange}
        />
        {(minlength || maxlength) && (
          <Container className={cx(classes.counter, className)} style={style}>
            {counterMessage}
          </Container>
        )}
      </Container>
    )
  }
)

RichTextEditor.defaultProps = {
  autofocus: false,
  disabled: false
}

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
