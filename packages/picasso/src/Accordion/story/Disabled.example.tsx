import React from 'react'
import { Accordion, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={6}>
      <Accordion disabled content={<DetailsDogDefinitionPanel />}>
        <Accordion.Summary>What is a dog?</Accordion.Summary>
      </Accordion>
    </Grid.Item>
    <Grid.Item small={6}>
      <Accordion
        disabled
        defaultExpanded
        content={<DetailsDogDefinitionPanel />}
      >
        <Accordion.Summary>What is a dog?</Accordion.Summary>
      </Accordion>
    </Grid.Item>
  </Grid>
)

const DetailsDogDefinitionPanel = () => (
  <Accordion.Details>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </Accordion.Details>
)

export default Example
