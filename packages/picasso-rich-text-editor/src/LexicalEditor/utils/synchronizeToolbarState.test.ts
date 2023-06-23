import type {
  ElementNode,
  LexicalEditor,
  LexicalNode,
  RangeSelection,
  TextNode,
} from 'lexical'
import { $getSelection, $isRangeSelection } from 'lexical'
import { $isListNode } from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'
import { $isHeadingNode } from '@lexical/rich-text'

import { ToolbarActions } from './toolbarState'
import { synchronizeToolbarState } from './synchronizeToolbarState'
import { getLexicalNode } from './getLexicalNode'

jest.mock('lexical', () => ({
  $getSelection: jest.fn(),
  $isRangeSelection: jest.fn(),
}))

jest.mock('@lexical/utils', () => ({
  __esModule: true,
  $getNearestNodeOfType: jest.fn(),
}))

jest.mock('@lexical/list', () => ({
  __esModule: true,
  $isListNode: jest.fn(),
}))

jest.mock('@lexical/rich-text', () => ({
  __esModule: true,
  $isHeadingNode: jest.fn(),
}))

jest.mock('./getLexicalNode', () => ({
  __esModule: true,
  getLexicalNode: jest.fn(),
}))

const mockedGetSelection = $getSelection as jest.MockedFunction<
  typeof $getSelection
>
const mockedIsRangeSelection = $isRangeSelection as jest.MockedFunction<
  typeof $isRangeSelection
>

const mockedGetNearestNodeOfType = $getNearestNodeOfType as jest.MockedFunction<
  typeof $getNearestNodeOfType
>

const mockedGetLexicalNode = getLexicalNode as jest.MockedFunction<
  typeof getLexicalNode
>
const mockedIsListNode = $isListNode as jest.MockedFunction<typeof $isListNode>

const mockedIsHeadingNode = $isHeadingNode as jest.MockedFunction<
  typeof $isHeadingNode
>

describe('synchronizeToolbarState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when range selection has bold and italic format', () => {
    it('dispatches an action with the correct values', () => {
      const editorMock = {
        getElementByKey: jest.fn(),
      } as unknown as LexicalEditor
      const dispatchMock = jest.fn()
      const hasFormatMock = jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)

      mockedGetSelection.mockReturnValueOnce({
        hasFormat: hasFormatMock,
      } as unknown as RangeSelection)
      mockedIsRangeSelection.mockReturnValueOnce(true)
      mockedGetLexicalNode.mockReturnValueOnce({
        elementDOM: null,
        node: {} as unknown as LexicalNode,
        anchorNode: {} as unknown as TextNode,
      })

      synchronizeToolbarState(dispatchMock, editorMock)

      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith({
        type: ToolbarActions.UPDATE_VISUAL_STATE,
        value: {
          bold: true,
          italic: true,
          header: '',
          list: false,
        },
      })
      expect(mockedGetSelection).toHaveBeenCalledTimes(1)
      expect(mockedIsRangeSelection).toHaveBeenCalledTimes(1)
      expect(hasFormatMock).toHaveBeenCalledTimes(2)
      expect(hasFormatMock).toHaveBeenCalledWith('bold')
      expect(hasFormatMock).toHaveBeenCalledWith('italic')
    })
  })

  describe('when selection is not a range selection', () => {
    it('does not dispatch any action', () => {
      const dispatchMock = jest.fn()
      const editorMock = {
        getElementByKey: jest.fn(),
      } as unknown as LexicalEditor

      mockedIsRangeSelection.mockReturnValueOnce(false)

      synchronizeToolbarState(dispatchMock, editorMock)

      expect(dispatchMock).not.toHaveBeenCalled()
      expect(mockedGetSelection).toHaveBeenCalledTimes(1)
      expect(mockedIsRangeSelection).toHaveBeenCalledTimes(1)
    })
  })

  describe('when range selection has a list node', () => {
    it('dispatches an action with the ordered list', () => {
      const editorMock = {
        getElementByKey: jest.fn(),
      } as unknown as LexicalEditor
      const dispatchMock = jest.fn()
      const hasFormatMock = jest
        .fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)

      mockedGetSelection.mockReturnValueOnce({
        hasFormat: hasFormatMock,
      } as unknown as RangeSelection)
      mockedIsRangeSelection.mockReturnValueOnce(true)
      mockedGetLexicalNode.mockReturnValueOnce({
        elementDOM: true as unknown as HTMLElement,
        node: {} as unknown as LexicalNode,
        anchorNode: {} as unknown as TextNode,
      })

      mockedIsListNode.mockReturnValueOnce(true)
      const mockedGetOrderedListType = jest.fn().mockReturnValueOnce('number')

      mockedGetNearestNodeOfType.mockReturnValueOnce({
        getListType: mockedGetOrderedListType,
      } as unknown as ElementNode)

      synchronizeToolbarState(dispatchMock, editorMock)

      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith({
        type: ToolbarActions.UPDATE_VISUAL_STATE,
        value: {
          bold: false,
          italic: false,
          header: '',
          list: 'ordered',
        },
      })
    })

    it('dispatches an action with the bullet list', () => {
      const editorMock = {
        getElementByKey: jest.fn(),
      } as unknown as LexicalEditor
      const dispatchMock = jest.fn()
      const hasFormatMock = jest
        .fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)

      mockedGetSelection.mockReturnValueOnce({
        hasFormat: hasFormatMock,
      } as unknown as RangeSelection)
      mockedIsRangeSelection.mockReturnValueOnce(true)
      mockedGetLexicalNode.mockReturnValueOnce({
        elementDOM: true as unknown as HTMLElement,
        node: {} as unknown as LexicalNode,
        anchorNode: {} as unknown as TextNode,
      })

      mockedIsListNode.mockReturnValueOnce(true)
      const mockedGetBulletListType = jest.fn().mockReturnValueOnce('bullet')

      mockedGetNearestNodeOfType.mockReturnValueOnce({
        getListType: mockedGetBulletListType,
      } as unknown as ElementNode)

      synchronizeToolbarState(dispatchMock, editorMock)

      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith({
        type: ToolbarActions.UPDATE_VISUAL_STATE,
        value: {
          bold: false,
          italic: false,
          header: '',
          list: 'bullet',
        },
      })
    })
  })

  describe('when range selection is heading', () => {
    it('dispatches an action with the correct values', () => {
      const editorMock = {
        getElementByKey: jest.fn(),
      } as unknown as LexicalEditor
      const dispatchMock = jest.fn()
      const hasFormatMock = jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)

      mockedGetSelection.mockReturnValueOnce({
        hasFormat: hasFormatMock,
      } as unknown as RangeSelection)
      mockedIsRangeSelection.mockReturnValueOnce(true)
      mockedGetLexicalNode.mockReturnValueOnce({
        elementDOM: null,
        node: {} as unknown as LexicalNode,
        anchorNode: {} as unknown as TextNode,
      })
      mockedIsHeadingNode.mockReturnValueOnce(true)

      synchronizeToolbarState(dispatchMock, editorMock)

      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith({
        type: ToolbarActions.UPDATE_VISUAL_STATE,
        value: {
          bold: true,
          italic: true,
          header: '',
          list: false,
        },
      })
      expect(mockedGetSelection).toHaveBeenCalledTimes(1)
      expect(mockedIsRangeSelection).toHaveBeenCalledTimes(1)
      expect(hasFormatMock).toHaveBeenCalledTimes(2)
      expect(hasFormatMock).toHaveBeenCalledWith('bold')
      expect(hasFormatMock).toHaveBeenCalledWith('italic')
    })
  })
})
