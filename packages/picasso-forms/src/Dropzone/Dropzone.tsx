import React from 'react'
import type { DropzoneProps } from '@toptal/picasso'
import { Dropzone as PicassoDropzone } from '@toptal/picasso'
import type { FileUpload } from '@toptal/picasso/FileInput'
import type { FieldInputProps as FinalFieldInputProps } from 'react-final-form'

import type { FieldProps } from '../Field'
import PicassoField from '../Field'
import FieldLabel from '../FieldLabel'

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
          titleCase={props.titleCase}
          horizontalLayoutAlignedToTop
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

Dropzone.defaultProps = {}

Dropzone.displayName = 'Dropzone'

export default Dropzone
