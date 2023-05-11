import React from 'react'
import { Grid, List, Typography, Section } from '@toptal/picasso'

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={6}>
        <Typography>Default title size</Typography>
        <Section title='Quotes'>
          <List variant='unordered'>
            <List.Item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </List.Item>
            <List.Item>In nec cursus lectus, nec malesuada tellus.</List.Item>
          </List>
        </Section>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Typography>Small title size</Typography>
        <Section title='Quotes' titleSize='small'>
          <List variant='unordered'>
            <List.Item>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </List.Item>
            <List.Item>In nec cursus lectus, nec malesuada tellus.</List.Item>
          </List>
        </Section>
      </Grid.Item>
    </Grid>
  )
}

export default Example
