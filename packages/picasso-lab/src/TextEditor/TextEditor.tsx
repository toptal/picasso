import React, { forwardRef, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Container } from '@toptal/picasso'

import styles from './styles'
import Toolbar from './TextEditorToolbar'
import { TextEditorChangeHandler } from './types'
import { actions as toolbarActions } from './store/toolbar'
import useTextEditorState from './hooks/useTextEditorState'
import useHasFocus from './hooks/useHasFocus'
import QuillEditor from '../QuillEditor'
import useOnSelectionChange from './hooks/useOnSelectionChange'
import { ToolbarHandlers } from './store/toolbar/types'

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
  // TODO implement
  maxlength?: number
  /**
   * The minimum number of characters required that the user should enter.
   */
  // TODO implement
  minlength?: number
  /**
   * Callback on text change
   */
  onChange: TextEditorChangeHandler
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditor'
})

export const TextEditor = forwardRef<HTMLDivElement, Props>(function TextEditor(
  {
    'data-testid': dataTestId,
    autofocus,
    className,
    disabled,
    id,
    onChange,
    placeholder,
    style
  },
  ref
) {
  const classes = useStyles()
  const { dispatch, state } = useTextEditorState()

  const { handleFocusChange } = useHasFocus({ state, dispatch })
  const { handleSelectionChange } = useOnSelectionChange({ dispatch })

  const handleTextFormat = useCallback(
    (formatType: 'bold' | 'italic', value: boolean) => {
      const actionMap = {
        bold: toolbarActions.setBold,
        italic: toolbarActions.setItalic
      }
      const action = actionMap[formatType]

      action(dispatch)(value)
    },
    [dispatch]
  )

  const setToolbarHandlers = useCallback(
    (handlers: ToolbarHandlers) => {
      toolbarActions.setHandlers(dispatch)(handlers)
    },
    [dispatch]
  )

  return (
    <Container
      className={cx(className, classes.editorWrapper, {
        [classes.disabled]: disabled
      })}
      style={style}
    >
      <Toolbar
        id={id}
        formatState={state.toolbar.format}
        handlers={state.toolbar.handlers}
        disabled={disabled || state.toolbar.disabled}
      />
      <QuillEditor
        autofocus={autofocus}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        handleFocusChange={handleFocusChange}
        handleTextFormat={handleTextFormat}
        handleSelectionChange={handleSelectionChange}
        handleTextChange={onChange}
        setToolbarHandlers={setToolbarHandlers}
        data-testid={dataTestId}
        ref={ref}
      />
    </Container>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
