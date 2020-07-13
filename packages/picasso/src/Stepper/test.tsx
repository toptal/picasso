import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'
import * as titleCaseModule from 'ap-style-title-case'

import Stepper, { Props } from './Stepper'

jest.mock('ap-style-title-case')

let spiedOnTitleCase: jest.SpyInstance
beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

const renderStepper = (
  props: OmitInternalProps<Props>,
  picassoConfig?: PicassoConfig
) => {
  const { active, fullWidth, hideLabels, steps, titleCase } = props

  return render(
    <Stepper
      active={active}
      fullWidth={fullWidth}
      hideLabels={hideLabels}
      steps={steps}
      titleCase={titleCase}
    />,
    undefined,
    picassoConfig
  )
}

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

  test('should transform text to title case when Picasso titleCase property is true', () => {
    const STEP_1_TEXT = 'Test pb7'
    const STEP_2_TEXT = 'Test ap0'
    renderStepper({ steps: [STEP_1_TEXT, STEP_2_TEXT] }, { titleCase: true })

    expect(spiedOnTitleCase).toBeCalledTimes(2)
    expect(spiedOnTitleCase.mock.calls[0]).toEqual([STEP_1_TEXT])
    expect(spiedOnTitleCase.mock.calls[1]).toEqual([STEP_2_TEXT])
  })

  test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderStepper(
      { steps: ['abc pd0', 'abc gj5'], titleCase: false },
      { titleCase: true }
    )

    expect(spiedOnTitleCase).toBeCalledTimes(0)
  })
})
