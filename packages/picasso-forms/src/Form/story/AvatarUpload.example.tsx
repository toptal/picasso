import React, { useState } from 'react'
import {
  AvatarUploadFileUpload,
  AvatarUploadFileRejection,
  Container,
} from '@toptal/picasso'
import { Form, useForm } from '@toptal/picasso-forms'

type FormType = {
  avatarUpload: AvatarUploadFileUpload
}

const FormRenderer = () => {
  const { change } = useForm()
  const [uploading, setUploading] = useState<boolean>(false)

  const handleDrop = (
    acceptedFile: File | null,
    fileRejection: AvatarUploadFileRejection | null
  ) => {
    if (acceptedFile) {
      // simulate upload with external upload service
      const reader = new FileReader()

      reader.readAsDataURL(acceptedFile)

      reader.onload = () => {
        setUploading(true)

        setTimeout(() => {
          setUploading(false)

          // set result of upload to form
          change('avatarUpload', { src: reader.result as string })
        }, 1000)
      }

      reader.onerror = error => {
        console.log('Error: upload failed, ', error)
      }
    } else if (fileRejection) {
      // file rejected
      console.log(fileRejection.errors.join(', '))
    }
  }

  return (
    <>
      <Form.AvatarUpload
        required
        name='avatarUpload'
        onDrop={handleDrop}
        uploading={uploading}
      />

      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </>
  )
}

const Example = () => {
  const handleSubmit = ({ avatarUpload }: FormType) => {
    window.alert(`src: ${avatarUpload.src}`)
  }

  return (
    <Form<FormType> autoComplete='off' onSubmit={handleSubmit}>
      <FormRenderer />
    </Form>
  )
}

export default Example
