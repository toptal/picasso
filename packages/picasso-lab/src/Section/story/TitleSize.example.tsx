import React from 'react'
import { List } from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Section
      variant='bordered'
      title='Quotes'
      titleSize='small'
      subtitle='2 quotes'
      subtitleSize='small'
    >
      <List variant='unordered'>
        <List.Item>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </List.Item>
        <List.Item>In nec cursus lectus, nec malesuada tellus.</List.Item>
      </List>
    </Section>
  )
}

export default Example
