import React, { useState } from 'react'
import { Grid, Container, Button } from '@toptal/picasso'
import { useScreens } from '@toptal/picasso-provider'

const BorderedContainer = () => {
  const screens = useScreens()
  const currentSpacing = screens({
    xs: 'extra-small, 16px spacing',
    sm: 'small, 16px spacing',
    md: 'medium, 24px spacing',
    lg: 'large, 32px spacing',
    xl: 'extra-large, 32px spacing',
  }) as string

  return (
    <Container padded='small' bordered rounded>
      {currentSpacing}
    </Container>
  )
}

const Example = () => {
  const gridItem = (
    <Grid.Item sm={6}>
      <BorderedContainer />
    </Grid.Item>
  )

  const [gridItems, setGridItems] = useState([gridItem, gridItem])

  return (
    <>
      <Container>
        <Grid>{gridItems}</Grid>
      </Container>
      <Container top='small'>
        <Button onClick={() => setGridItems([...gridItems, gridItem])}>
          Add another grid item
        </Button>
      </Container>
    </>
  )
}

export default Example
