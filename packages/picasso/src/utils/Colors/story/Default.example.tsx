import React, { Fragment } from 'react'
import { palette } from '@toptal/picasso/utils'
import { Grid, Paper, Typography, Container } from '@toptal/picasso'

const colorGroups = Object.entries(palette)

const Example = () => (
  <>
    {colorGroups.map(([colorGroupName, colorGroup]) => (
      <Fragment key={colorGroupName}>
        <Container top={2} bottom={1}>
          <Typography variant='heading' size='large'>
            {colorGroupName}
          </Typography>
        </Container>
        <ColorGroup
          colors={Object.entries(colorGroup)}
          colorGroupName={colorGroupName}
        />
      </Fragment>
    ))}
  </>
)

const ColorGroup = ({
  colors,
  colorGroupName
}: {
  colors: [string, string][]
  colorGroupName: string
}) => (
  <Grid spacing={16}>
    {colors.map(([colorName, color]) => (
      <Grid.Item key={colorName}>
        <Paper style={{ padding: '1rem' }}>
          <ColorRectangle color={color} />
          <Typography size='xsmall'>
            {`${colorGroupName}.${colorName}`}
          </Typography>
          <Typography variant='heading' size='small'>
            {color.toUpperCase()}
          </Typography>
        </Paper>
      </Grid.Item>
    ))}
  </Grid>
)

const ColorRectangle = ({ color }: { color: string }) => (
  <div
    style={{
      width: '7rem',
      height: '7rem',
      backgroundColor: color
    }}
  />
)

export default Example
