import React from 'react'
import { Accordion } from '@toptal/picasso'

const AccordionDefaultExample = () => (
  <div style={{ width: '430px' }}>
    <Accordion
      Details={<DetailsDogDefinitionPanel />}
      Summary={<SummaryDogDefinitionPanel />}
    />
  </div>
)

const SummaryDogDefinitionPanel = () => <div>What is a dog?</div>
const DetailsDogDefinitionPanel = () => (
  <div>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </div>
)

export default AccordionDefaultExample
