import React from 'react'
import { Accordion, Container, Grid, Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <Grid>
      <Grid.Item small={4}>
        <Container bottom='medium'>
          <Typography variant='heading'>All Borders</Typography>
        </Container>

        <Accordion
          defaultExpanded
          borders='all'
          content={<DetailsDogDefinitionPanel />}
        >
          <Accordion.Summary>What is a dog?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogKindPanel />} borders='all'>
          <Accordion.Summary>What kinds of dogs are there?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogAcquirePanel />} borders='all'>
          <Accordion.Summary>How do you acquire a dog?</Accordion.Summary>
        </Accordion>
      </Grid.Item>

      <Grid.Item small={4}>
        <Container bottom='medium'>
          <Typography variant='heading'>Middle Borders</Typography>
        </Container>

        <Accordion content={<DetailsDogDefinitionPanel />} borders='middle'>
          <Accordion.Summary>What is a dog?</Accordion.Summary>
        </Accordion>
        <Accordion
          defaultExpanded
          content={<DetailsDogKindPanel />}
          borders='middle'
        >
          <Accordion.Summary>What kinds of dogs are there?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogAcquirePanel />} borders='middle'>
          <Accordion.Summary>How do you acquire a dog?</Accordion.Summary>
        </Accordion>
      </Grid.Item>
      <Grid.Item small={4}>
        <Container bottom='medium'>
          <Typography variant='heading'>No Borders</Typography>
        </Container>

        <Accordion content={<DetailsDogDefinitionPanel />} borders='none'>
          <Accordion.Summary>What is a dog?</Accordion.Summary>
        </Accordion>
        <Accordion content={<DetailsDogKindPanel />} borders='none'>
          <Accordion.Summary>What kinds of dogs are there?</Accordion.Summary>
        </Accordion>
        <Accordion
          defaultExpanded
          content={<DetailsDogAcquirePanel />}
          borders='none'
        >
          <Accordion.Summary>How do you acquire a dog?</Accordion.Summary>
        </Accordion>
      </Grid.Item>
    </Grid>
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
    There are many breeds of dogs. Each breed varies in size and temperament.
    Owners often select a breed of dog that they find to be compatible with
    their own lifestyle and desires from a companion.
  </Accordion.Details>
)

const DetailsDogAcquirePanel = () => (
  <Accordion.Details>
    Three common ways for a prospective owner to acquire a dog is from pet
    shops, private owners, or shelters. A pet shop may be the most convenient
    way to buy a dog. Buying a dog from a private owner allows you to assess the
    pedigree and upbringing of your dog before choosing to take it home. Lastly,
    finding your dog from a shelter, helps give a good home to a dog who may not
    find one so readily.
  </Accordion.Details>
)

export default Example
