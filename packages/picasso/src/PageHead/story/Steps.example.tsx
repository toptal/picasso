import React from 'react'
import { PageHead, Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <PageHead>
    <PageHead.Main>
      <Stepper
        steps={['Availability', 'Details', 'Feedback', 'Position', 'Skills']}
      />
    </PageHead.Main>
  </PageHead>
)

export default StepsExample
