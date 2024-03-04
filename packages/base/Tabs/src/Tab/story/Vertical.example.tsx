import React from 'react'
import { Container, Tabs, Typography } from '@toptal/picasso'
import { SPACING_8, SPACING_4, palette } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex gap={SPACING_8} padded={SPACING_4}>
      <ExampleDecorator title='With Title'>
        <Tabs value={0} orientation='vertical'>
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Label' disabled />
          <Tabs.Tab label='Label' />
          <Tabs.Tab label='Very long label that truncated' />
        </Tabs>
      </ExampleDecorator>
      <ExampleDecorator title='With Title & Description'>
        <Tabs value={0} orientation='vertical'>
          <Tabs.Tab label='Label' description='Description' />
          <Tabs.Tab label='Label' description='Description' disabled />
          <Tabs.Tab label='Label' description='Description' />
          <Tabs.Tab
            label='Very long label that truncated'
            description='Description'
          />
          <Tabs.Tab
            label='Label'
            description='Very long description that truncated'
          />
        </Tabs>
      </ExampleDecorator>
      <ExampleDecorator title='With UserBadge'>
        <Tabs value={0} orientation='vertical'>
          <Tabs.Tab label='Label' description='Description' avatar={null} />
          <Tabs.Tab
            label='Label'
            disabled
            description='Description'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          />
          <Tabs.Tab
            label='Label'
            description='Description'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          />
          <Tabs.Tab
            label='Very long label that truncated'
            description='Description'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          />
          <Tabs.Tab
            label='Label'
            description='Very long description that truncated'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          />
          <Tabs.Tab
            label='Label'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
          />
        </Tabs>
      </ExampleDecorator>
    </Container>
  )
}

type Props = {
  children: React.ReactNode
  title: string
}

const ExampleDecorator = ({ children, title }: Props) => {
  const style: React.CSSProperties = { backgroundColor: palette.grey.lighter }

  return (
    <Container>
      <Typography variant='heading' size='small'>
        {title}
      </Typography>
      <Container style={style}>{children}</Container>
    </Container>
  )
}

export default Example
