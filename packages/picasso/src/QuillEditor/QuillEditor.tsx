import React, { forwardRef, useRef } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import QuillEditorView from '../QuillEditorView'
import { useCombinedRefs } from '../utils'
import useQuillInstance from './hooks/useQuillInstance'
import {
  useFocus,
  useSubscribeToQuillEvents,
  useDisabledEditor,
  useKeyBindings,
  useSubscribeToTextEditorEvents,
} from './hooks'
import useDefaultValue from './hooks/useDefaultValue'
import type {
  TextFormatHandler,
  ChangeHandler,
  SelectionHandler,
  TextLengthChangeHandler,
  EditorPlugin,
} from './types'

export type Props = BaseProps & {
  /**
   * HTML string
   */
  defaultValue?: string
  disabled: boolean
  id: string
  isFocused: boolean
  placeholder?: string
  plugins?: EditorPlugin[]
  onSelectionChange: SelectionHandler
  onTextFormat: TextFormatHandler
  onTextChange: ChangeHandler
  onTextLengthChange: TextLengthChangeHandler
}

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    defaultValue,
    disabled,
    'data-testid': dataTestId,
    id,
    isFocused,
    placeholder,
    onTextLengthChange,
    onSelectionChange,
    onTextFormat,
    onTextChange,
    plugins,
  },
  ref
) {
  const quill = useQuillInstance({ id, placeholder, plugins })
  const editorRef = useCombinedRefs<HTMLDivElement>(
    ref,
    useRef<HTMLDivElement>(null)
  )

  useFocus({ isFocused, quill })
  useKeyBindings({ quill, onTextFormat })
  useSubscribeToQuillEvents({
    quill,
    onTextChange,
    onSelectionChange,
    onTextLengthChange,
  })
  useSubscribeToTextEditorEvents({
    editorRef,
    quill,
  })
  useDefaultValue({ defaultValue, quill })
  useDisabledEditor({ disabled, quill })

  return <QuillEditorView ref={editorRef} data-testid={dataTestId} id={id} />
})

QuillEditor.defaultProps = {
  disabled: false,
  isFocused: false,
  onSelectionChange: () => {},
  onTextFormat: () => {},
  onTextLengthChange: () => {},
  onTextChange: () => {},
}

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
