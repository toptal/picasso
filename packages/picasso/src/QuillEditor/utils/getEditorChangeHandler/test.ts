import { act } from '@toptal/picasso/test-utils'
import Quill, { RangeStatic } from 'quill'

import getEditorChangeHandler from './getEditorChangeHandler'

const rangeMock = { index: 0, length: 0 } as RangeStatic

describe('getEditorChangeHandler', () => {
  describe('text-change event', () => {
    describe('when source is not api', () => {
      it('does nothing', () => {
        const quill = ({
          getFormat: jest.fn(() => ({}))
        } as unknown) as Quill
        const onSelectionChange = jest.fn()

        const handler = getEditorChangeHandler(quill, onSelectionChange)

        act(() => handler('text-change', rangeMock, rangeMock, 'user'))
        act(() => handler('text-change', rangeMock, rangeMock, 'silent'))

        expect(quill.getFormat).not.toHaveBeenCalled()
        expect(onSelectionChange).not.toHaveBeenCalled()
      })
    })
    describe('when source is api', () => {
      it('calls the callback with quill format', () => {
        const quill = ({
          getFormat: jest.fn(() => ({}))
        } as unknown) as Quill
        const onSelectionChange = jest.fn()

        const handler = getEditorChangeHandler(quill, onSelectionChange)

        act(() => handler('text-change', rangeMock, rangeMock, 'api'))

        expect(quill.getFormat).toHaveBeenCalled()
        expect(onSelectionChange).toHaveBeenCalledWith({})
      })
    })
  })
  describe('selection-change event', () => {
    describe('when source is not silent', () => {
      it('does nothing', () => {
        const quill = ({
          getFormat: jest.fn(() => ({}))
        } as unknown) as Quill
        const onSelectionChange = jest.fn()

        const handler = getEditorChangeHandler(quill, onSelectionChange)

        act(() => handler('selection-change', rangeMock, rangeMock, 'api'))
        act(() => handler('selection-change', rangeMock, rangeMock, 'user'))

        expect(quill.getFormat).not.toHaveBeenCalled()
        expect(onSelectionChange).not.toHaveBeenCalled()
      })
    })
    describe('when source is silent', () => {
      it('calls the callback with quill format', () => {
        const quill = ({
          getFormat: jest.fn(() => ({}))
        } as unknown) as Quill
        const onSelectionChange = jest.fn()

        const handler = getEditorChangeHandler(quill, onSelectionChange)

        act(() => handler('selection-change', rangeMock, rangeMock, 'silent'))

        expect(quill.getFormat).toHaveBeenCalled()
        expect(onSelectionChange).toHaveBeenCalledWith({})
      })
    })
  })
})
