import React from 'react'
import type { DropzoneProps, FileUpload } from '@toptal/picasso-dropzone'
import { Dropzone as PicassoDropzone } from '@toptal/picasso-dropzone'
import type { FieldInputProps as FinalFieldInputProps } from 'react-final-form'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'

export type Props = DropzoneProps &
  FieldProps<DropzoneProps['value']> & {
    dropzoneHint?: string
  } & FieldLabelProps

type FinalFormOnChangeType = FinalFieldInputProps<
  DropzoneProps['value']
>['onChange']

const Dropzone = ({ dropzoneHint, ...props }: Props) => {
  const handleDrop = ({
    acceptedFiles,
    value = [],
    finalFormOnChange,
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
      uploading: false,
    }))

    finalFormOnChange([...value, ...newFiles])
  }

  const handleRemove = ({
    fileIndex,
    value = [],
    finalFormOnChange,
  }: {
    fileIndex: number
    value?: FileUpload[]
    finalFormOnChange: FinalFormOnChangeType
  }) => {
    const updatedFiles = value.filter((_, index) => index !== fileIndex)

    finalFormOnChange(updatedFiles)
  }

  return (
    <PicassoField<DropzoneProps, FileUpload[] | undefined>
      hideErrors
      {...props}
      label={
        <FieldLabel
          name={props.name}
          required={props.required}
          label={props.label}
          labelEndAdornment={props.labelEndAdornment}
          titleCase={props.titleCase}
          alignment='top'
        />
      }
    >
      {({
        // omit 'highlight' as it is used only for classic inputs
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        highlight,
        ...inputProps
      }) => (
        <PicassoDropzone
          {...inputProps}
          hint={dropzoneHint}
          onDropAccepted={acceptedFiles => {
            handleDrop({
              acceptedFiles,
              value: inputProps.value,
              finalFormOnChange: inputProps.onChange,
            })
          }}
          onRemove={(_fileName: string, index: number) => {
            handleRemove({
              fileIndex: index,
              value: inputProps.value,
              finalFormOnChange: inputProps.onChange,
            })
          }}
        />
      )}
    </PicassoField>
  )
}

Dropzone.displayName = 'Dropzone'

export default Dropzone
