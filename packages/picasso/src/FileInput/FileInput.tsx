import React, { forwardRef, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import FileList from '../FileList'
import Container from '../Container'
import Button from '../Button'
import FormHint from '../FormHint'
import { useCombinedRefs } from '../utils'
import { FileUpload } from './types'
import styles from './styles'

export interface Props extends BaseProps {
  /** A string that defines the file types the file input should accept */
  accept?: string
  /** If true, the 'FileInput' will be disabled */
  disabled?: boolean
  /** The text of the hint */
  hint?: string
  /** Maximum number of files allowed. When the value is null, unlimited files can be added and multiple files can be selected on the file selection dialog */
  maxFiles?: number | null
  /** Value uses the File interface. */
  value?: FileUpload[]
  /** Callback invoked when `FileInput` changes its state by selecting new files */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Callback invoked when a file item is removed */
  onRemove?: (fileName: string, index: number) => void
}

const useStyles = makeStyles<Theme>(styles, { name: 'FileInputContent' })

export const FileInput = forwardRef<HTMLInputElement, Props>(
  function FileInput(props, ref) {
    const {
      accept,
      disabled,
      value,
      hint,
      maxFiles = 1,
      onChange,
      onRemove
    } = props

    const classes = useStyles()
    const isUnlimitedFiles = maxFiles === null
    const preventAddingNewFiles =
      !isUnlimitedFiles && value && value.length === maxFiles

    // if `ref` is null then we need a ref to control the input
    // so we create another ref manually if needed and merge both of them
    const inputRef = useCombinedRefs<HTMLInputElement>(
      ref,
      useRef<HTMLInputElement>(null)
    )

    return (
      <Container className={classes.root}>
        <Button
          size='small'
          variant='secondary'
          disabled={disabled || preventAddingNewFiles}
          onClick={() => inputRef.current && inputRef.current.click()}
        >
          Choose File
        </Button>

        <input
          type='file'
          className={classes.nativeInput}
          ref={inputRef}
          accept={accept}
          onChange={onChange}
          multiple={isUnlimitedFiles}
        />
        {hint && <FormHint className={classes.hint}>{hint}</FormHint>}
        {value && value.length > 0 && (
          <Container top='xsmall'>
            <FileList
              files={value}
              disabled={disabled}
              onItemRemove={onRemove}
            />
          </Container>
        )}
      </Container>
    )
  }
)

FileInput.defaultProps = {
  maxFiles: 1
}

FileInput.displayName = 'FileInput'

export default FileInput
