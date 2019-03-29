import React from 'react'
import { Accordion, Button, Container } from '@toptal/picasso'

const AccordionControlledExample = () => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div>
      <Button onClick={() => setExpanded(!expanded)}>Expand/Collapse</Button>

      <div>
        <Accordion
          content={<DetailsDogDefinitionPanel />}
          expanded={expanded}
        />
      </div>
    </div>
  )
}

const DetailsDogDefinitionPanel = () => (
  <Container bottom={2} top={2}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Container>
)

export default AccordionControlledExample
