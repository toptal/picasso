import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Typography, Container } from '@toptal/picasso'
import './quill.snow.css'

import styles from './styles'
import TextEditorToolbar from './TextEditorToolbar'
import useTextEditor from './hooks/useTextEditor'
import { TextEditorChangeHandler } from './types'

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
  const { toolbarState, toolbarHandlers } = useTextEditor({
    id,
    onChange,
    placeholder,
    autofocus,
    disabled
  })

  return (
    <Container className={classes.editorWrapper}>
      <TextEditorToolbar
        id={id}
        state={toolbarState}
        handlers={toolbarHandlers}
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
