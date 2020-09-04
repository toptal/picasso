import React from 'react'
import { Title } from '@toptal/picasso-lab'
import { Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <Title>
    <Title.Main>
      <Stepper steps={['Label', 'Label', 'Label', 'Label', 'Label']} />
    </Title.Main>
  </Title>
)

export default StepsExample
