import type { LineBreakNode } from 'lexical'

import type { CodeBlockTextNode } from '../nodes'
import { $isCodeBlockTextNode } from '../nodes'
import getFirstCodeNodeOfLine from './getFirstCodeNodeOfLine'

jest.mock('../nodes', () => ({
  __esModule: true,
  $isCodeBlockTextNode: jest.fn(),
}))
// Mocking the function and methods
const getPreviousSibling = jest.fn()

const $isCodeBlockTextNodeMock = $isCodeBlockTextNode as jest.MockedFunction<
  typeof $isCodeBlockTextNode
>

describe('getFirstCodeNodeOfLine', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when the provided node is a CodeBlockTextNode', () => {
    it('returns the first CodeBlockTextNode', () => {
      const codeBlockTextNode = {
        getPreviousSibling,
      } as unknown as CodeBlockTextNode

      $isCodeBlockTextNodeMock
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
      getPreviousSibling.mockReturnValueOnce(null)

      const result = getFirstCodeNodeOfLine(codeBlockTextNode)

      expect(result).toBe(codeBlockTextNode)
      expect($isCodeBlockTextNode).toHaveBeenCalledWith(codeBlockTextNode)
      expect(getPreviousSibling).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the provided node is a LineBreakNode', () => {
    it('returns the provided node as it is', () => {
      const lineBreakNode = {
        getPreviousSibling,
      } as unknown as LineBreakNode

      $isCodeBlockTextNodeMock.mockReturnValue(false)

      const result = getFirstCodeNodeOfLine(lineBreakNode)

      expect(result).toBe(lineBreakNode)
      expect($isCodeBlockTextNodeMock).toHaveBeenCalledWith(lineBreakNode)
      expect(getPreviousSibling).toHaveBeenCalledTimes(0)
    })
  })

  describe('when the provided node is a CodeBlockTextNode with a non-CodeBlockTextNode in the sibling chain', () => {
    it('returns the first CodeBlockTextNode until the non-CodeBlockTextNode', () => {
      const firstCodeBlockTextNode = {
        getPreviousSibling,
      } as unknown as CodeBlockTextNode
      const secondCodeBlockTextNode = { getPreviousSibling }
      const nonCodeBlockTextNode = { getPreviousSibling }
      const thirdCodeBlockTextNode = { getPreviousSibling }

      $isCodeBlockTextNodeMock
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
      getPreviousSibling
        .mockReturnValueOnce(secondCodeBlockTextNode)
        .mockReturnValueOnce(nonCodeBlockTextNode)
        .mockReturnValueOnce(thirdCodeBlockTextNode)
        .mockReturnValueOnce(null)

      const result = getFirstCodeNodeOfLine(firstCodeBlockTextNode)

      expect(result).toBe(secondCodeBlockTextNode)
      expect($isCodeBlockTextNode).toHaveBeenCalledTimes(3)
      expect(getPreviousSibling).toHaveBeenCalledTimes(2)
    })
  })
})
