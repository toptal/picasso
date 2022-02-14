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
<<<<<<< HEAD
  useSubscribeToTextEditorEvents
=======
  useSubscribeToTextEditorEvents,
  useMinMaxLength
>>>>>>> 403109da7 (chore: initial commit)
} from './hooks'
import { TextFormatHandler, ChangeHandler, SelectionHandler } from './types'

export type Props = BaseProps & {
  disabled: boolean
  id: string
  isFocused: boolean
  placeholder?: string
<<<<<<< HEAD
=======
  minLength?: number
  maxLength?: number
  getMinLengthMessage?: (minLength: number, currLength: number) => string
  getMaxLengthMessage?: (maxLength: number, currLength: number) => string
  counterMessageHandler: React.Dispatch<React.SetStateAction<string>>
>>>>>>> 403109da7 (chore: initial commit)
  onSelectionChange: SelectionHandler
  onTextFormat: TextFormatHandler
  onTextChange: ChangeHandler
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
<<<<<<< HEAD
=======
    minLength,
    maxLength,
    getMinLengthMessage,
    getMaxLengthMessage,
    counterMessageHandler,
>>>>>>> 403109da7 (chore: initial commit)
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
<<<<<<< HEAD
=======
  useMinMaxLength({
    quill,
    minLength,
    maxLength,
    getMinLengthMessage,
    getMaxLengthMessage,
    counterMessageHandler
  })
>>>>>>> 403109da7 (chore: initial commit)
  useKeyBindings({ quill, onTextFormat })
  useSubscribeToQuillEvents({
    quill,
    onTextChange,
    onSelectionChange
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
  onTextChange: () => {}
}

QuillEditor.displayName = 'QuillEditor'

export default QuillEditor
