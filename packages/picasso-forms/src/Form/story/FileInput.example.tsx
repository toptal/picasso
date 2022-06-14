import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
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
    <Form<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'fileInput-attachments': initialAttachments,
      }}
    >
      <Form.FileInput
        name='fileInput-attachments'
        hint={`Max file size: ${MAX_SIZE}MB.`}
      />
      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
