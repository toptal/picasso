import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, FileInput, SubmitButton } from '@toptal/picasso-forms'
import type { FileUpload } from '@toptal/picasso/FileInput'

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
      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
