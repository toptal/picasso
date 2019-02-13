import React from 'react'

import IconsLibrary from '../IconsLibrary'
import Check from '../Check'
import Icon from '../Icon'

const IconExample = () => (
  <div>
    <Icon name='check' style={{ color: 'red' }} />
  </div>
)

// somewhere in the code
IconsLibrary.add(Check)

export default IconExample
