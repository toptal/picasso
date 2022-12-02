import React, { forwardRef, useMemo, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, useHasMultilineCounter } from '@toptal/picasso-shared'
import cx from 'classnames'
import hastUtilToHtml from 'hast-util-to-html'
import hastSanitize from 'hast-util-sanitize'

import noop from '../utils/noop'
import Container from '../Container'
import QuillEditor, { EditorPlugin } from '../QuillEditor'
import InputMultilineAdornment from '../InputMultilineAdornment'
import Toolbar from '../RichTextEditorToolbar'
import styles from './styles'
import {
  useTextEditorState,
  useOnSelectionChange,
  useOnTextFormat,
  useOnFocus,
  useToolbarHandlers,
  useCounter,
} from './hooks'
import { ASTType } from '../RichText'
import { usePropDeprecationWarning } from '../utils/use-deprecation-warnings'
import { Status } from '../OutlinedInput'
import { CounterMessageSetter } from './types'

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
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'RichTextEditor',
})

export const RichTextEditor = forwardRef<HTMLDivElement, Props>(
  function RichTextEditor(props, ref) {
    const {
      'data-testid': dataTestId,
      plugins,
      autoFocus = false,
      className,
      defaultValue,
      disabled,
      id,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      placeholder,
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage,
      style,
      status,
      testIds,
      hiddenInputId,
      setHasMultilineCounter,
      name,
    } = props

    const classes = useStyles()
    const toolbarRef = useRef<HTMLDivElement | null>(null)
    const editorRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const { dispatch, state } = useTextEditorState()

    usePropDeprecationWarning({
      props,
      name: 'error',
      componentName: 'RichTextEditor',
      description:
        'Use the `status` prop instead. `error` is deprecated and will be removed in the next major release.',
    })

    const { handleSelectionChange } = useOnSelectionChange({ dispatch })
    const { handleTextFormat } = useOnTextFormat({ dispatch })
    const {
      handleBold,
      handleItalic,
      handleHeader,
      handleOrdered,
      handleUnordered,
      handleLink,
    } = useToolbarHandlers({
      editorRef,
      handleTextFormat,
      format: state.toolbar.format,
    })

    const { isEditorFocused, handleFocus, handleBlur } = useOnFocus({
      autoFocus,
      editorRef,
      toolbarRef,
      wrapperRef,
      onFocus,
      onBlur,
      dispatch,
    })

    const [defaultValueInHtml] = useState(() =>
      defaultValue ? hastUtilToHtml(hastSanitize(defaultValue)) : defaultValue
    )

    const { counterMessage, counterError, handleCounterMessage } = useCounter({
      minLength,
      maxLength,
      minLengthMessage,
      maxLengthMessage,
    })

    // Disabled the exhaustive deps rule to allow users to
    // declare prop like "plugins={[]}" instead of having to
    // declare the array outside the component level
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedPlugins = useMemo(() => plugins, [])

    useHasMultilineCounter(name, !!counterMessage, setHasMultilineCounter)

    return (
      <>
        <Container
          className={cx(
            classes.editorWrapper,
            {
              [classes.disabled]: disabled,
              [classes.focused]: isEditorFocused,
              [classes.error]: status === 'error',
            },
            className
          )}
          tabIndex={-1}
          style={style}
          ref={node => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref != null) {
              ref.current = node
            }
            wrapperRef.current = node
          }}
          data-testid={testIds?.wrapper || dataTestId}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <Toolbar
            ref={toolbarRef}
            disabled={disabled || state.toolbar.disabled}
            id={id}
            format={state.toolbar.format}
            onBoldClick={handleBold}
            onItalicClick={handleItalic}
            onUnorderedClick={handleUnordered}
            onOrderedClick={handleOrdered}
            onHeaderChange={handleHeader}
            onLinkClick={handleLink}
            plugins={memoizedPlugins}
            testIds={{
              headerSelect: testIds?.headerSelect,
              boldButton: testIds?.boldButton,
              italicButton: testIds?.italicButton,
              unorderedListButton: testIds?.unorderedListButton,
              orderedListButton: testIds?.orderedListButton,
            }}
          />
          <QuillEditor
            ref={editorRef}
            disabled={!!disabled}
            data-testid={testIds?.editor}
            id={id}
            isFocused={isEditorFocused}
            placeholder={placeholder}
            onTextLengthChange={handleCounterMessage}
            onTextFormat={handleTextFormat}
            onSelectionChange={handleSelectionChange}
            onTextChange={onChange}
            defaultValue={defaultValueInHtml}
            plugins={memoizedPlugins}
          />
          {hiddenInputId && enableFocusOnLabelClick(hiddenInputId)}
        </Container>
        {counterMessage && (
          <InputMultilineAdornment error={counterError}>
            {counterMessage}
          </InputMultilineAdornment>
        )}
      </>
    )
  }
)

const hiddenInputStyle: React.CSSProperties = {
  position: 'absolute',
  opacity: 0,
  zIndex: -1,
}

// Native `for` attribute on label does not work for div target
const enableFocusOnLabelClick = (hiddenInputId: string) => (
  <input type='text' id={hiddenInputId} style={hiddenInputStyle} />
)

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
