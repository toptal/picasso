import React, { forwardRef, useMemo, useCallback, useRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode } from '@lexical/rich-text'
import { $generateHtmlFromNodes } from '@lexical/html'
import { ListItemNode, ListNode } from '@lexical/list'
import { $isRootTextContentEmpty } from '@lexical/text'
import type { LexicalEditor as LexicalEditorType } from 'lexical'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'

import { TriggerInitialOnChangePlugin } from './plugins'
import { createLexicalTheme, setEditorValue } from './utils'
import noop from '../utils/noop'
import Container from '../Container'
import Typography from '../Typography'
import { useTypographyClasses, useOnFocus } from './hooks'
import styles from './styles'
import type { ChangeHandler, TextLengthChangeHandler } from './types'
import ToolbarPlugin from '../LexicalEditorToolbarPlugin'
import LexicalTextLengthPlugin from '../LexicalTextLengthPlugin'
import LexicalListPlugin from '../LexicalListPlugin'
import LexicalHeadingsReplacementPlugin from '../LexicalHeadingsReplacementPlugin'
import type { ASTType } from '../RichText'

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
  defaultValue?: ASTType
  /**
   * This Boolean attribute indicates that the user cannot interact with the control.
   */
  disabled?: boolean
  /** unique identifier */
  id: string
  /** Name attribute of the input element */
  //   name?: string
  /**
   * Callback on text change
   */
  onChange?: ChangeHandler
  /**
   * Callback for blur event
   */
  onBlur?: () => void
  /**
   * Callback for focus event
   */
  onFocus?: () => void
  /**
   * Callback on text length change
   */
  onTextLengthChange: TextLengthChangeHandler
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
  /** List of plugins to enable on the editor */
  //   plugins?: EditorPlugin[]
  testIds?: {
    editor?: string
    // headerSelect?: string
    // boldButton?: string
    // italicButton?: string
    // unorderedListButton?: string
    // orderedListButton?: string
  }
  //   customEmojis?: CustomEmojiGroup[]
}

const LexicalEditor = forwardRef<HTMLDivElement, Props>(function LexicalEditor(
  props,
  ref
) {
  const {
    // plugins,
    autoFocus = false,
    defaultValue,
    disabled = false,
    id,
    onChange = noop,
    onTextLengthChange = noop,
    onFocus = noop,
    onBlur = noop,
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

  const toolbarRef = useRef<HTMLDivElement | null>(null)
  // const editorRef = useRef<HTMLDivElement | null>(ref)
  // Possibly use useRef for synchronous updates but no re-rendering effect

  const typographyClassNames = useTypographyClasses({
    variant: 'body',
    size: 'medium',
  })

  const theme = useMemo(
    () =>
      createLexicalTheme({
        typographyClassNames,
        classes,
      }),
    [typographyClassNames, classes.paragraph]
  )

  const editorConfig: InitialConfigType = useMemo(
    () => ({
      editorState: (editor: LexicalEditorType) => {
        if (defaultValue) {
          setEditorValue(editor, defaultValue)
        }
      },
      theme,
      onError(error: Error) {
        throw error
      },
      namespace: 'editor',
      nodes: [ListNode, ListItemNode, HeadingNode],
      editable: !disabled,
    }),
    [theme, disabled]
  )

  const handleChange = useCallback(
    (editorState, editor) => {
      editorState.read(() => {
        const isEmpty = $isRootTextContentEmpty(editor.isComposing(), false)

        const htmlValue = isEmpty
          ? ''
          : removeAttributesFromString($generateHtmlFromNodes(editor, null))

        onChange(htmlValue)
      })
    },
    [onChange]
  )

  const { isFocused, handleFocus, handleBlur } = useOnFocus({
    onFocus,
    onBlur,
    internalRefs: [toolbarRef],
  })

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div onFocus={handleFocus} onBlur={handleBlur} tabIndex={-1}>
        <ToolbarPlugin
          disabled={disabled || !isFocused}
          toolbarRef={toolbarRef}
          // remount Toolbar when disabled
          key={`${disabled || !isFocused}`}
        />
        {defaultValue ? (
          <TriggerInitialOnChangePlugin onChange={handleChange} />
        ) : null}
        <OnChangePlugin ignoreSelectionChange onChange={handleChange} />
        {autoFocus && <AutoFocusPlugin />}

        <LexicalHeadingsReplacementPlugin />
        <LexicalTextLengthPlugin onTextLengthChange={onTextLengthChange} />
        <LexicalListPlugin />

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
                <Typography size='medium' color='grey-main-2'>
                  {placeholder}
                </Typography>
              </Container>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
    </LexicalComposer>
  )
})

LexicalEditor.displayName = 'LexicalEditor'

export default LexicalEditor
