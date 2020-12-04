import React from 'react'
import { Subheader } from '@toptal/picasso-lab'
import { Button, Settings16 } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <Subheader>
    <Subheader.Main>
      <Subheader.Title>Heading Large</Subheader.Title>
      <Subheader.Actions>
        <Button.Circular variant='flat' icon={<Settings16 />} />
      </Subheader.Actions>
    </Subheader.Main>
  </Subheader>
)

export default TitleAndButtonExample
