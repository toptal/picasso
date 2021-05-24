import React from 'react'
import { PageHead, Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <PageHead>
    <PageHead.Main>
      <Stepper steps={['Label', 'Label', 'Label', 'Label', 'Label']} />
    </PageHead.Main>
  </PageHead>
)

export default StepsExample
