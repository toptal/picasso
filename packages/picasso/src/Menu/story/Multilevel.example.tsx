import React from 'react'
import {
  Afternoon16,
  Company16,
  Component16,
  Container,
  Menu,
  Typography,
} from '@toptal/picasso'

const Example = () => {
  const menuForItemB1 = (
    <Menu>
      <Menu.Item>Item B1-1</Menu.Item>
      <Menu.Item>Item B1-2</Menu.Item>
    </Menu>
  )

  const menuForItemB2 = (
    <Menu>
      <Menu.Item>Item B2-1</Menu.Item>
      <Menu.Item>Item B2-2</Menu.Item>
    </Menu>
  )

  const menuForItemB = (
    <Menu>
      <Menu.Item menu={menuForItemB1}>Item B1</Menu.Item>
      <Menu.Item menu={menuForItemB2}>Item B2</Menu.Item>
    </Menu>
  )

  const sliderMenu = (
    <Menu>
      <Menu.Item>Item A</Menu.Item>
      <Menu.Item menu={menuForItemB}>Item B</Menu.Item>
      <Menu.Item description='Description' menu={menuForItemB}>
        Item B
      </Menu.Item>
      <Menu.Item description='Description' disabled menu={menuForItemB}>
        Item B
      </Menu.Item>
    </Menu>
  )

  const drilldownMenu = (
    <Menu variant='drilldown'>
      <Menu.Item>Item A</Menu.Item>
      <Menu.Item menu={menuForItemB}>Item B</Menu.Item>
      <Menu.Item description='Description' menu={menuForItemB}>
        Item B
      </Menu.Item>
      <Menu.Item description='Description' disabled menu={menuForItemB}>
        Item B
      </Menu.Item>
    </Menu>
  )

  type Options = { variant?: 'slide' | 'drilldown'; description?: string }

  const iconMenu = ({ variant, description }: Options) => (
    <Menu variant={variant}>
      <Menu.Item icon={<Component16 />} description={description}>
        Label
      </Menu.Item>
      <Menu.Item icon={<Company16 />} description={description}>
        Label
      </Menu.Item>
      <Menu.Item disabled icon={<Afternoon16 />} description={description}>
        Label
      </Menu.Item>
    </Menu>
  )

  const multiIconMenu = (options: Options) => (
    <Menu variant={options.variant}>
      <Menu.Item
        description={options.description}
        menu={iconMenu(options)}
        icon={<Component16 />}
      >
        Label
      </Menu.Item>
      <Menu.Item
        description={options.description}
        menu={iconMenu(options)}
        icon={<Company16 />}
      >
        Label
      </Menu.Item>
      <Menu.Item
        description={options.description}
        disabled
        menu={iconMenu(options)}
        icon={<Afternoon16 />}
      >
        Label
      </Menu.Item>
    </Menu>
  )

  return (
    <Container flex gap='medium'>
      <Container flex gap='small' direction='column'>
        <Typography variant='heading' size='small'>
          Slide (default)
        </Typography>
        <Container>{sliderMenu}</Container>
      </Container>
      <Container flex gap='small' direction='column'>
        <Typography variant='heading' size='small'>
          Drilldown
        </Typography>
        <Container>{drilldownMenu}</Container>
      </Container>

      <Container flex gap='small' direction='column'>
        <Typography variant='heading' size='small'>
          With Icon
        </Typography>
        <Container>{multiIconMenu({})}</Container>
      </Container>

      <Container flex gap='small' direction='column'>
        <Typography variant='heading' size='small'>
          With Description and Icon
        </Typography>
        <Container>
          {multiIconMenu({ variant: 'drilldown', description: 'Description' })}
        </Container>
      </Container>
    </Container>
  )
}

export default Example
