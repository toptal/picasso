import React from 'react'
import { FileInput as PicassoFileInput } from '@toptal/picasso'
import { Props as FileInputProps } from '@toptal/picasso/FileInput'

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
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FieldWrapper<FileInputProps> {...props}>
      {(inputProps: FileInputProps) => (
        <PicassoFileInput
          // eslint-disable-next-line react/jsx-props-no-spreading
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
