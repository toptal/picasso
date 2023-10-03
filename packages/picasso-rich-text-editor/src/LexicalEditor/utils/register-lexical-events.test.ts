import {
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'

import { registerLexicalEvents } from './register-lexical-events'
import type { LexicalRegisterParams } from './register-lexical-events'

jest.mock('@lexical/react/LexicalComposerContext', () => ({
  useLexicalComposerContext: jest.fn().mockReturnValue([]),
}))

const mockUpdateToolbar = jest.fn()

const mockedEditorCommandsCleanup = jest.fn()

describe('registerLexicalEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('registers listeners and commands correctly and return a cleanup function', () => {
    const mockEditor = {
      registerUpdateListener: jest.fn().mockReturnValueOnce(() => {}),
      registerCommand: jest.fn().mockReturnValue(mockedEditorCommandsCleanup),
    }

    const params = {
      editor: mockEditor,
      updateToolbar: mockUpdateToolbar,
    }

    const cleanup = registerLexicalEvents(
      params as unknown as LexicalRegisterParams
    )

    expect(mockEditor.registerUpdateListener).toHaveBeenCalledTimes(1)
    expect(mockEditor.registerCommand).toHaveBeenCalledTimes(2)
    expect(mockEditor.registerCommand.mock.calls).toMatchObject([
      [FORMAT_TEXT_COMMAND, expect.any(Function), COMMAND_PRIORITY_CRITICAL],
      [
        SELECTION_CHANGE_COMMAND,
        expect.any(Function),
        COMMAND_PRIORITY_CRITICAL,
      ],
    ])

    // Simulate invoking the cleanup function
    cleanup()

    // Assert cleanup
    expect(mockedEditorCommandsCleanup).toHaveBeenCalledTimes(2)
  })
})
