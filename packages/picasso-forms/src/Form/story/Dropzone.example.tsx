import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { FileUpload } from '@toptal/picasso/FileInput'

type FormType = {
  attachments: FileUpload[]
}

const Example = () => {
  const MAX_SIZE = 2
  const initialAttachments = [{ file: new File(['resume.pdf'], 'resume.pdf') }]

  const handleSubmit = ({ attachments }: FormType) => {
    window.alert(
      `Uploading: ${attachments.map(({ file }) => file.name).join(', ')}`
    )
  }

  return (
    <Form<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        attachments: initialAttachments,
      }}
    >
      <Form.Dropzone
        required
        name='dropzone.attachments'
        dropzoneHint={`Max file size: ${MAX_SIZE}MB.`}
        hint='These documents will be used to analyze and identify your potential.'
      />
      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
