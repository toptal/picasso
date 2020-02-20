import React, { ReactElement } from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import { Classes } from '../types'
// --- horrible fix, we need to have a dependency to @toptal/picasso here
import { Button } from '../../../../../packages/picasso'
import withClasses from './withClasses'

const TestComponent = (props: { children: ReactElement; classes: Classes }) => {
  const { children } = props

  return children
}

const DecoratedComponent = withClasses(classes => [
  [Button, { root: classes.test }]
])(TestComponent)

const renderComponent = () => {
  return render(
    <DecoratedComponent classes={{ test: 'testing' }}>
      <Button>Button</Button>
    </DecoratedComponent>
  )
}

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
