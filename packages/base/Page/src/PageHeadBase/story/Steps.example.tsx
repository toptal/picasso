import React from 'react'
import { PageHeadBase, Stepper } from '@toptal/picasso'

const steps = (
  <Stepper
    steps={['Availability', 'Details', 'Feedback', 'Position', 'Skills']}
  />
)

const StepsExample = () => (
  <PageHeadBase title='Heading Large' noBorder actions={steps} />
)

export default StepsExample
