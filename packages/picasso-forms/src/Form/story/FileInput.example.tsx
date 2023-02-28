import React from 'react'
import { Container } from '@toptal/picasso'
import { FormNonCompound, FileInput, SubmitButton } from '@toptal/picasso-forms'
import { FileUpload } from '@toptal/picasso/FileInput'

type FormType = {
  'fileInput-attachments': FileUpload[]
}

const Example = () => {
  const MAX_SIZE = 2
  const initialAttachments = [
    { file: new File(['image.png'], 'image.png') },
    { file: new File(['resume.pdf'], 'resume.pdf') },
  ]

  const handleSubmit = ({ 'fileInput-attachments': attachments }: FormType) => {
    window.alert(
      `Uploading: ${attachments.map(({ file }) => file.name).join(', ')}`
    )
  }

  return (
    <FormNonCompound<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'fileInput-attachments': initialAttachments,
      }}
    >
      <FileInput
        name='fileInput-attachments'
        hint={`Max file size: ${MAX_SIZE}MB.`}
      />
      <Container top='small'>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
