import React, { ComponentProps } from 'react'
import { Button, Menu, Container, Typography } from '@toptal/picasso'

type ButtonSplitProps = ComponentProps<typeof Button.Split>

const Example = () => {
  const handleClick = () => console.info('Item is clicked')

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleClick}>First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Third item</Menu.Item>
    </Menu>
  )

  const customStyles = { marginRight: '1em' }

  const renderStates = ({
    variant = 'primary'
  }: { variant?: ButtonSplitProps['variant'] } = {}) => {
    return (
      <>
        <Button.Split style={customStyles} variant={variant} menu={menu}>
          Normal
        </Button.Split>

        <Button.Split
          style={customStyles}
          variant={variant}
          menu={menu}
          actionButtonProps={{ hovered: true }}
        >
          Action Hovered
        </Button.Split>
        <Button.Split
          style={customStyles}
          variant={variant}
          menu={menu}
          menuButtonProps={{ hovered: true }}
        >
          Menu Hovered
        </Button.Split>

        <Button.Split
          style={customStyles}
          variant={variant}
          menu={menu}
          actionButtonProps={{ focused: true }}
        >
          Action Focused
        </Button.Split>

        <Button.Split
          style={customStyles}
          variant={variant}
          menu={menu}
          menuButtonProps={{ focused: true }}
        >
          Menu Focused
        </Button.Split>

        <Button.Split
          style={customStyles}
          variant={variant}
          menu={menu}
          actionButtonProps={{ active: true }}
        >
          Action Active
        </Button.Split>

        <Button.Split
          style={customStyles}
          variant={variant}
          menu={menu}
          menuButtonProps={{ active: true }}
        >
          Menu Active
        </Button.Split>

        <Button.Split variant={variant} menu={menu} disabled>
          Disabled
        </Button.Split>
      </>
    )
  }

  return (
    <>
      <Typography variant='heading' size='small'>
        Primary (Default)
      </Typography>

      <Container flex top='small' bottom='small'>
        {renderStates()}
      </Container>
      <Typography variant='heading' size='small'>
        Secondary
      </Typography>
      <Container flex top='small'>
        {renderStates({ variant: 'secondary' })}
      </Container>
    </>
  )
}

export default Example
