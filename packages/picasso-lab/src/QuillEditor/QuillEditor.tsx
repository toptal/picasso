import React, { forwardRef } from 'react'
import { Typography } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'
import useFocus from './hooks/useFocus'
import useSubscribeToQuillEvents from './hooks/useSubscribeToQuillEvents'
import useDisabledEditor from './hooks/useDisabledEditor'
import useKeyBindings from './hooks/useKeyBindings'
import useFormat from './hooks/useFormat'
import {
  TextFormatHandler,
  ChangeHandler,
  SelectionHandler,
  FormatType
} from './types'

export type Props = BaseProps & {
  disabled?: boolean
  handleSelectionChange: SelectionHandler
  handleTextFormat: TextFormatHandler
  handleTextChange: ChangeHandler
  id: string
  format: FormatType
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
    format,
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
  useFormat({ quill, format })

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
