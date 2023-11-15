import type { FocusEventHandler } from 'react'
import React, { forwardRef, useRef } from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'

import FileList from '../FileList'
import Container from '../Container'
import { SPACING_2, useCombinedRefs } from '../utils'
import Button from '../Button'
import FormHint from '../FormHint'
import type { FileUpload } from './types'
import styles from './styles'

export interface Props extends BaseProps {
  /** A string that defines the file types the file input should accept */
  accept?: string
  /** If true, the 'FileInput' will be disabled */
  disabled?: boolean
  /** The text of the select file button */
  buttonLabel?: string
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
  /** Focus event handler */
  onFocus?: FocusEventHandler<HTMLDivElement>
  /** Blur event handler */
  onBlur?: FocusEventHandler<HTMLDivElement>
}

const useStyles = makeStyles<Theme>(styles, { name: 'FileInputContent' })

export const FileInput = forwardRef<HTMLInputElement, Props>(function FileInput(
  props,
  ref
) {
  const {
    accept,
    disabled,
    value,
    buttonLabel,
    hint,
    maxFiles = 1,
    onChange,
    onRemove,
    onFocus,
    onBlur,
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
    <Container onFocus={onFocus} onBlur={onBlur} className={classes.root}>
      <Button
        size='small'
        variant='secondary'
        disabled={Boolean(disabled || preventAddingNewFiles)}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        {buttonLabel}
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
        <Container top={SPACING_2}>
          <FileList files={value} disabled={disabled} onItemRemove={onRemove} />
        </Container>
      )}
    </Container>
  )
})

FileInput.defaultProps = {
  maxFiles: 1,
  buttonLabel: 'Choose File',
}

FileInput.displayName = 'FileInput'

export default FileInput
