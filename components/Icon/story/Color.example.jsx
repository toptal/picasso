import React from 'react'
import { Icon, IconsLibrary } from '@toptal/picasso'
import { Cog } from '@toptal/picasso/Icons'

const IconExample = () => (
  <div>
    <Icon name='cog' style={{ color: 'red' }} />
  </div>
)

// somewhere in the code
IconsLibrary.add(Cog)

export default IconExample
