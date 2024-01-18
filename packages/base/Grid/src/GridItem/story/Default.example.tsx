import React from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import { SPACING_4, palette } from '@toptal/picasso-utils'

type Props = { children: React.ReactNode }

const ContentContainer = ({ children }: Props) => (
  <Container
    padded={SPACING_4}
    style={{ backgroundColor: palette.blue.lighter }}
  >
    <Typography variant='heading' size='small' align='center'>
      {children}
    </Typography>
  </Container>
)

const Example = () => (
  <Grid>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={1}>
      <ContentContainer>1</ContentContainer>
    </Grid.Item>

    <Grid.Item sm={12}>
      <ContentContainer>12</ContentContainer>
    </Grid.Item>

    <Grid.Item sm={6}>
      <ContentContainer>6</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={6}>
      <ContentContainer>6</ContentContainer>
    </Grid.Item>

    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>3</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={9}>
      <ContentContainer>Main Content</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={9}>
      <ContentContainer>Main Content</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={6}>
      <ContentContainer>Main Content</ContentContainer>
    </Grid.Item>
    <Grid.Item sm={3}>
      <ContentContainer>Sidebar</ContentContainer>
    </Grid.Item>
  </Grid>
)

export default Example
