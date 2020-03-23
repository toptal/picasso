import React from 'react'
import { Accordion } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: '430px' }}>
      <Accordion content={<DetailsDogDefinitionPanel />}>
        <Accordion.Summary> What is a dog?</Accordion.Summary>
      </Accordion>
    </div>
  )
}

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

export default Example
