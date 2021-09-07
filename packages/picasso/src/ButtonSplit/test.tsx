import React from 'react'
import { render, fireEvent, screen } from '@toptal/picasso/test-utils'

import ButtonSplit from './ButtonSplit'
import PicassoMenu from '../Menu'

const Menu = () => {
  const handleClick = () => {}

  return (
    <PicassoMenu data-testid='menu'>
      <PicassoMenu.Item onClick={handleClick}>First item</PicassoMenu.Item>
      <PicassoMenu.Item onClick={handleClick}>Second item</PicassoMenu.Item>
      <PicassoMenu.Item onClick={handleClick}>Third item</PicassoMenu.Item>
    </PicassoMenu>
  )
}

const smallIconViewBox = '0 0 16 16'
const largeIconViewBox = '0 0 24 24'

describe('ButtonSplit', () => {
  it('default render', () => {
    const { container } = render(<ButtonSplit text='Action' menu={<Menu />} />)

    expect(container).toMatchSnapshot()
  })

  it('invokes onClick after a click on action button', () => {
    const onClick = jest.fn()

    render(
      <ButtonSplit
        text='Action'
        onClick={onClick}
        testIds={{ actionButton: 'action' }}
        menu={<Menu />}
      />
    )

    const button = screen.getByTestId('action')

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })

  it('renders arrow up icon for an opened menu', () => {
    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menu' }}
        menu={<Menu />}
      />
    )

    const button = screen.getByTestId('menu')

    // open menu
    fireEvent.click(button)

    expect(button.querySelector('svg')).toMatchSnapshot()
  })

  it('renders arrow down icon for a closed menu', () => {
    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menu' }}
        menu={<Menu />}
      />
    )

    const button = screen.getByTestId('menu')

    // open menu
    fireEvent.click(button)

    // close menu
    fireEvent.click(button)

    expect(button.querySelector('svg')).toMatchSnapshot()
  })

  it('renders small arrow for small button', () => {
    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menu' }}
        size='small'
        menu={<Menu />}
      />
    )

    expect(screen.getByTestId('menu').querySelector('svg')).toHaveAttribute(
      'viewBox',
      smallIconViewBox
    )
  })

  it('renders small arrow for medium button', () => {
    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menu' }}
        size='medium'
        menu={<Menu />}
      />
    )

    expect(screen.getByTestId('menu').querySelector('svg')).toHaveAttribute(
      'viewBox',
      smallIconViewBox
    )
  })

  it('renders small arrow for large button', () => {
    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menu' }}
        size='large'
        menu={<Menu />}
      />
    )

    expect(screen.getByTestId('menu').querySelector('svg')).toHaveAttribute(
      'viewBox',
      largeIconViewBox
    )
  })

  it('closes menu on click to the item', async () => {
    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menuButton', actionButton: 'action' }}
        size='large'
        menu={<Menu />}
      />
    )

    const menuButton = screen.getByTestId('menuButton')

    // open menu
    fireEvent.click(menuButton)

    // click away
    fireEvent.click(
      screen.getByRole('menuitem', {
        name: /first item/i
      })
    )

    expect(
      screen.getByTestId('menuButton').querySelector('svg')
    ).toMatchSnapshot()
  })

  it('invokes a menu item handler on click to the item', () => {
    const handleClick = jest.fn()

    const menu = (
      <PicassoMenu data-testid='menu'>
        <PicassoMenu.Item onClick={handleClick}>First item</PicassoMenu.Item>
        <PicassoMenu.Item onClick={handleClick}>Second item</PicassoMenu.Item>
        <PicassoMenu.Item onClick={handleClick}>Third item</PicassoMenu.Item>
      </PicassoMenu>
    )

    render(
      <ButtonSplit
        text='Action'
        testIds={{ menuButton: 'menuButton', actionButton: 'action' }}
        size='large'
        menu={menu}
      />
    )

    const menuButton = screen.getByTestId('menuButton')

    // open menu
    fireEvent.click(menuButton)

    // click away
    fireEvent.click(
      screen.getByRole('menuitem', {
        name: /first item/i
      })
    )

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
