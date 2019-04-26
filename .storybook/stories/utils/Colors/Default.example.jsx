import React, { Fragment } from 'react'
import { palette, Grid, Paper, Typography, Container } from '@toptal/picasso'

const colorGroups = Object.entries(palette)

const ColorsExample = () => (
  <Fragment>
    {colorGroups.map(([colorGroupName, colorGroup]) => (
      <Fragment key={colorGroupName}>
        <Container top={2} bottom={1}>
          <Typography variant='h2' weight='light'>
            {colorGroupName}
          </Typography>
        </Container>
        <ColorGroup
          colors={Object.entries(colorGroup)}
          colorGroupName={colorGroupName}
        />
      </Fragment>
    ))}
  </Fragment>
)

const ColorGroup = ({ colors, colorGroupName }) => (
  <Grid spacing={16}>
    {colors.map(([colorName, color]) => (
      <Grid.Item key={colorName}>
        <Paper style={{ padding: '1em' }}>
          <ColorRectangle color={color} />
          <Typography
            variant='caption'
            weight='bold'
          >{`${colorGroupName}.${colorName}`}</Typography>
          <Typography variant='caption'>{color}</Typography>
        </Paper>
      </Grid.Item>
    ))}
  </Grid>
)

const ColorRectangle = ({ color }) => (
  <div
    style={{
      width: '7rem',
      height: '7rem',
      backgroundColor: color
    }}
  />
)

export default ColorsExample
