import React, { forwardRef, useRef } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useCombinedRefs } from '../utils'
import Typography from '../Typography'
import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'
import {
  useFocus,
  useSubscribeToQuillEvents,
  useDisabledEditor,
  useKeyBindings,
  useSubscribeToTextEditorEvents
} from './hooks'
import {
  TextFormatHandler,
  ChangeHandler,
  SelectionHandler,
  TextLengthChangeHandler
} from './types'

export type Props = BaseProps & {
  disabled: boolean
  id: string
  isFocused: boolean
  placeholder?: string
  maxlength?: number
  onSelectionChange: SelectionHandler
  onTextFormat: TextFormatHandler
  onTextChange: ChangeHandler
  onTextLengthChange: TextLengthChangeHandler
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    disabled,
    'data-testid': dataTestId,
    id,
    isFocused,
    placeholder,
    maxlength,
    onTextLengthChange,
    onSelectionChange,
    onTextFormat,
    onTextChange
  },
  ref
) {
  const classes = useStyles()
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
    onTextLengthChange,
    maxlength
  })
  useSubscribeToTextEditorEvents({
    editorRef,
    quill
  })

  return (
    <Typography
      as='div'
      variant='body'
      color='dark-grey'
      size='medium'
      className={classes.root}
      data-testid={dataTestId}
      id={id}
      ref={editorRef}
    />
  )
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
