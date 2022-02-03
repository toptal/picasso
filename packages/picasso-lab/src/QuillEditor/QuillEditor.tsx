import React, { forwardRef, useEffect } from 'react'
import { Typography } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'
import useFocus from './hooks/useFocus'
import useSubscribeToQuillEvents from './hooks/useSubscribeToQuillEvents'
import useDisabledEditor from './hooks/useDisabledEditor'
import useKeyBindings from './hooks/useKeyBindings'
import useToolbarHandlers from './hooks/useToolbarHandlers'
import {
  TextFormatHandler,
  FocusHandler,
  ChangeHandler,
  SelectionHandler,
  InitHandler
} from './types'

export type Props = BaseProps & {
  disabled?: boolean
  handleFocusChange?: FocusHandler
  handleSelectionChange: SelectionHandler
  handleTextFormat: TextFormatHandler
  handleTextChange: ChangeHandler
  id: string
  onInit: InitHandler
  placeholder?: string
  isFocused: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    disabled,
    id,
    'data-testid': dataTestId,
    placeholder,
    handleTextChange,
    handleTextFormat,
    handleSelectionChange,
    onInit,
    isFocused
  },
  ref
) {
  const classes = useStyles()
  const quill = useQuillInstance({ id, placeholder })

  useSubscribeToQuillEvents({
    quill,
    handleTextChange,
    handleSelectionChange
  })

  useFocus({ isFocused, quill })
  useDisabledEditor({ disabled, quill })
  useKeyBindings({ quill, handleTextFormat })
  const { toolbarHandlers } = useToolbarHandlers({
    quill,
    handleTextFormat
  })

  useEffect(() => {
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
