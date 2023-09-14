import React from 'react'
import { Typography } from '@toptal/picasso'

const ValueEditorErrorMessage = ({ error }: { error: string }) => (
  <Typography variant='body' color='red' size='xxsmall'>
    {error}
  </Typography>
)

export default ValueEditorErrorMessage
