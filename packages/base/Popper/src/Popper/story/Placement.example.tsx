import React, { useState } from 'react'
import { Button, Container, Grid, Typography, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end'

const PlacementDemo = ({ placement }: { placement: Placement }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <>
      <Button fullWidth ref={setAnchorEl}>
        {placement}
      </Button>
      {anchorEl && (
        <Popper
          open
          anchorEl={anchorEl}
          placement={placement}
          autoWidth={false}
        >
          <Container
            top={SPACING_4}
            bottom={SPACING_4}
            left={SPACING_4}
            right={SPACING_4}
            className='bg-white border border-gray-400 rounded-sm p-2'
          >
            <Typography size='small'>Content</Typography>
          </Container>
        </Popper>
      )}
    </>
  )
}

const Example = () => (
  <Container style={{ padding: 100, width: 600 }}>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='top-start' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='top' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='top-end' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='left-start' />
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <PlacementDemo placement='right-start' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='left' />
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <PlacementDemo placement='right' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='left-end' />
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <PlacementDemo placement='right-end' />
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <PlacementDemo placement='bottom-start' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='bottom' />
        </Grid.Item>
        <Grid.Item sm={4}>
          <PlacementDemo placement='bottom-end' />
        </Grid.Item>
      </Grid>
    </Container>
  </Container>
)

export default Example
