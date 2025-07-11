import React from 'react'
import { AvatarUpload as PicassoAvatarUpload } from '@toptal/picasso-avatar-upload'
import type {
  AvatarUploadProps,
  FileUpload as AvatarUploadFileUpload,
} from '@toptal/picasso-avatar-upload'
import type { FieldInputProps as FinalFieldInputProps } from 'react-final-form'

import type { FieldProps } from '../Field'
import type { Props as FieldLabelProps } from '../FieldLabel'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

type Props = AvatarUploadProps &
  FieldProps<AvatarUploadProps['value']> &
  FieldLabelProps

type FinalFormOnChangeType = FinalFieldInputProps<
  AvatarUploadProps['value']
>['onChange']

const AvatarUpload = (props: Props) => {
  const {
    label,
    labelEndAdornment,
    titleCase,
    size = 'small',
    // dropping 'src' value here out from 'rest'. 'src' value should be provided via form context
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    src,
    ...rest
  } = props

  const handleDropAccepted = async ({
    acceptedFile,
    finalFormOnChange,
  }: {
    acceptedFile: File
    finalFormOnChange: FinalFormOnChangeType
  }) => {
    const reader = new FileReader()

    reader.readAsDataURL(acceptedFile)

    reader.onload = () => {
      // setting form value to the new file
      finalFormOnChange({ file: acceptedFile, src: reader.result as string })
    }
  }

  const alignmentTopSizes: AvatarUploadProps['size'][] = [
    'small',
    'medium',
    'large',
  ]
  const alignment = alignmentTopSizes.includes(size) ? 'top' : 'middle'

  return (
    <InputField<AvatarUploadProps, AvatarUploadFileUpload | undefined>
      size={size}
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            labelEndAdornment={labelEndAdornment}
            titleCase={titleCase}
            alignment={alignment}
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
        <PicassoAvatarUpload
          {...inputProps}
          src={inputProps.value?.src}
          onDropAccepted={acceptedFile =>
            handleDropAccepted({
              acceptedFile,
              finalFormOnChange: inputProps.onChange,
            })
          }
        />
      )}
    </InputField>
  )
}

AvatarUpload.displayName = 'AvatarUpload'

export default AvatarUpload
