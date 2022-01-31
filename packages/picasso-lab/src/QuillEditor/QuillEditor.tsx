import React, { forwardRef, useEffect, useMemo, useCallback } from 'react'
import { Typography } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Quill from 'quill'

import useQuillInstance from './hooks/useQuillInstance'
import styles from './styles'

export type Props = BaseProps & {
  id: string
  placeholder?: string
  handleFocusChange: (isFocused: boolean) => void
  handleTextChange: () => void
  handleFormatChange: () => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'QuillEditor'
})

const handleQuillSelectionChange = (quill: Quill, handleFocusChange: (isFocused: boolean) => void) =>
  // TODO:
  (range: any, oldRange: any, source: any) => {
    console.log('happened')
    if (range) {
      handleFocusChange(true)
      // if (range.length == 0) {
      //   console.log('User cursor is on', range.index)
      // } else {
      //   var text = quill.getText(range.index, range.length)
      //   console.log('User has highlighted', text)
      // }
    } else {
      handleFocusChange(false)
    }
  }

// const handleQuillTextChange = (delta, oldDelta, source) => {
//   if (source == 'api') {
//     console.log("An API call triggered this change.");
//   } else if (source == 'user') {
//     console.log("A user action triggered this change.");
//   }
// }

const QuillEditor = forwardRef<HTMLDivElement, Props>(function QuillEditor(
  {
    id,
    className,
    style,
    'data-testid': dataTestId,
    placeholder,
    handleFocusChange,
    handleTextChange,
    handleFormatChange
  },
  ref
) {
  const classes = useStyles()
  const quill = useQuillInstance({ id, placeholder })

  const handleSelectionChange = useMemo(() => {
      if (!quill) {
        return () => {}
      }

      console.log('quill selection change')
      return handleQuillSelectionChange(quill, handleFocusChange)
    },
    [quill, handleFocusChange]
  )

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', handleSelectionChange)
    // quill.on('text-change', handleTextChange)
    // quill.on('selection-change', handleSelectionChange)

    return () => {
      quill.off('selection-change', handleSelectionChange)
      // quill.off('text-change', handleTextChange)
      // quill.off('selection-change', handleSelectionChange)
    }
  }, [quill, handleSelectionChange])

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
