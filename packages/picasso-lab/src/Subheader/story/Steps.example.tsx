import React from 'react'
import { Subheader } from '@toptal/picasso-lab'
import { Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <Subheader>
    <Subheader.Main>
      <Stepper steps={['Label', 'Label', 'Label', 'Label', 'Label']} />
    </Subheader.Main>
  </Subheader>
)

export default StepsExample
