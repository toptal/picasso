import React from 'react'

import IconsLibrary from '../IconsLibrary'
import Check from '../Check'
import Icon from '../Icon'

const IconExample = () => (
  <div>
    <Icon name='check' />
  </div>
)

// somewhere in the code
IconsLibrary.add(Check)

export default IconExample
