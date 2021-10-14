import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'

import StepperVertical from './StepperVertical'
import { StepperVerticalProps } from '.'

jest.mock('ap-style-title-case')

const renderStepper = (
  props: StepperVerticalProps,
  picassoConfig?: PicassoConfig
) => {
  const { active, steps, titleCase } = props

  return render(
    <StepperVertical active={active} steps={steps} titleCase={titleCase} />,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('StepperVertical', () => {
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
})
