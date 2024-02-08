import { Check24 } from '@toptal/picasso';
import { Container } from '@toptal/picasso';
import { Button } from '@toptal/picasso';
import { Button as Butt } from '@toptal/picasso';
import { Transitions } from '@toptal/picasso/utils';


import React from 'react'

const Example = () => {
  console.log(Transitions)
  return (
    <Container>
      <Check24 />
      <Button />
      <Butt />
    </Container>
  )
}
