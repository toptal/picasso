import React from 'react'
import {
  AvatarUpload as PicassoAvatarUpload,
  AvatarUploadProps,
  AvatarUploadFileUpload,
} from '@toptal/picasso'
import { FieldInputProps as FinalFieldInputProps } from 'react-final-form'

import { FieldProps } from '../Field'
import FieldLabel from '../FieldLabel'
import InputField from '../InputField'

type Props = AvatarUploadProps & FieldProps<AvatarUploadProps['value']>

type FinalFormOnChangeType = FinalFieldInputProps<
  AvatarUploadProps['value']
>['onChange']

const AvatarUpload = (props: Props) => {
  const {
    label,
    titleCase,
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

  return (
    <InputField<AvatarUploadProps, AvatarUploadFileUpload | undefined>
      {...rest}
      label={
        label ? (
          <FieldLabel
            name={props.name}
            required={props.required}
            label={label}
            titleCase={titleCase}
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

AvatarUpload.defaultProps = {}

AvatarUpload.displayName = 'AvatarUpload'

export default AvatarUpload
