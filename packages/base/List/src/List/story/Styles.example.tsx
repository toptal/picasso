import React from 'react'
import { Container, List, Typography } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'
import type { ListItemType } from '@toptal/picasso/List'

const ListStyleExample = ({ type }: { type: ListItemType }) => (
  <Container bottom={SPACING_8}>
    <Typography variant='heading' size='medium'>
      Style Type: {type}
    </Typography>

    <List styleType={type}>
      <List.Item>Elit sunt quaerat ratione nobis</List.Item>
      <List.Item>
        Lorem totam porro deserunt laborum illo natus Voluptas vitae odit quis
        at cupiditate. Id velit unde labore provident ratione. Voluptate.
        <List styleType={type}>
          <List.Item>Sit ipsum fuga aliquam harum veniam. Culpa</List.Item>
          <List.Item>Amet eos illo excepturi natus</List.Item>
        </List>
      </List.Item>
    </List>
  </Container>
)

const StylesExample = () => {
  return (
    <Container>
      <ListStyleExample type='circle' />
      <ListStyleExample type='disc' />
      <ListStyleExample type='checkmark' />
      <ListStyleExample type='arrow' />
      <ListStyleExample type='numeral' />
      <ListStyleExample type='alpha' />
      <ListStyleExample type='roman' />
    </Container>
  )
}

export default StylesExample
