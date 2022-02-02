import React, { forwardRef, useEffect } from 'react'
import { Typography } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'
import useAutofocus from './hooks/useAutofocus'
import useSubscribeToQuillEvents from './hooks/useSubscribeToQuillEvents'
import useDisabledEditor from './hooks/useDisabledEditor'
import useEditorLoseFocusFix from './hooks/useEditorLoseFocusFix'
import useKeyBindings from './hooks/useKeyBindings'
import {
  ToolbarHandlers,
  ToolbarStateType
} from '../TextEditor/store/toolbar/types'
import useToolbarHandlers from './hooks/useToolbarHandlers'

export type Props = BaseProps & {
  autofocus?: boolean
  id: string
  placeholder?: string
  handleFocusChange?: (isFocused: boolean) => void
  handleTextChange: (html: string) => void
  handleTextFormat: (formatType: 'bold' | 'italic', value: boolean) => void
  handleListFormat: (value: 'bullet' | 'ordered' | false) => void
  handleSelectionChange: (format: ToolbarStateType['format']) => void
  disabled?: boolean
  onInit: (props: { toolbarHandlers: ToolbarHandlers }) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    autofocus,
    disabled,
    id,
    'data-testid': dataTestId,
    placeholder,
    handleFocusChange,
    handleTextChange,
    handleTextFormat,
    handleSelectionChange,
    handleListFormat,
    onInit
  },
  ref
) {
  const classes = useStyles()
  const quill = useQuillInstance({ id, placeholder })

  useSubscribeToQuillEvents({
    quill,
    handleFocusChange,
    handleTextChange,
    handleSelectionChange
  })

  useAutofocus({ autofocus, quill })
  useDisabledEditor({ disabled, quill })

  // common issue of custom toolbar
  // https://github.com/quilljs/quill/issues/1290
  // when clicking anywhere quill loses focus, we need
  // to prevent it when clicking inside toolbar
  useEditorLoseFocusFix({ quill, id })

  useKeyBindings({ quill, handleTextFormat })
  const { toolbarHandlers } = useToolbarHandlers({
    quill,
    handleTextFormat,
    handleListFormat
  })

  useEffect(() => {
    console.log(toolbarHandlers)
    onInit({ toolbarHandlers })
  }, [toolbarHandlers, onInit])

  return (
    <Typography
      as='div'
      variant='body'
      color='dark-grey'
      size='medium'
      className={classes.root}
      data-testid={dataTestId}
      id={id}
      ref={ref}
    />
  )
})

export default QuillEditor
