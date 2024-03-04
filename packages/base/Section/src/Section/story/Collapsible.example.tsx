import React from 'react'
import {
  Table,
  Button,
  Grid,
  Typography,
  Section,
  Container,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const content = (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Talent type</Table.Cell>
          <Table.Cell>Company</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.talentType}</Table.Cell>
            <Table.Cell>{row.company}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
            <Table.Cell>{row.country}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )

  return (
    <Grid>
      <Grid.Item sm={6}>
        <Typography>Collapsible section is collapsed by default.</Typography>
        <Section
          title='Talents'
          subtitle={`${data.length} people`}
          actions={
            <Button size='small' variant='secondary'>
              More
            </Button>
          }
          collapsible
        >
          {content}
        </Section>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Typography>
          You can modify this behavior with `defaultCollapsed` property.
        </Typography>
        <Section
          title='Talents'
          subtitle={`${data.length} people`}
          actions={
            <Button size='small' variant='secondary'>
              More
            </Button>
          }
          collapsible
          defaultCollapsed={false}
        >
          {content}
        </Section>
      </Grid.Item>

      <Grid.Item sm={6}>
        <Typography>Collapsible section with header bar.</Typography>
        <Container top={SPACING_4}>
          <Section title='Details' collapsible variant='withHeaderBar'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
            dolore, et ipsum eligendi sunt maiores aliquam blanditiis labore
            praesentium magnam necessitatibus. Quisquam ipsum, doloremque sit
            laudantium beatae nihil similique. Laborum eum itaque recusandae ut
            eaque vero et atque dolor nostrum nobis maxime, nihil nisi non
            perferendis amet voluptatibus odio laudantium!
          </Section>
        </Container>
      </Grid.Item>

      <Grid.Item sm={6}>
        <Typography>Collapsible bordered section.</Typography>
        <Container top={SPACING_4}>
          <Section title='Details' collapsible variant='bordered'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
            dolore, et ipsum eligendi sunt maiores aliquam blanditiis labore
            praesentium magnam necessitatibus. Quisquam ipsum, doloremque sit
            laudantium beatae nihil similique. Laborum eum itaque recusandae ut
            eaque vero et atque dolor nostrum nobis maxime, nihil nisi non
            perferendis amet voluptatibus odio laudantium!
          </Section>
        </Container>
      </Grid.Item>
    </Grid>
  )
}

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States',
  },
]

export default Example
