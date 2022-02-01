import React, { forwardRef, Dispatch } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Container } from '@toptal/picasso'

import styles from './styles'
import Toolbar from './TextEditorToolbar'
import { TextEditorChangeHandler, ActionsType, StateType } from './types'
import useTextEditorState from './hooks/useTextEditorState'
import useHasFocus from './hooks/useHasFocus'
import QuillEditor from '../QuillEditor'

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

// Using { index: 1 } to inject CSS generated classes after the button's classes
// in order to prevent Button's styles to override custom TextEditor styles
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
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

  return (
    <Container
      className={cx(classes.editorWrapper, {
        [classes.disabled]: disabled
      })}
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
        handleFormatChange={() => {}}
        handleTextChange={onChange}
      />
    </Container>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
