import React from 'react'
import { Accordion, Button, Container } from '@toptal/picasso'

const Example = () => {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <div style={{ width: '430px' }}>
      <Container bottom={1}>
        <Button onClick={() => setExpanded(!expanded)}>Toggle state</Button>
      </Container>
      <Accordion content={<DetailsDogDefinitionPanel />} expanded={expanded}>
        <Accordion.Summary>What is a dog?</Accordion.Summary>
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
