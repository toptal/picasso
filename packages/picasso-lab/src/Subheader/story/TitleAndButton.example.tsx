import React from 'react'
import { Subheader } from '@toptal/picasso-lab'
import { Button } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <Subheader>
    <Subheader.Main>
      <Subheader.Title>Heading Large</Subheader.Title>
      <Subheader.Actions>
        <Button variant='secondary' size='small'>
          Button
        </Button>
      </Subheader.Actions>
    </Subheader.Main>
  </Subheader>
)

export default TitleAndButtonExample
