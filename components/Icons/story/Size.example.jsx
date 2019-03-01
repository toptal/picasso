import React from 'react'
import { Icon, IconsLibrary, Spacer } from '@toptal/picasso'
import { Check } from '@toptal/picasso/Icons'

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
