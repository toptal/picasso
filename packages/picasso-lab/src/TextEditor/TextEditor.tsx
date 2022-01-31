import React, { forwardRef, useEffect, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Typography, Container } from '@toptal/picasso'

import styles from './styles'
import TextEditorToolbar from './TextEditorToolbar'
import {
  TextEditorChangeHandler,
  ToolbarStateType,
  ToolbarHandlers,
  SharedState
} from './types'
import TextEditorLogic from './TextEditorLogic'
import TextEditorWraper, { StateContext } from './InitEditor'
import InitEditor from './InitEditor'

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

type ConnectViewWithLogicType = {
  setBla: (sharedState: SharedState) => void
} & SharedState

const ConnectViewWithLogic = ({
  setBla,
  toolbarState,
  toolbarHandlers,
  isToolbarDisabled
}: ConnectViewWithLogicType) => {
  useEffect(() => {
    setBla({ toolbarState, toolbarHandlers, isToolbarDisabled })
  }, [setBla, toolbarState, toolbarHandlers, isToolbarDisabled])

  return null
}

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

  return (
    <InitEditor id={id} placeholder={placeholder}>
      {({ state: { editor, toolbar }, isInit }) => (
        <Container
          className={cx(classes.editorWrapper, {
            [classes.disabled]: disabled
          })}
        >
          <TextEditorToolbar
            id={id}
            formatState={toolbar.format}
            handlers={toolbar.handlers}
            disabled={isInit || disabled || toolbar.disabled}
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
      )}
    </InitEditor>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
