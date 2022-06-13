import React from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { FileUpload } from '@toptal/picasso/FileInput'

const FILE_INPUT_FIELD = 'fileInput-attachments'

type FormType = {
  [FILE_INPUT_FIELD]: FileUpload[]
}

const Example = () => {
  const MAX_SIZE = 2
  const initialAttachments = [
    { file: new File(['image.png'], 'image.png') },
    { file: new File(['resume.pdf'], 'resume.pdf') },
  ]

  const handleSubmit = ({ [FILE_INPUT_FIELD]: attachments }: FormType) => {
    window.alert(
      `Uploading: ${attachments.map(({ file }) => file.name).join(', ')}`
    )
  }

  return (
    <Form<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        [FILE_INPUT_FIELD]: initialAttachments,
      }}
    >
      <Form.FileInput
        name={FILE_INPUT_FIELD}
        hint={`Max file size: ${MAX_SIZE}MB.`}
      />
      <Container top='small'>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default Example
