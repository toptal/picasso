import React from 'react'
import { Title } from '@toptal/picasso-lab'
import { Button } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <Title>
    <Title.Main>
      <Title.Title>Heading Large</Title.Title>
      <Title.Actions>
        <Button variant='secondary-blue' size='small'>
          Button
        </Button>
      </Title.Actions>
    </Title.Main>
  </Title>
)

export default TitleAndButtonExample
