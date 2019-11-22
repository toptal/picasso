import React, { ReactElement } from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'

// --- horrible fix, we need to have a dependency to @toptal/picasso here
import { Button } from '../../../../../packages/core'
import Picasso from '../../Picasso'
import withClasses from './withClasses'

const TestComponent = (props: { children: ReactElement }) => {
  const { children } = props

  return children
}

const DecoratedComponent = withClasses(classes => [
  [Button, { root: classes.test }]
])(TestComponent)

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
