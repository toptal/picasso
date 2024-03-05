import React from 'react'
import type { FileInputProps, FileUpload } from '@toptal/picasso'
import { FileInput as PicassoFileInput } from '@toptal/picasso'
import type { FieldInputProps as FinalFieldInputProps } from 'react-final-form'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import FieldLabel from '../FieldLabel'
import type { Props as FieldLabelProps } from '../FieldLabel'

type FinalFormOnChangeType = FinalFieldInputProps<
  FileInputProps['value']
>['onChange']

export type Props = FileInputProps &
  FieldProps<FileInputProps['value']> &
  FieldLabelProps

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
      uploading: false,
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
            labelEndAdornment={props.labelEndAdornment}
            titleCase={props.titleCase}
          />
        ) : null
      }
    >
      {({
        // omit 'highlight' as it is used only for classic inputs
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        highlight,
        ...inputProps
      }) => (
        <PicassoFileInput
          {...inputProps}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event, inputProps.value, inputProps.onChange)
          }}
          onRemove={(_: string, index: number) => {
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
