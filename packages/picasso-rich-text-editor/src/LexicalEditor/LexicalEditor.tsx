import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import { $generateHtmlFromNodes } from '@lexical/html'
import { ListItemNode, ListNode } from '@lexical/list'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode } from '@lexical/rich-text'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@toptal/picasso'
import type { BaseProps } from '@toptal/picasso-shared'
import { noop } from '@toptal/picasso/utils'
import type { LexicalEditor as LexicalEditorType } from 'lexical'
import { $getRoot } from 'lexical'

import ToolbarPlugin from '../LexicalEditorToolbarPlugin'
import { RTEPluginContextProvider } from '../plugins/api'
import { CustomEmojiNode } from '../plugins/EmojiPlugin/nodes/CustomEmojiNode'
import {
  EmojiPlugin,
  ListPlugin,
  TextLengthPlugin,
  HeadingsReplacementPlugin,
  TriggerInitialOnChangePlugin,
  FocusOnLabelClickPlugin,
} from '../plugins'
import type { ASTType } from '../RichText'
import { useOnFocus, useTypographyClasses } from './hooks'
import { useComponentPlugins } from './hooks/useComponentPlugins/useComponentPlugins'
import styles from './styles'
import type {
  ChangeHandler,
  CustomEmojiGroup,
  EditorPlugin,
  TextLengthChangeHandler,
} from './types'
import { cleanupHtmlOutput, createLexicalTheme, setEditorValue } from './utils'

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

  testIds?: {
    editor?: string
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
  }
  customEmojis?: CustomEmojiGroup[]
  /** List of plugins to enable on the editor */
  plugins?: EditorPlugin[]
  hiddenInputId?: string
}

const LexicalEditor = forwardRef<HTMLDivElement, Props>(function LexicalEditor(
  props,
  ref
) {
  const {
    plugins = [],
    autoFocus = false,
    defaultValue,
    disabled = false,
    id,
    onChange = noop,
    onTextLengthChange = noop,
    onFocus = noop,
    onBlur = noop,
    placeholder,
    testIds,
    customEmojis,
    hiddenInputId,
  } = props

  const classes = useStyles()

  const toolbarRef = useRef<HTMLDivElement | null>(null)

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
    [typographyClassNames, classes]
  )

  const { componentPlugins, lexicalNodes } = useComponentPlugins(plugins)

  const editorConfig: InitialConfigType = useMemo(
    () => ({
      editorState: (editor: LexicalEditorType) =>
        setEditorValue(editor, defaultValue),
      theme,
      onError(error: Error) {
        throw error
      },
      namespace: 'editor',
      nodes: [
        CustomEmojiNode,
        ListNode,
        ListItemNode,
        HeadingNode,
        ...lexicalNodes,
      ],
      editable: !disabled,
    }),
    [defaultValue, theme, disabled, lexicalNodes]
  )

  const handleChange = useCallback(
    (editorState, editor) => {
      editorState.read(() => {
        const root = $getRoot()
        const topLevelChildren = root.getChildren()

        const hasNoChildren = topLevelChildren.length === 0
        const hasOneEmptyChild =
          topLevelChildren.length === 1 && topLevelChildren[0].isEmpty()

        if (hasNoChildren || hasOneEmptyChild) {
          onChange('')

          return
        }

        const htmlValue = $generateHtmlFromNodes(editor, null)
        const [cleanedValue] = [htmlValue]
          .map(removeAttributesFromString)
          .map(cleanupHtmlOutput)

        onChange(cleanedValue)
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
        <RTEPluginContextProvider disabled={disabled} isFocused={isFocused}>
          <ToolbarPlugin
            disabled={disabled || !isFocused}
            toolbarRef={toolbarRef}
            // remount Toolbar when disabled
            key={`${disabled || !isFocused}`}
            customEmojis={customEmojis}
            plugins={plugins}
            testIds={testIds}
          />

          {defaultValue ? (
            <TriggerInitialOnChangePlugin onChange={handleChange} />
          ) : null}

          <OnChangePlugin ignoreSelectionChange onChange={handleChange} />
          {autoFocus && <AutoFocusPlugin />}

          <HeadingsReplacementPlugin />
          <TextLengthPlugin onTextLengthChange={onTextLengthChange} />
          <ListPlugin />
          <EmojiPlugin />
          <HistoryPlugin />
          {hiddenInputId && (
            <FocusOnLabelClickPlugin hiddenInputId={hiddenInputId} />
          )}

          {componentPlugins}

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
        </RTEPluginContextProvider>
      </div>
    </LexicalComposer>
  )
})

LexicalEditor.displayName = 'LexicalEditor'

export default LexicalEditor
