import React from 'react'
import Button from './index'
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library'
const Differencify = require('differencify')
const differencify = new Differencify({
  debug: true
})

const renderButton = (children, props = {}) => {
  return render(
    <Button {...props}>{children}</Button>
  )
}

afterEach(cleanup)

test('onClick callback should be fired after clicking the button', () => {
  const onClick = jest.fn()
  const { getByText, container } = renderButton('Click me!', { onClick })

  fireEvent.click(getByText('Click me!'))

  expect(onClick).toHaveBeenCalled()
})

describe('disabled button', () => {
  let onClick
  let api

  beforeEach(() => {
    onClick = jest.fn()

    api = renderButton('Click me!', {
      onClick,
      disabled: true
    })
  })
  test('renders disabled version', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('disables button events', () => {
    const { getByText } = api

    fireEvent.click(getByText('Click me!'))

    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Visual regression', () => {
  beforeAll(async () => {
    await differencify.launchBrowser({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  })

  afterAll(async () => {
    await differencify.cleanup()
  })

  test('validate component', async () => {
    return await differencify
      .init()
      .launch()
      .newPage()
      .goto('http://localhost:9001/?selectedKind=Button&selectedStory=primary&full=0&addons=1&stories=1&panelRight=0')
      .screenshot()
      .toMatchSnapshot()
      .close()
      .end()
  }, 30 * 1000);
});
