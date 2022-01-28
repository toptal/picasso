import { renderHook } from '@testing-library/react-hooks'
import Quill, { RangeStatic } from 'quill'

import useToolbarUpdateOnEditorChange from './useToolbarUpdateOnEditorChange'
import { EditorChangeHandler, ActionCreatorsType } from '../../types'

const rangeMock = { index: 0, length: 0 } as RangeStatic

const actionsMock: ActionCreatorsType = {
  setBold: jest.fn(),
  setHeader: jest.fn(),
  setItalic: jest.fn(),
  setList: jest.fn()
}

describe('useToolbarUpdateOnEditorChange', () => {
  describe('selection event', () => {
    it('does nothing when source is silent', () => {
      const actions = actionsMock
      const sourceMock = 'silent'
      const quill = ({
        on: jest
          .fn()
          .mockImplementation(
            (name: 'editor-change', fn: EditorChangeHandler) =>
              fn('selection-change', rangeMock, rangeMock, sourceMock)
          ),
        off: jest.fn(),
        getFormat: jest.fn()
      } as unknown) as Quill

      renderHook(() =>
        useToolbarUpdateOnEditorChange({ actions: actions, quill })
      )

      expect(quill.getFormat).not.toHaveBeenCalled()
      expect(actions.setBold).not.toHaveBeenCalled()
      expect(actions.setHeader).not.toHaveBeenCalled()
      expect(actions.setList).not.toHaveBeenCalled()
      expect(actions.setItalic).not.toHaveBeenCalled()
    })

    it('calls reducer actions', () => {
      const actions = actionsMock
      const sourceMock = 'user'
      const quill = ({
        on: jest
          .fn()
          .mockImplementation(
            (name: 'editor-change', fn: EditorChangeHandler) =>
              fn('selection-change', rangeMock, rangeMock, sourceMock)
          ),
        off: jest.fn(),
        getFormat: jest.fn().mockImplementation(() => ({
          bold: true,
          header: 3,
          list: 'bullet'
        }))
      } as unknown) as Quill

      renderHook(() =>
        useToolbarUpdateOnEditorChange({ actions: actions, quill })
      )

      expect(quill.getFormat).toHaveBeenCalledWith(rangeMock)
      expect(quill.getFormat).toHaveBeenCalledTimes(1)
      expect(actions.setBold).toHaveBeenCalledWith(true)
      expect(actions.setBold).toHaveBeenCalledTimes(1)
      expect(actions.setHeader).toHaveBeenCalledWith('3')
      expect(actions.setHeader).toHaveBeenCalledTimes(1)
      expect(actions.setList).toHaveBeenCalledWith('bullet')
      expect(actions.setList).toHaveBeenCalledTimes(1)
      expect(actions.setItalic).toHaveBeenCalledWith(false)
      expect(actions.setItalic).toHaveBeenCalledTimes(1)
    })
  })
})
