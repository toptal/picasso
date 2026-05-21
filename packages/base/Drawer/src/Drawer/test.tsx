import React from 'react'
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import { render, cleanup } from '@toptal/picasso-test-utils'
import { Modal } from '@toptal/picasso-modal'
import { defaultModalManager } from '@toptal/picasso-utils'

import Drawer from './Drawer'

describe('Drawer', () => {
  afterEach(() => {
    cleanup()
    defaultModalManager.reset()
  })

  it('renders without crashing', () => {
    const { baseElement } = render(<Drawer open>content</Drawer>)

    expect(baseElement).toBeInTheDocument()
  })

  describe('overlay registration', () => {
    it('registers with defaultModalManager when open', () => {
      render(<Drawer open>content</Drawer>)
      expect(defaultModalManager.modals).toHaveLength(1)
    })

    it('does not register when closed', () => {
      render(<Drawer open={false}>content</Drawer>)
      expect(defaultModalManager.modals).toHaveLength(0)
    })

    it('removes itself from defaultModalManager on unmount', () => {
      const { unmount } = render(<Drawer open>content</Drawer>)

      expect(defaultModalManager.modals).toHaveLength(1)
      unmount()
      expect(defaultModalManager.modals).toHaveLength(0)
    })

    it('updates registration when open prop toggles', () => {
      const { rerender } = render(<Drawer open>content</Drawer>)

      expect(defaultModalManager.modals).toHaveLength(1)

      rerender(<Drawer open={false}>content</Drawer>)
      expect(defaultModalManager.modals).toHaveLength(0)

      rerender(<Drawer open>content</Drawer>)
      expect(defaultModalManager.modals).toHaveLength(1)
    })
  })

  // ER-49165: Picasso Modal uses a custom document focus listener (because it
  // sets disableEnforceFocus on MUI's Modal) while Drawer relies on MUI's
  // FocusTrap. With both active, the two focus mechanisms recursed on
  // Element.focus() and raised "Maximum call stack size exceeded".
  describe('when nested inside a Picasso Modal (ER-49165)', () => {
    it('takes over as topmost overlay in the shared manager', () => {
      // Mount Modal first so its id is unambiguous in the manager — relying
      // on the stack position after a simultaneous mount of both would be
      // fragile against MUI's internal mount lifecycle.
      const { rerender } = render(<Modal open>modal content</Modal>)
      const modalId = defaultModalManager.modals[0]

      expect(defaultModalManager.isTopModal(modalId)).toBe(true)

      rerender(
        <Modal open>
          <Drawer open>drawer content</Drawer>
        </Modal>
      )

      // Modal stayed mounted, only Drawer fired its add, so the stack is
      // [modalId, drawerId] with the Drawer on top.
      expect(defaultModalManager.modals).toHaveLength(2)
      expect(defaultModalManager.modals[0]).toBe(modalId)
      const drawerId = defaultModalManager.modals[1]

      expect(defaultModalManager.isTopModal(drawerId)).toBe(true)
      expect(defaultModalManager.isTopModal(modalId)).toBe(false)
    })

    it('makes the Modal listener bail out on document focus events', () => {
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus')
      // Spying on isTopModal lets us prove the Modal listener actually ran —
      // without this, a harness regression (e.g. the listener not attached or
      // the synthetic event not reaching it) would silently pass the
      // negative .focus() assertion below.
      const isTopModalSpy = jest.spyOn(defaultModalManager, 'isTopModal')

      render(
        <Modal open>
          <input data-testid='modal-input' />
          <Drawer open>
            <input data-testid='drawer-input' />
          </Drawer>
        </Modal>
      )

      // Discard focus calls fired during mount (auto-focus, MUI FocusTrap).
      focusSpy.mockClear()
      isTopModalSpy.mockClear()

      // Re-fire the document focus listener path that previously recursed.
      document.dispatchEvent(new FocusEvent('focus', { bubbles: true }))

      // Proof the Modal listener actually fired and queried the manager.
      // isTopModal is only called from inside Modal's focus handler, so a
      // call here means the handler ran end-to-end up to the bailout check.
      expect(isTopModalSpy).toHaveBeenCalled()
      // And at least one of those calls returned false (the Modal's own id,
      // since Drawer is on top), exercising the bailout branch.
      expect(isTopModalSpy.mock.results.map(result => result.value)).toContain(
        false
      )

      // With the bailout taken, Modal's handler does not invoke
      // focusFirstFocusableElement, so no .focus() calls originate from it.
      expect(focusSpy).not.toHaveBeenCalled()

      focusSpy.mockRestore()
      isTopModalSpy.mockRestore()
    })

    it('restores Modal as topmost when the Drawer closes', () => {
      const { rerender } = render(<Modal open>modal content</Modal>)
      const modalId = defaultModalManager.modals[0]

      rerender(
        <Modal open>
          <Drawer open>drawer content</Drawer>
        </Modal>
      )

      expect(defaultModalManager.isTopModal(modalId)).toBe(false)

      rerender(
        <Modal open>
          <Drawer open={false}>drawer content</Drawer>
        </Modal>
      )

      expect(defaultModalManager.modals).toHaveLength(1)
      expect(defaultModalManager.isTopModal(modalId)).toBe(true)
    })
  })
})
