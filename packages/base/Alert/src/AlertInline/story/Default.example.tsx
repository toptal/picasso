import React from 'react'
import { Container, Typography, Alert } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Yellow
        </Typography>
      </Container>
      <Alert.Inline>This is a warning inline alert.</Alert.Inline>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Red
        </Typography>
      </Container>
      <Alert.Inline variant='red'>
        This is a critical warning inline alert.
      </Alert.Inline>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Blue
        </Typography>
      </Container>
      <Alert.Inline variant='blue'>This is a info inline alert.</Alert.Inline>
    </Container>

    <Container bottom={SPACING_4}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading' size='small'>
          Green
        </Typography>
      </Container>
      <Alert.Inline variant='green'>
        This is a success inline alert.
      </Alert.Inline>
    </Container>
  </div>
)

export default Example
