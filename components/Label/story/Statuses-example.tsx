import React from 'react'

import Label from '../Label'
import Spacer from '../../Spacer'

const LabelDefaultExample = () => (
  <div>
    <Label label="Yay! It's done!" variant='success' />
    <Spacer right={1} type='inline' />
    <Label label='Nope! Please, try one more time' variant='error' />
  </div>
)

export default LabelDefaultExample
