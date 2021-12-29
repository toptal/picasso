import React, { forwardRef, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import Quill from 'quill'
import { Typography, Container } from '@toptal/picasso'
import './quill.snow.css'

import styles from './styles'
import TextEditorToolbar, {
  ToolbarState,
  ToolbarKey
} from './TextEditorToolbar'
import useInitEditor from './hooks/useInitEditor'
import useHandleChangeEvent from './hooks/useHandleChangeEvent'
import useHandleChangeFromController from './hooks/useHandleChangeFromController'
import useDisableEditor from './hooks/useDisableEditor'
import useHandleAutofocus from './hooks/useHandleAutofocus'
import { HTMLString, TextEditorChangeHandler } from './types'

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
  /**
   * This Boolean attribute indicates that the user cannot modify the
   * value of the control. Unlike the disabled attribute, the readonly
   * attribute does not prevent the user from clicking or selecting in the control.
   */
  // TODO implement
  readonly?: boolean
  /**
   * HTML content of TextEditor
   */
  value?: HTMLString
}

// Using { index: 1 } to inject CSS generated classes after the button's classes
// in order to prevent Button's styles to override custom TextEditor styles
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditor',
  index: 10
})

const formatingOptions = [
  { value: '1', text: 'Normal Text' },
  { value: '2', text: 'Heading' }
]

export const TextEditor = forwardRef<HTMLDivElement, Props>(function TextEditor(
  {
    'data-testid': dataTestId,
    autofocus,
    className,
    disabled,
    id,
    onChange,
    placeholder,
    style,
    value
  },
  ref
) {
  const editorRef = useRef<Quill>()
  const classes = useStyles()
  const [selected, setSelected] = useState<string>(formatingOptions[0].value)
  const [toolbarAction, setToolbarAction] = useState<ToolbarState>({
    bold: false,
    italic: false,
    unorderedList: false,
    orderedList: false
  })

  useInitEditor(editorRef, { id, placeholder })
  useHandleChangeEvent(editorRef, { onChange })
  useHandleChangeFromController(editorRef, { value })
  useDisableEditor(editorRef, { disabled })
  useHandleAutofocus(editorRef, { autofocus })

  const handleFormattingChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    setSelected(event.target.value)
  }

  const toggleActiveFormat = (key: ToolbarKey) => () =>
    setToolbarAction((prev: ToolbarState) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Container className={classes.editorWrapper}>
      <TextEditorToolbar
        id={id}
        toolbarAction={toolbarAction}
        toggleActiveFormat={toggleActiveFormat}
        selected={selected}
        formatingOptions={formatingOptions}
        handleFormattingChange={handleFormattingChange}
        classes={classes}
      />
      <Typography
        as='div'
        variant='body'
        color='dark-grey'
        size='medium'
        className={cx(classes.root, className)}
        data-testid={dataTestId}
        id={id}
        ref={ref}
        style={style}
      />
    </Container>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
