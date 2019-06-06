import React from 'react'
import { render, cleanup } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import Stepper, { Props } from './Stepper'

const renderStepper = (props: OmitInternalProps<Props>) => {
  const { active, fullWidth, hideLabels, steps } = props

  return render(
    <Picasso loadFonts={false}>
      <Stepper
        active={active}
        fullWidth={fullWidth}
        hideLabels={hideLabels}
        steps={steps}
      />
    </Picasso>
  )
}

afterEach(cleanup)

describe('Stepper', () => {
  test('default render', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 2
    const { container } = renderStepper({ steps, active: activeStep })

    expect(container).toMatchSnapshot()
  })

  test('render with all steps completed', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 4
    const { container } = renderStepper({ steps, active: activeStep })

    expect(container).toMatchSnapshot()
  })

  test('render with hidden labels', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 4
    const { container } = renderStepper({
      steps,
      active: activeStep,
      hideLabels: true
    })

    expect(container).toMatchSnapshot()
  })

  test('render with full-width', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 4
    const { container } = renderStepper({
      steps,
      active: activeStep,
      fullWidth: true
    })

    expect(container).toMatchSnapshot()
  })
})
