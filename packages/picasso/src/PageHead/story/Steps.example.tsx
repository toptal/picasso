import React from 'react'
import { PageHead, Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <PageHead>
    <PageHead.Main>
      <Stepper
        steps={['Label-1', 'Label-2', 'Label-3', 'Label-4', 'Label-5']}
      />
    </PageHead.Main>
  </PageHead>
)

export default StepsExample
