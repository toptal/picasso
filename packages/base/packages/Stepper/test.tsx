import React from 'react'
import type { PicassoConfig } from '@toptal/picasso/test-utils'
import { render } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'

import Stepper from './Stepper'
import type { StepperProps } from '.'

jest.mock('ap-style-title-case')

const renderStepper = (props: StepperProps, picassoConfig?: PicassoConfig) => {
  const { active, hideLabels, steps, titleCase } = props

  return render(
    <Stepper
      active={active}
      hideLabels={hideLabels}
      steps={steps}
      titleCase={titleCase}
    />,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Stepper', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
  })
  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 2
    const { container } = renderStepper({ steps, active: activeStep })

    expect(container).toMatchSnapshot()
  })

  it('render with all steps completed', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 4
    const { container } = renderStepper({ steps, active: activeStep })

    expect(container).toMatchSnapshot()
  })

  it('render with hidden labels', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
    const activeStep = 4
    const { container } = renderStepper({
      steps,
      active: activeStep,
      hideLabels: true,
    })

    expect(container).toMatchSnapshot()
  })

  it('should transform text to title case when Picasso titleCase property is true', () => {
    const STEP_1_TEXT = 'Test pb7'
    const STEP_2_TEXT = 'Test ap0'

    renderStepper({ steps: [STEP_1_TEXT, STEP_2_TEXT] }, { titleCase: true })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(2)
    expect(spiedOnTitleCase.mock.calls[0]).toEqual([STEP_1_TEXT])
    expect(spiedOnTitleCase.mock.calls[1]).toEqual([STEP_2_TEXT])
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderStepper(
      { steps: ['abc pd0', 'abc gj5'], titleCase: false },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })

  describe('when steps are custom nodes', () => {
    it('renders', () => {
      const steps = [
        { key: '1', content: <span>Step 1</span> },
        { key: '2', content: <span>Step 2</span> },
        { key: '3', content: <span>Step 3</span> },
        { key: '4', content: <span>Step 4</span> },
      ]
      const activeStep = 2
      const { container } = renderStepper({ steps, active: activeStep })

      expect(container).toMatchSnapshot()
    })
  })
})
