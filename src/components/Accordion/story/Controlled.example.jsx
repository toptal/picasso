import React from 'react'
import { Accordion, Button, Container } from '@toptal/picasso'

const AccordionControlledExample = () => {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <div style={{ width: '430px' }}>
      <Container bottom={1}>
        <Button onClick={() => setExpanded(!expanded)}>Toggle state</Button>
      </Container>
      <Accordion content={<DetailsDogDefinitionPanel />} expanded={expanded}>
        <div>What is a dog?</div>
      </Accordion>
    </div>
  )
}

const DetailsDogDefinitionPanel = () => (
  <div>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </div>
)

export default AccordionControlledExample
