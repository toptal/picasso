import React, { forwardRef } from 'react'
import { Typography } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'
import useAutofocus from './hooks/useAutofocus'
import useSubscribeToQuillEvents from './hooks/useSubscribeToQuillEvents'
import useDisabledEditor from './hooks/useDisabledEditor'
import useEditorLoseFocusFix from './hooks/useEditorLoseFocusFix'

export type Props = BaseProps & {
  autofocus?: boolean
  id: string
  placeholder?: string
  handleFocusChange?: (isFocused: boolean) => void
  handleTextChange: (html: string) => void
  handleFormatChange: () => void
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

// const handleQuillTextChange = (delta, oldDelta, source) => {
//   if (source == 'api') {
//     console.log("An API call triggered this change.");
//   } else if (source == 'user') {
//     console.log("A user action triggered this change.");
//   }
// }

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    autofocus,
    disabled,
    id,
    className,
    style,
    'data-testid': dataTestId,
    placeholder,
    handleFocusChange,
    handleTextChange
    // handleFormatChange
  },
  ref
) {
  const classes = useStyles()
  const quill = useQuillInstance({ id, placeholder })

  useSubscribeToQuillEvents({ quill, handleFocusChange, handleTextChange })

  useAutofocus({ autofocus, quill })
  useDisabledEditor({ disabled, quill })

  // common issue of custom toolbar
  // https://github.com/quilljs/quill/issues/1290
  // when clicking anywhere quill loses focus, we need
  // to prevent it when clicking inside toolbar
  useEditorLoseFocusFix({ quill, id })

  return (
    <Typography
      as='div'
      variant='body'
      color='dark-grey'
      size='medium'
      className={cx(classes.root, className)}
      data-testid={dataTestId}
      id={id}
      ref={ref}
      style={style}
    />
  )
})

export default QuillEditor
