import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Button from '../../Button'
import Picasso from '../../Picasso'
import withClasses from './withClasses'

const TestComponent = (props: any) => {
  const { children } = props

  return children
}

const DecoratedComponent = withClasses(classes => [[Button, { root: classes.test }]])(
  TestComponent
)

const renderComponent = () => {
  return render(
    <Picasso>
      <DecoratedComponent classes={{ test: 'testing' }}>
        <Button>Button</Button>
      </DecoratedComponent>
    </Picasso>
  )
}

afterEach(cleanup)

describe('withClasses', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderComponent()
  })
  test('default render', () => {
    const { container } = api
    const button = container.querySelector('.testing')

    expect(button).not.toBeNull()
  })
})
