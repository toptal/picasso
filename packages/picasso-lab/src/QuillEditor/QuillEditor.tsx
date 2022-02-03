import React, { forwardRef } from 'react'
import { Typography } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'
import {
  useFocus,
  useSubscribeToQuillEvents,
  useDisabledEditor,
  useKeyBindings,
  useFormat
} from './hooks'
import {
  TextFormatHandler,
  ChangeHandler,
  SelectionHandler,
  FormatType
} from './types'

export type Props = BaseProps & {
  disabled?: boolean
  id: string
  isFocused: boolean
  format: FormatType
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
    disabled,
    'data-testid': dataTestId,
    id,
    isFocused,
    format,
    placeholder,
    onSelectionChange,
    onTextFormat,
    onTextChange
  },
  ref
) {
  const classes = useStyles()
  const quill = useQuillInstance({ id, placeholder })

  useSubscribeToQuillEvents({
    quill,
    onTextChange,
    onSelectionChange
  })

  useFocus({ isFocused, quill })
  useDisabledEditor({ disabled, quill })
  useKeyBindings({ quill, onTextFormat })
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
