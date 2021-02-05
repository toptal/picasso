import React from 'react'
import { FileInput as PicassoFileInput, FileInputProps } from '@toptal/picasso'

import FieldWrapper, { FieldProps } from '../FieldWrapper'

export type Props = FileInputProps & FieldProps<FileInputProps['value']>

export const FileInput = (props: Props) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    changeFile: (file: File) => void
  ) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null
    }

    changeFile(event.target.files[0])

    // reset input
    event.target.value = ''
  }

  return (
    <FieldWrapper<FileInputProps> {...props}>
      {(inputProps: FileInputProps) => (
        <PicassoFileInput
          {...inputProps}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(event, inputProps.onChange as (file: unknown) => void)
          }
        />
      )}
    </FieldWrapper>
  )
}

FileInput.defaultProps = {}

FileInput.displayName = 'FileInput'

export default FileInput
