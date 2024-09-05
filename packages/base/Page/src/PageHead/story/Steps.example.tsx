import React from 'react'
import { PageHead, Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <PageHead
    controls={
      <Stepper
        steps={['Availability', 'Details', 'Feedback', 'Position', 'Skills']}
      />
    }
  />
)

export default StepsExample
