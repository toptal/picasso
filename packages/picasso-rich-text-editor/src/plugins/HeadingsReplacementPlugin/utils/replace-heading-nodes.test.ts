import type { ParagraphNode, TextNode } from 'lexical'
import { $createParagraphNode, $createTextNode } from 'lexical'
import type { HeadingNode } from '@lexical/rich-text'

import { replaceHeadingNodes } from './replace-heading-nodes'

jest.mock('lexical', () => ({
  __esModule: true,
  $createTextNode: jest.fn(),
  $createParagraphNode: jest.fn(),
}))

const mockedCreateParagraphNode = $createParagraphNode as jest.MockedFunction<
  typeof $createParagraphNode
>

const mockedCreateTextNode = $createTextNode as jest.MockedFunction<
  typeof $createTextNode
>

describe('replaceHeadingNodes', () => {
  describe('when h3 heading is provided', () => {
    it('does not replace headings', () => {
      const node = jest.fn() as unknown as HeadingNode

      node.getTag = () => 'h3'
      node.replace = jest.fn()
      node.getChildren = () => []

      replaceHeadingNodes(node)

      expect(node.replace).toHaveBeenCalledTimes(0)
    })
  })

  describe('when non-h3 heading is provided', () => {
    it('replaces it with bold text', () => {
      const testContent = 'test'

      const node = jest.fn() as unknown as HeadingNode

      node.getTag = () => 'h1'
      node.getTextContent = () => testContent
      node.replace = jest.fn()

      const setFormatMock = jest.fn()

      mockedCreateTextNode.mockImplementation(
        () =>
          ({
            setFormat: setFormatMock,
          } as unknown as TextNode)
      )

      const appendMock = jest.fn()
      const selectMock = jest.fn()

      mockedCreateParagraphNode.mockImplementation(
        () =>
          ({
            append: appendMock,
            select: selectMock,
          } as unknown as ParagraphNode)
      )

      replaceHeadingNodes(node)

      expect(mockedCreateTextNode).toHaveBeenCalledWith(testContent)
      expect(mockedCreateParagraphNode).toHaveBeenCalledTimes(1)

      expect(setFormatMock).toHaveBeenCalledWith('bold')
      expect(appendMock).toHaveBeenCalledWith({ setFormat: setFormatMock })
      expect(selectMock).toHaveBeenCalled()

      expect(node.replace).toHaveBeenCalledWith({
        append: appendMock,
        select: selectMock,
      })
    })
  })
})
