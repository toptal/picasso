import { renderHook } from '@testing-library/react-hooks'
import { act } from '@toptal/picasso/test-utils'

import { EMPTY_STATE } from '../../constants'
import useToolbarState from './useToolbarState'

describe('useToolbarState', () => {
  describe('setBold', () => {
    it('sets bold value', () => {
      const { result } = renderHook(() => useToolbarState())

      act(() => {
        result.current.actions.setBold(true)
      })
      expect(result.current.toolbarState).toEqual({
        ...EMPTY_STATE,
        bold: true
      })
    })
  })
  describe('setItalic', () => {
    it('sets italic value', () => {
      const { result } = renderHook(() => useToolbarState())

      act(() => {
        result.current.actions.setItalic(true)
      })
      expect(result.current.toolbarState).toEqual({
        ...EMPTY_STATE,
        italic: true
      })
    })
  })
  describe('setList', () => {
    it('sets list value', () => {
      const { result } = renderHook(() => useToolbarState())

      act(() => {
        result.current.actions.setList('bullet')
      })
      expect(result.current.toolbarState).toEqual({
        ...EMPTY_STATE,
        list: 'bullet'
      })
    })
  })
  describe('setHeader', () => {
    it('sets header value', () => {
      const { result } = renderHook(() => useToolbarState())

      act(() => {
        result.current.actions.setHeader('3')
      })
      expect(result.current.toolbarState).toEqual({
        ...EMPTY_STATE,
        header: '3'
      })
    })
  })
})
