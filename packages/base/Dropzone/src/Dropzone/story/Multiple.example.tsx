import React from 'react'
import { Container, Dropzone } from '@toptal/picasso'

const value = [
  {
    uploading: false,
    progress: 0,
    file: new File(['resume.pdf'], 'resume.pdf'),
  },
  {
    uploading: false,
    progress: 0,
    file: new File(
      ['portfolio.pdf'],
      'lorem_ipsum_dolor_sit_amet_consectetur_adipisicing_elit_laborum_alias_fugiat_explicabo_unde_beatae_eaque_suscipit_ullam_eum_velit_pariatur_praesentium_sapiente_dicta_animi_iure_iste_quam_quae_labore_ullam.pdf'
    ),
  },
]

const Example = () => {
  return (
    <Container style={{ width: '600px' }}>
      <Dropzone
        value={value}
        onDrop={() => alert('onDrop callback triggered')}
        onRemove={() => alert('onRemove callback triggered')}
        hint='Files allowed: 2. Max file size: 25MB'
        accept={{
          'image/*': [],
        }}
        disabled
      />
    </Container>
  )
}

export default Example
