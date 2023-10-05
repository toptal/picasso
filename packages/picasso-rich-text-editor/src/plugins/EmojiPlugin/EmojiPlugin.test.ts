import { renderHook } from '@testing-library/react-hooks'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createTextNode, $insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical'

import EmojiPlugin, {
  INSERT_CUSTOM_EMOJI_COMMAND,
  INSERT_EMOJI_COMMAND,
} from './index'
import { $createCustomEmojiNode } from './nodes/CustomEmojiNode'

jest.mock('../../LexicalEditor/utils', () => ({
  getSelectedNode: jest.fn(),
}))

jest.mock('@lexical/react/LexicalComposerContext', () => ({
  useLexicalComposerContext: jest.fn(() => [{}]),
}))

jest.mock('@lexical/utils', () => ({
  mergeRegister: jest.fn(),
}))

jest.mock('@lexical/rich-text', () => ({
  $isHeadingNode: jest.fn(),
}))

jest.mock('lexical', () => ({
  $createTextNode: jest.fn(),
  $insertNodes: jest.fn(),
  $getSelection: jest.fn(),
  $isRangeSelection: jest.fn(),
  COMMAND_PRIORITY_EDITOR: jest.fn(),
  FORMAT_TEXT_COMMAND: jest.fn(),
  createCommand: jest.fn(),
}))

jest.mock('./nodes/CustomEmojiNode', () => ({
  $createCustomEmojiNode: jest.fn(),
}))

describe('LexicalEmojiPlugin', () => {
  const mockEditor = {
    registerCommand: jest.fn(),
  }

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useLexicalComposerContext as jest.Mock).mockReturnValue([mockEditor])
  })

  it('registers commands on mount', () => {
    renderHook(() => EmojiPlugin({}))

    expect(mockEditor.registerCommand).toHaveBeenCalledTimes(2)
    expect(mockEditor.registerCommand).toHaveBeenCalledWith(
      INSERT_EMOJI_COMMAND,
      expect.any(Function),
      COMMAND_PRIORITY_EDITOR
    )
    expect(mockEditor.registerCommand).toHaveBeenCalledWith(
      INSERT_CUSTOM_EMOJI_COMMAND,
      expect.any(Function),
      COMMAND_PRIORITY_EDITOR
    )
  })

  it('inserts a text node when the native emoji command is called', () => {
    renderHook(() => EmojiPlugin({}))
    const nativeEmojiCommand = mockEditor.registerCommand.mock.calls[0][1]

    nativeEmojiCommand('😃')

    expect($createTextNode).toHaveBeenCalledWith('😃')
    expect($insertNodes).toHaveBeenCalledWith([$createTextNode()])
  })

  it('inserts a custom emoji node when the custom emoji command is called', () => {
    const payload = { id: 'custom emoji', src: 'https://example.com/emoji.png' }

    renderHook(() => EmojiPlugin({}))
    const customEmojiCommand = mockEditor.registerCommand.mock.calls[1][1]

    customEmojiCommand(payload)

    expect($createCustomEmojiNode).toHaveBeenCalledWith(payload)
    expect($insertNodes).toHaveBeenCalledWith([$createCustomEmojiNode(payload)])
  })
})
