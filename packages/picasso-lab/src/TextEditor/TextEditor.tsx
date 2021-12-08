import React, { forwardRef, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import styles from './styles'
import useInitEditor from './hooks/useInitEditor'
import useHandleChangeEvent from './hooks/useHandleChangeEvent'
import useHandleChangeFromController from './hooks/useHandleChangeFromController'
import useDisableEditor from './hooks/useDisableEditor'
import useHandleAutofocus from './hooks/useHandleAutofocus'

type HTMLString = string

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
  onChange: (value: HTMLString) => void
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

const useStyles = makeStyles<Theme>(styles)

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

  useInitEditor(editorRef, { id, placeholder })
  useHandleChangeEvent(editorRef, { onChange })
  useHandleChangeFromController(editorRef, { value })
  useDisableEditor(editorRef, { disabled })
  useHandleAutofocus(editorRef, { autofocus })

  return (
    <div
      className={cx(classes.root, className)}
      data-testid={dataTestId}
      id={id}
      ref={ref}
      style={style}
    />
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
