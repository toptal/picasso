import React from 'react'
import { Accordion, Typography } from '@toptal/picasso'

const DetailsDogDefinitionPanel = () => (
  <Typography color='green' size='small'>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Typography>
)

const Example = () => {
  return (
    <div style={{ width: '430px' }}>
      <Accordion content={<DetailsDogDefinitionPanel />}>
        <Typography color='blue'> What is a dog?</Typography>
      </Accordion>
    </div>
  )
}

export default Example
