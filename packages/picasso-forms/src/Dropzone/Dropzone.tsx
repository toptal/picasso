import React from 'react'
import { Dropzone as PicassoDropzone, DropzoneProps } from '@toptal/picasso-lab'
import { FileUpload } from '@toptal/picasso/FileInput'
import { FieldInputProps as FinalFieldInputProps } from 'react-final-form'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = DropzoneProps &
  FieldProps<DropzoneProps['value']> & {
    dropzoneHint?: string
  }

type FinalFormOnChangeType = FinalFieldInputProps<
  DropzoneProps['value']
>['onChange']

const Dropzone = ({ dropzoneHint, ...props }: Props) => {
  const handleDrop = ({
    acceptedFiles,
    value = [],
    finalFormOnChange
  }: {
    acceptedFiles: File[]
    value?: FileUpload[]
    finalFormOnChange: FinalFormOnChangeType
  }) => {
    if (!acceptedFiles.length) {
      return
    }

    const newFiles = Array.from(acceptedFiles).map(file => ({
      file,
      uploading: false
    }))

    finalFormOnChange([...value, ...newFiles])
  }

  const handleRemove = ({
    fileIndex,
    value = [],
    finalFormOnChange
  }: {
    fileIndex: number
    value?: FileUpload[]
    finalFormOnChange: FinalFormOnChangeType
  }) => {
    const updatedFiles = value.filter((_, index) => index !== fileIndex)

    finalFormOnChange(updatedFiles)
  }

  return (
    <FieldWrapper<DropzoneProps, FileUpload[] | undefined>
      hideErrors
      {...props}
    >
      {inputProps => (
        <PicassoDropzone
          {...inputProps}
          hint={dropzoneHint}
          onDropAccepted={acceptedFiles => {
            handleDrop({
              acceptedFiles,
              value: inputProps.value,
              finalFormOnChange: inputProps.onChange
            })
          }}
          onRemove={(_fileName: string, index: number) => {
            handleRemove({
              fileIndex: index,
              value: inputProps.value,
              finalFormOnChange: inputProps.onChange
            })
          }}
        />
      )}
    </FieldWrapper>
  )
}

Dropzone.defaultProps = {}

Dropzone.displayName = 'Dropzone'

export default Dropzone
