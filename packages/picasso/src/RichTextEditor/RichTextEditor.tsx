import React, { forwardRef, useCallback, useState } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
// import { useHasMultilineCounter } from '@toptal/picasso-shared'
import cx from 'classnames'
import hastUtilToHtml from 'hast-util-to-html'
import hastSanitize from 'hast-util-sanitize'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListItemNode, ListNode } from '@lexical/list'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { LinkNode } from '@lexical/link'
import { HeadingNode } from '@lexical/rich-text'
import { $getRoot, $insertNodes } from 'lexical'

import noop from '../utils/noop'
import type { EditorPlugin } from '../QuillEditor'
// import InputMultilineAdornment from '../InputMultilineAdornment'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import styles from './styles'
import type { ASTType } from '../RichText'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import type { Status } from '../OutlinedInput'
import type { CounterMessageSetter } from './types'
import validateUrl from './utils/validateUrl'
import Typography from '../Typography/Typography'
import getTypographyClassName from '../Typography/utils/get-typography-class-name/get-typography-class-name'
import { useTypographyClasses } from '../QuillEditor/formats'
import removeAttributes from '../QuillEditor/utils/remove-attributes'
import FocusPlugin from './plugins/FocusPlugin'
import BlurPlugin from './plugins/BlurPlugin'

export interface Props extends BaseProps {
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
  /**
   * @deprecated Use the `status` prop instead to both support success and error states
   * Indicate whether `RichTextEditor` is in error state
   */
  error?: boolean
  /** Indicate `RichTextEditor` is in `error` or `default` state */
  status?: Extract<Status, 'error' | 'default'>
  /** Used inside Form with combination of Label to enable forHtml functionality */
  hiddenInputId?: string
  /**
   * The maximum number of characters that the user can enter.
   * If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  maxLength?: number
  /**
   * The minimum number of characters required that the user should enter.
   */
  minLength?: number
  /** Name attribute of the input element */
  name?: string
  /**
   * Custom counter message for minLength
   */
  minLengthMessage?: CounterMessageSetter
  /**
   * Custom counter message for maxLength
   */
  maxLengthMessage?: CounterMessageSetter
  /**
   * Callback on text change
   */
  onChange?: (value: string) => void
  /**
   * Callback for blur event
   */
  onBlur?: () => void
  /**
   * Callback for focus event
   */
  onFocus?: () => void
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
  /** List of plugins to enable on the editor */
  plugins?: EditorPlugin[]
  setHasMultilineCounter?: (name: string, hasCounter: boolean) => void
  testIds?: {
    wrapper?: string
    editor?: string
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
  }
  highlight?: 'autofill'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'RichTextEditor',
})

export const RichTextEditor = forwardRef<HTMLDivElement, Props>(
  function RichTextEditor(props) {
    const {
      // 'data-testid': dataTestId,
      plugins,
      // autoFocus = false,
      className,
      defaultValue,
      disabled,
      // id,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      // placeholder,
      // minLength,
      // maxLength,
      // minLengthMessage,
      // maxLengthMessage,
      // style,
      status,
      // testIds,
      // hiddenInputId,
      // setHasMultilineCounter,
      // name,
      highlight,
    } = props

    const classes = useStyles()
    const typographyClasses = useTypographyClasses()

    const theme = {
      paragraph: getTypographyClassName(typographyClasses, {
        variant: 'body',
        size: 'medium',
      }),
      heading: {
        h3: getTypographyClassName(typographyClasses, {
          variant: 'heading',
          size: 'medium',
        }),
      },

      text: {
        bold: getTypographyClassName(typographyClasses, {
          variant: 'body',
          size: 'medium',
          weight: 'semibold',
        }),
        italic: classes.italic,
      },
    }

    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'RichTextEditor',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    // Possibly use useRef for synchronous updates but no re-rendering effect
    const [hasFocus, setFocus] = useState(false)

    const handleFocus = useCallback(() => {
      setFocus(true)
      onFocus?.()
    }, [onFocus])

    const handleBlur = useCallback(() => {
      setFocus(false)
      onBlur?.()
    }, [onBlur])

    const [defaultValueInHtml] = useState(() =>
      defaultValue ? hastUtilToHtml(hastSanitize(defaultValue)) : defaultValue
    )

    console.log(defaultValueInHtml)
    const editorConfig: InitialConfigType = {
      theme,
      onError(error: Error) {
        throw error
      },
      namespace: 'editor',
      nodes: [ListNode, ListItemNode, LinkNode, HeadingNode],
      editorState: editor => {
        editor.update(() => {
          if (!defaultValueInHtml) {
            return
          }
          const parser = new DOMParser()
          const dom = parser.parseFromString(defaultValueInHtml, 'text/html')

          // Once you have the DOM instance it's easy to generate LexicalNodes.
          const nodes = $generateNodesFromDOM(editor, dom)

          console.log(nodes)

          // Select the root
          $getRoot().select()
          $insertNodes(nodes)
        })
      },
    }

    return (
      <LexicalComposer initialConfig={editorConfig}>
        <div
          className={cx(
            classes.editorWrapper,
            {
              [classes.disabled]: disabled,
              [classes.focused]: hasFocus,
              [classes.error]: status === 'error',
              [classes.highlightAutofill]: highlight === 'autofill',
            },
            className
          )}
        >
          <ToolbarPlugin plugins={plugins} disabled={!hasFocus} />
          <FocusPlugin onFocus={handleFocus} />
          <BlurPlugin onBlur={handleBlur} />
          <ListPlugin />
          {/* <DefaultValuePlugin defaultValue={defaultValueInHtml} /> */}
          <LinkPlugin validateUrl={validateUrl} />
          <OnChangePlugin
            ignoreSelectionChange
            onChange={(editorState, editor) => {
              editorState.read(() => {
                const htmlValue = $generateHtmlFromNodes(editor, null)

                onChange?.(removeAttributes(htmlValue))
              })
            }}
          />
          <div className={classes.editorContainer}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable className={classes.contentEditable} />
              }
              placeholder={
                <Typography
                  size='medium'
                  color='grey'
                  className={classes.placeholder}
                >
                  Play around with the list plugin...
                </Typography>
              }
              ErrorBoundary={ErrorBoundary}
            />
          </div>
        </div>
      </LexicalComposer>
    )
  }
)

type ErrorBoundaryProps = {
  children: JSX.Element
  onError: (error: Error) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  render() {
    return this.props.children
  }
}

// const hiddenInputStyle: React.CSSProperties = {
//   position: 'absolute',
//   opacity: 0,
//   zIndex: -1,
// }

RichTextEditor.defaultProps = {
  autoFocus: false,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  disabled: false,
  status: 'default',
}

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
