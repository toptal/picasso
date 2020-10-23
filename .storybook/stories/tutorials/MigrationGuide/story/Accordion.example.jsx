import React from 'react'
import { Accordion, Container, Typography, Table } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: '430px' }}>
      <Typography variant='heading'>API changes</Typography>
      <Container top='small' bottom='small'>
        <Table bordered>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Component</Table.Cell>
              <Table.Cell>Prop</Table.Cell>
              <Table.Cell>Change description</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Accordion.Group</Table.Cell>
              <Table.Cell>bordered</Table.Cell>
              <Table.Cell>New addition</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>

      <Typography variant='heading'>Visual changes</Typography>
      <Container top='small'>
        <Accordion content={<DetailsDogDefinitionPanel />}>
          <Accordion.Summary> What is a dog?</Accordion.Summary>
        </Accordion>
      </Container>
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
