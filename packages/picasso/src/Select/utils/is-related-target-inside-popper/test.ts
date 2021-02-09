import { FocusEvent } from 'react'

import isRelatedTargetInsidePopper from './is-related-target-inside-popper'

const getPopperRefMock = (containsReturnValue: boolean) => ({
  current: {
    popper: {
      contains: jest.fn().mockReturnValue(containsReturnValue)
    }
  } as any
})

describe('isRelatedTargetInsidePopper', () => {
  it('checks correctly`', () => {
    const event = {} as FocusEvent

    expect(isRelatedTargetInsidePopper(event, undefined)).toBeFalsy()
    expect(
      isRelatedTargetInsidePopper(event, getPopperRefMock(false))
    ).toBeFalsy()
    expect(
      isRelatedTargetInsidePopper(event, getPopperRefMock(true))
    ).toBeTruthy()
  })
})
