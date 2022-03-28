import React from 'react'
import { FileInput as PicassoFileInput, FileInputProps } from '@toptal/picasso'
import { FieldInputProps as FinalFieldInputProps } from 'react-final-form'
import { FileUpload } from '@toptal/picasso/FileInput'

import PicassoField, { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'

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
    <PicassoField<FileInputProps, FileUpload[] | undefined>
      {...props}
      label={
        props.label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={props.label}
            titleCase={props.titleCase}
          />
        ) : null
      }
    >
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
    </PicassoField>
  )
}

FileInput.defaultProps = {}

FileInput.displayName = 'FileInput'

export default FileInput
