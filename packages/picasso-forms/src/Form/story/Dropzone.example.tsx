import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { FormNonCompound, Dropzone, SubmitButton } from '@toptal/picasso-forms'
import type { FileUpload } from '@toptal/picasso/FileInput'

type FormType = {
  'dropzone-attachments': FileUpload[]
}

const Example = () => {
  const MAX_SIZE = 2
  const initialAttachments = [{ file: new File(['resume.pdf'], 'resume.pdf') }]

  const handleSubmit = ({ 'dropzone-attachments': attachments }: FormType) => {
    window.alert(
      `Uploading: ${attachments.map(({ file }) => file.name).join(', ')}`
    )
  }

  return (
    <FormNonCompound<FormType>
      autoComplete='off'
      onSubmit={handleSubmit}
      initialValues={{
        'dropzone-attachments': initialAttachments,
      }}
    >
      <Dropzone
        required
        name='dropzone-attachments'
        dropzoneHint={`Max file size: ${MAX_SIZE}MB.`}
        hint='These documents will be used to analyze and identify your potential.'
      />
      <Container top={SPACING_4}>
        <SubmitButton>Submit</SubmitButton>
      </Container>
    </FormNonCompound>
  )
}

export default Example
