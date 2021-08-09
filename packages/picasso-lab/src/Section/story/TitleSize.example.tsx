import React from 'react'
import { Grid, List, Typography } from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Grid>
      <Grid.Item small={6}>
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
      <Grid.Item small={6}>
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
