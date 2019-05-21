import React from 'react'
import { TextField } from '@toptal/picasso'

const TextFieldMultilineExample = () => (
  <div>
    <TextField multiline rows={4} />
    <TextField multiline rows={4} placeholder='Placeholder' />
    <TextField multiline disabled rows={4} />
    <TextField multiline disabled rows={4} placeholder='Placeholder' />
    <TextField multiline error rows={4} />
    <TextField multiline error rows={4} placeholder='Placeholder' />
  </div>
)

export default TextFieldMultilineExample
