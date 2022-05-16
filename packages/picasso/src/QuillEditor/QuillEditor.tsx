import React, { forwardRef, useRef } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import QuillEditorOutput from '../QuillEditorOutput'
import { useCombinedRefs } from '../utils'
import useQuillInstance from './hooks/useQuillInstance'
import {
  useFocus,
  useSubscribeToQuillEvents,
  useDisabledEditor,
  useKeyBindings,
  useSubscribeToTextEditorEvents
} from './hooks'
import useDefaultValue from './hooks/useDefaultValue'
import {
  TextFormatHandler,
  ChangeHandler,
  SelectionHandler,
  TextLengthChangeHandler
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
    onTextChange
  },
  ref
) {
  const quill = useQuillInstance({ id, placeholder })
  const editorRef = useCombinedRefs<HTMLDivElement>(
    ref,
    useRef<HTMLDivElement>(null)
  )

  useFocus({ isFocused, quill })
  useDisabledEditor({ disabled, quill })
  useKeyBindings({ quill, onTextFormat })
  useSubscribeToQuillEvents({
    quill,
    onTextChange,
    onSelectionChange,
    onTextLengthChange
  })
  useSubscribeToTextEditorEvents({
    editorRef,
    quill
  })
  useDefaultValue({ defaultValue, quill })

  return <QuillEditorOutput ref={editorRef} data-testid={dataTestId} id={id} />
})

QuillEditor.defaultProps = {
  disabled: false,
  isFocused: false,
  onSelectionChange: () => {},
  onTextFormat: () => {},
  onTextLengthChange: () => {},
  onTextChange: () => {}
}

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
