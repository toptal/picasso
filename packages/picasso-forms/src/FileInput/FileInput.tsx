import React from 'react'
import { FileInput as PicassoFileInput, FileInputProps } from '@toptal/picasso'
import { FieldInputProps as FinalFieldInputProps } from 'react-final-form'
import { FileUpload } from '@toptal/picasso/FileInput'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

type FinalFormOnChangeType = FinalFieldInputProps<
  FileInputProps['value']
>['onChange']

export type Props = FileInputProps & FieldProps<FileInputProps['value']>

export const FileInput = (props: Props) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: FileUpload[] | undefined = [],
    finalFormOnChange: FinalFormOnChangeType
  ) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    const newFiles = Array.from(event.target.files).map(file => ({
      file,
      uploading: false
    }))

    finalFormOnChange([...value, ...newFiles])

    // reset input
    event.target.value = ''
  }

  const handleRemove = (
    fileIndex: number,
    value: FileUpload[] | undefined = [],
    finalFormOnChange: FinalFormOnChangeType
  ) => {
    const updatedFiles = value.filter((_, index) => index !== fileIndex)

    finalFormOnChange(updatedFiles)
  }

  return (
    <FieldWrapper<FileInputProps, FileUpload[] | undefined> {...props}>
      {inputProps => (
        <PicassoFileInput
          {...inputProps}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event, inputProps.value, inputProps.onChange)
          }}
          onRemove={(fileName: string, index: number) => {
            handleRemove(index, inputProps.value, inputProps.onChange)
          }}
        />
      )}
    </FieldWrapper>
  )
}

FileInput.defaultProps = {}

FileInput.displayName = 'FileInput'

export default FileInput
