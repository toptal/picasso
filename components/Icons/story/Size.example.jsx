import React from 'react'

import IconsLibrary from '../IconsLibrary'
import Check from '../Check'
import Icon from '../Icon'
import Spacer from '../../Spacer'

const IconExample = () => (
  <div>
    <Icon name='check' style={{ fontSize: '2em' }} />
    <Spacer inline right={1} />
    <Icon name='check' style={{ width: '2em', height: '2em' }} />
  </div>
)

// somewhere in the code
IconsLibrary.add(Check)

export default IconExample
