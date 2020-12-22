import React from 'react'
import { PageHead } from '@toptal/picasso-lab'
import { Button, Settings16 } from '@toptal/picasso'

const TitleAndButtonExample = () => (
  <PageHead>
    <PageHead.Main>
      <PageHead.Title>Heading Large</PageHead.Title>
      <PageHead.Actions>
        <Button.Circular variant='flat' icon={<Settings16 />} />
      </PageHead.Actions>
    </PageHead.Main>
  </PageHead>
)

export default TitleAndButtonExample
