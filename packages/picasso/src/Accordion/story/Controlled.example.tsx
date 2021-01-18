import React from 'react'
import {
  Accordion,
  Button,
  Container,
  Typography,
  Plus16
} from '@toptal/picasso'

const Example = () => {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <Container style={{ width: '500px' }}>
      <Container bottom={1}>
        <Button onClick={() => setExpanded(!expanded)}>Toggle state</Button>
      </Container>
      <Container flex>
        <Container right='large'>
          <Accordion
            content={<DetailsDogDefinitionPanel />}
            expanded={expanded}
            expandIcon={<Plus16 />}
          >
            <Accordion.Summary>What is a dog?</Accordion.Summary>
          </Accordion>
        </Container>
        <Container>
          <Accordion content={<DetailsDogKindPanel />} expanded={expanded} />
        </Container>
      </Container>
    </Container>
  )
}

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

const DetailsDogKindPanel = () => (
  <Accordion.Details>
    <Container top='xsmall' bottom='xsmall'>
      <Typography size='medium' weight='semibold' color='black'>
        Breeds of dogs
      </Typography>
    </Container>
    There are many breeds of dogs. Each breed varies in size and temperament.
    Owners often select a breed of dog that they find to be compatible with
    their own lifestyle and desires from a companion.
  </Accordion.Details>
)

export default Example
