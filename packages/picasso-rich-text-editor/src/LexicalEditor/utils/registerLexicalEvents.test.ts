import { mergeRegister } from '@lexical/utils'
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical'

import { registerLexicalEvents } from './registerLexicalEvents'
import type { LexicalRegisterParams } from './registerLexicalEvents'

jest.mock('@lexical/utils', () => ({
  mergeRegister: jest.fn(),
}))

const mockDispatch = jest.fn()
const mockUpdateToolbar = jest.fn()
const mockMergeRegister = mergeRegister as jest.MockedFunction<
  typeof mergeRegister
>
const mockedEditorListenerCleanup = jest.fn()
const mockedEditorCommandsCleanup = jest.fn()

describe('registerLexicalEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('registers listeners and commands correctly and return a cleanup function', () => {
    const mockEditor = {
      registerEditableListener: jest.fn().mockReturnValueOnce(() => {}),
      registerUpdateListener: jest.fn().mockReturnValueOnce(() => {}),
      registerCommand: jest
        .fn()
        .mockReturnValueOnce(mockedEditorCommandsCleanup),
    }
    const mockActiveEditor = {
      registerUpdateListener: jest.fn().mockReturnValueOnce(() => {}),
    }

    mockMergeRegister
      .mockImplementation(() => () => {
        mockEditor.registerEditableListener()
        mockActiveEditor.registerUpdateListener()
      })
      .mockReturnValueOnce(mockedEditorListenerCleanup)

    const params = {
      editor: mockEditor,
      activeEditor: mockActiveEditor,
      updateToolbar: mockUpdateToolbar,
      dispatch: mockDispatch,
    }

    const cleanup = registerLexicalEvents(
      params as unknown as LexicalRegisterParams
    )

    expect(mockEditor.registerEditableListener).toHaveBeenCalledTimes(1)
    expect(mockActiveEditor.registerUpdateListener).toHaveBeenCalledTimes(1)
    expect(mockEditor.registerCommand).toHaveBeenCalledTimes(1)
    expect(mockEditor.registerCommand).toHaveBeenCalledWith(
      SELECTION_CHANGE_COMMAND,
      expect.any(Function),
      COMMAND_PRIORITY_CRITICAL
    )
    expect(mergeRegister).toHaveBeenCalledTimes(1)

    // Simulate invoking the cleanup function
    cleanup()

    // Assert cleanup
    expect(mockedEditorCommandsCleanup).toHaveBeenCalledTimes(1)
    expect(mockedEditorListenerCleanup).toHaveBeenCalledTimes(1)
  })
})
