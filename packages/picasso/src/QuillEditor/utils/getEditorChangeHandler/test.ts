import { act } from '@toptal/picasso/test-utils'
import Quill from 'quill'
import Delta from 'quill-delta'

import getEditorChangeHandler from './getEditorChangeHandler'

const deltaMock = new Delta().insert('foo')

describe('getEditorChangeHandler', () => {
  describe('text-change event', () => {
    describe('when source is silent', () => {
      it('does nothing', () => {
        const quill = {
          getFormat: jest.fn(() => ({})),
        } as unknown as Quill
        const onSelectionChange = jest.fn()

        const handler = getEditorChangeHandler(quill, onSelectionChange)

        act(() => handler('text-change', deltaMock, deltaMock, 'silent'))

        expect(quill.getFormat).not.toHaveBeenCalled()
        expect(onSelectionChange).not.toHaveBeenCalled()
      })
    })
    describe('when source is api', () => {
      it('calls the callback with quill format', () => {
        const quill = {
          getFormat: jest.fn(() => ({})),
        } as unknown as Quill
        const onSelectionChange = jest.fn()

        const handler = getEditorChangeHandler(quill, onSelectionChange)

        act(() => handler('text-change', deltaMock, deltaMock, 'api'))

        expect(quill.getFormat).toHaveBeenCalled()
        expect(onSelectionChange).toHaveBeenCalledWith({})
      })
    })
    describe('when source is user', () => {
      describe('when quill removes header format', () => {
        it('calls the callback with quill format', () => {
          const quill = {
            getFormat: jest.fn(() => ({})),
          } as unknown as Quill
          const onSelectionChange = jest.fn()

          const handler = getEditorChangeHandler(quill, onSelectionChange)

          act(() =>
            handler(
              'text-change',
              new Delta([{ attributes: { header: null } }]),
              deltaMock,
              'user'
            )
          )

          expect(quill.getFormat).toHaveBeenCalled()
          expect(onSelectionChange).toHaveBeenCalledWith({})
        })
      })
      describe('when it is usual text change', () => {
        it('does nothing', () => {
          const quill = {
            getFormat: jest.fn(() => ({})),
          } as unknown as Quill
          const onSelectionChange = jest.fn()

          const handler = getEditorChangeHandler(quill, onSelectionChange)

          act(() => handler('text-change', deltaMock, deltaMock, 'user'))

          expect(quill.getFormat).not.toHaveBeenCalled()
          expect(onSelectionChange).not.toHaveBeenCalled()
        })
      })
    })
  })
})
