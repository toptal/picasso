import React, { forwardRef, useMemo, useCallback } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { $generateHtmlFromNodes } from '@lexical/html'

import noop from '../utils/noop'
import Container from '../Container'
import Typography from '../Typography'
import { useTypographyClasses } from './hooks'
import styles from './styles'
import type { ChangeHandler } from './types'
import ToolbarPlugin from '../LexicalEditorToolbarPlugin'

const useStyles = makeStyles<Theme>(styles, {
  name: 'LexicalEditor',
})

const removeAttributesFromString = (htmlString: string) => {
  return htmlString.replace(/\s(class|dir|value)="[^"]*"/g, '')
}

export type Props = BaseProps & {
  /** Indicates that an element is to be focused on page load */
  autoFocus?: boolean
  /** Default value in [HAST](https://github.com/syntax-tree/hast) format */
  //   defaultValue?: ASTType
  /**
   * This Boolean attribute indicates that the user cannot interact with the control.
   */
  disabled?: boolean
  /** unique identifier */
  id: string
  /**
   * @deprecated Use the `status` prop instead to both support success and error states
   * Indicate whether `RichTextEditor` is in error state
   */
  //   error?: boolean
  /** Indicate `RichTextEditor` is in `error` or `default` state */
  //   status?: Extract<Status, 'error' | 'default'>
  /** Used inside Form with combination of Label to enable forHtml functionality */
  //   hiddenInputId?: string
  /**
   * The maximum number of characters that the user can enter.
   * If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  //   maxLength?: number
  /**
   * The minimum number of characters required that the user should enter.
   */
  //   minLength?: number
  /** Name attribute of the input element */
  //   name?: string
  /**
   * Custom counter message for minLength
   */
  //   minLengthMessage?: CounterMessageSetter
  /**
   * Custom counter message for maxLength
   */
  //   maxLengthMessage?: CounterMessageSetter
  /**
   * Callback on text change
   */
  onChange?: ChangeHandler
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
  /** List of plugins to enable on the editor */
  //   plugins?: EditorPlugin[]
  //   setHasMultilineCounter?: (name: string, hasCounter: boolean) => void
  testIds?: {
    editor?: string
    // headerSelect?: string
    // boldButton?: string
    // italicButton?: string
    // unorderedListButton?: string
    // orderedListButton?: string
  }
  //   highlight?: 'autofill'
  //   customEmojis?: CustomEmojiGroup[]
}

const LexicalEditor = forwardRef<HTMLDivElement, Props>(function LexicalEditor(
  props,
  ref
) {
  const {
    // plugins,
    // autoFocus = false,
    // defaultValue,
    disabled,
    id,
    onChange = noop,
    // onFocus = noop,
    // onBlur = noop,
    placeholder,
    // minLength,
    // maxLength,
    // minLengthMessage,
    // maxLengthMessage,

    // status,
    testIds,
    // hiddenInputId,
    // setHasMultilineCounter,
    // @todo don't know what to do with NAME prop
    // name,
    // highlight,
    // customEmojis,
  } = props

  const classes = useStyles()

  // const toolbarRef = useRef<HTMLDivElement | null>(null)
  // @todo don't know what to do with this, maybe for future needs
  // const editorRef = useRef<HTMLDivElement | null>(null)

  const typographyClassNames = useTypographyClasses({
    variant: 'body',
    size: 'medium',
  })

  const theme = useMemo(
    () => ({
      paragraph: cx(typographyClassNames, classes.paragraph),
    }),
    [typographyClassNames, classes.paragraph]
  )

  const editorConfig: InitialConfigType = useMemo(
    () => ({
      theme,
      onError(error: Error) {
        throw error
      },
      namespace: 'editor',
    }),
    [theme]
  )

  const handleChange = useCallback(
    (editorState, editor) => {
      editorState.read(() => {
        const htmlValue = $generateHtmlFromNodes(editor, null)

        onChange(removeAttributesFromString(htmlValue))
      })
    },
    [onChange]
  )

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin disabled={disabled} />
      <OnChangePlugin ignoreSelectionChange onChange={handleChange} />
      <div className={classes.editorContainer} id={id} ref={ref}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={classes.contentEditable}
              data-testid={testIds?.editor}
            />
          }
          placeholder={
            <Container
              left='xsmall'
              top='small'
              className={classes.placeholder}
            >
              <Typography size='medium' color='grey'>
                {placeholder}
              </Typography>
            </Container>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  )
})

LexicalEditor.defaultProps = {
  onChange: noop,
}

LexicalEditor.displayName = 'LexicalEditor'

export default LexicalEditor
