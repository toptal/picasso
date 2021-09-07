import React from 'react'
import { Button, Menu, Container, Typography } from '@toptal/picasso'

const Example = () => {
  const handleClick = () => console.info('Item is clicked')

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleClick}>First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Third item</Menu.Item>
    </Menu>
  )

  return (
    <>
      <Typography variant='heading' size='small'>
        Primary (Default)
      </Typography>

      <Container flex gap='1em' top='small' bottom='small'>
        <Button.Split text='Normal' menu={menu} />

        <Button.Split
          text='Action Hovered'
          menu={menu}
          actionButtonProps={{ hovered: true }}
        />
        <Button.Split
          text='Menu Hovered'
          menu={menu}
          menuButtonProps={{ hovered: true }}
        />

        <Button.Split
          text='Action Focused'
          menu={menu}
          actionButtonProps={{ focused: true }}
        />
        <Button.Split
          text='Menu Focused'
          menu={menu}
          menuButtonProps={{ focused: true }}
        />

        <Button.Split
          text='Action Active'
          menu={menu}
          actionButtonProps={{ active: true }}
        />
        <Button.Split
          text='Menu Active'
          menu={menu}
          menuButtonProps={{ active: true }}
        />

        <Button.Split text='Disabled' menu={menu} disabled />
      </Container>
      <Typography variant='heading' size='small'>
        Secondary
      </Typography>
      <Container flex gap='1em' top='small'>
        <Button.Split text='Normal' variant='secondary' menu={menu} />

        <Button.Split
          text='Action Hovered'
          variant='secondary'
          menu={menu}
          actionButtonProps={{ hovered: true }}
        />
        <Button.Split
          text='Menu Hovered'
          variant='secondary'
          menu={menu}
          menuButtonProps={{ hovered: true }}
        />

        <Button.Split
          text='Action Focused'
          variant='secondary'
          menu={menu}
          actionButtonProps={{ focused: true }}
        />
        <Button.Split
          text='Menu Focused'
          variant='secondary'
          menu={menu}
          menuButtonProps={{ focused: true }}
        />

        <Button.Split
          text='Action Active'
          variant='secondary'
          menu={menu}
          actionButtonProps={{ active: true }}
        />
        <Button.Split
          text='Menu Active'
          variant='secondary'
          menu={menu}
          menuButtonProps={{ active: true }}
        />

        <Button.Split
          text='Disabled'
          variant='secondary'
          menu={menu}
          disabled
        />
      </Container>
    </>
  )
}

export default Example
