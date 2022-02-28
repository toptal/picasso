import { act } from '@toptal/picasso/test-utils'
import Quill from 'quill'
import Delta from 'quill-delta'

import getCleanupOnAllContentRemovalHandler from './getCleanupOnAllContentRemovalHandler'

describe('getCleanupOnAllContentRemovalHandler', () => {
  it('does nothing when not delete operation', () => {
    const quill = ({
      getLength: jest.fn()
    } as unknown) as Quill

    const handler = getCleanupOnAllContentRemovalHandler(quill)

    act(() => handler(new Delta().insert('foo'), new Delta(), 'user'))

    expect(quill.getLength).not.toHaveBeenCalled()
  })
  it('does nothing when all text is not removed', () => {
    const quill = ({
      getLength: jest.fn(() => 10),
      getFormat: jest.fn()
    } as unknown) as Quill

    const handler = getCleanupOnAllContentRemovalHandler(quill)

    act(() => handler(new Delta().delete(5), new Delta(), 'user'))

    expect(quill.getLength).toHaveBeenCalled()
    expect(quill.getFormat).not.toHaveBeenCalled()
  })
  it('does nothing when no format is applied after removal', () => {
    const quill = ({
      getLength: jest.fn(() => 1),
      getFormat: jest.fn(() => ({})),
      setContents: jest.fn()
    } as unknown) as Quill

    const handler = getCleanupOnAllContentRemovalHandler(quill)

    act(() => handler(new Delta().delete(5), new Delta(), 'user'))

    expect(quill.getLength).toHaveBeenCalled()
    expect(quill.getFormat).toHaveBeenCalled()
    expect(quill.setContents).not.toHaveBeenCalled()
  })
  it('cleans up the content', () => {
    const quill = ({
      getLength: jest.fn(() => 1),
      getFormat: jest.fn(() => ({ list: 'bullet' })),
      setContents: jest.fn()
    } as unknown) as Quill

    const handler = getCleanupOnAllContentRemovalHandler(quill)

    act(() => handler(new Delta().delete(5), new Delta(), 'user'))

    expect(quill.getLength).toHaveBeenCalled()
    expect(quill.getFormat).toHaveBeenCalled()
    expect(quill.setContents).toHaveBeenCalled()
  })
})
