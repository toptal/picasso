import { Amount, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import React from 'react'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using default (en-US) locale
      </Typography>
      <Amount amount={15} />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using French locale
      </Typography>
      <Amount amount={1500} locale='fr-FR' />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using Hungarian locale
      </Typography>
      <Amount amount={150} locale='hu-HU' />
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Using Austrian locale
      </Typography>
      <Amount amount={15} locale='de-AT' />
    </Container>
  </div>
)

export default Example
