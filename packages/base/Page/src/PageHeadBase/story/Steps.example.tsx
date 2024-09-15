import React from 'react'
import { PageHeadBase, Stepper } from '@toptal/picasso'

const StepsExample = () => (
  <div className='flex gap-12 border-0 border-b border-solid border-gray-200'>
    <PageHeadBase title='Heading Large' noBorder />

    <Stepper
      steps={['Availability', 'Details', 'Feedback', 'Position', 'Skills']}
    />
  </div>
)

export default StepsExample
