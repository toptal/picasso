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
import { TextFormatHandler, ChangeHandler, SelectionHandler } from './types'
import useDefaultValue from './hooks/useDefaultValue'

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
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    defaultValue,
    disabled,
    'data-testid': dataTestId,
    id,
    isFocused,
    placeholder,
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
    onSelectionChange
  })
  useSubscribeToTextEditorEvents({
    editorRef,
    quill
  })
  useDefaultValue({ defaultValue, quill })

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
