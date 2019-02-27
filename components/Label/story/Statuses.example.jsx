import React from 'react'
import { Label, Spacer } from '@toptal/picasso'

const LabelDefaultExample = () => (
  <div>
    <Label label="Yay! It's done!" variant='success' />
    <Spacer inline right={1} />
    <Label label='Nope! Please, try one more time' variant='error' />
  </div>
)

export default LabelDefaultExample
