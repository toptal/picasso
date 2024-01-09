import React from 'react'
import {
  Afternoon16,
  Company16,
  Component16,
  Container,
  Menu,
  Typography,
} from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const SlideMenu = () => (
  <Menu>
    <Menu.Item>Label</Menu.Item>
    <Menu.Item
      menu={
        <Menu>
          <Menu.Item>Label inner</Menu.Item>
          <Menu.Item
            menu={
              <Menu>
                <Menu.Item>Label inner</Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)

const DrilldownMenu = () => (
  <Menu variant='drilldown'>
    <Menu.Item>Label</Menu.Item>
    <Menu.Item
      menu={
        <Menu variant='drilldown'>
          <Menu.Item>Label inner</Menu.Item>
          <Menu.Item
            menu={
              <Menu variant='drilldown'>
                <Menu.Item>Label inner</Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)

const SlideMenuWithIcon = () => (
  <Menu>
    <Menu.Item icon={<Afternoon16 />}>Label</Menu.Item>
    <Menu.Item
      icon={<Company16 />}
      menu={
        <Menu>
          <Menu.Item icon={<Afternoon16 />}>Label inner</Menu.Item>
          <Menu.Item
            icon={<Company16 />}
            menu={
              <Menu>
                <Menu.Item icon={<Component16 />}>Label inner</Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)
const DrilldownMenuWithDescIcon = () => (
  <Menu variant='drilldown'>
    <Menu.Item description='Description' icon={<Afternoon16 />}>
      Label
    </Menu.Item>
    <Menu.Item
      description='Description'
      icon={<Company16 />}
      menu={
        <Menu variant='drilldown'>
          <Menu.Item description='Description' icon={<Afternoon16 />}>
            Label inner
          </Menu.Item>
          <Menu.Item
            description='Description'
            icon={<Company16 />}
            menu={
              <Menu variant='drilldown'>
                <Menu.Item description='Description' icon={<Component16 />}>
                  Label inner
                </Menu.Item>
              </Menu>
            }
          >
            Label inner
          </Menu.Item>
        </Menu>
      }
    >
      Label
    </Menu.Item>
  </Menu>
)

const Example = () => {
  return (
    <Container flex gap={SPACING_6}>
      <ExampleContainer title='Slide (default)'>
        <SlideMenu />
      </ExampleContainer>

      <ExampleContainer title='Drilldown'>
        <DrilldownMenu />
      </ExampleContainer>

      <ExampleContainer title='Slide with Icon'>
        <SlideMenuWithIcon />
      </ExampleContainer>

      <ExampleContainer title='Drilldown with Description and Icon'>
        <DrilldownMenuWithDescIcon />
      </ExampleContainer>
    </Container>
  )
}

const ExampleContainer = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <Container flex gap={SPACING_4} direction='column'>
      <Typography variant='heading' size='small'>
        {title}
      </Typography>
      <Container>{children}</Container>
    </Container>
  )
}

export default Example
