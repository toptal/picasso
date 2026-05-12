export class ModalManager {
  modals: number[] = []

  add(modalId: number) {
    if (this.modals.includes(modalId)) {
      return
    }

    this.modals.push(modalId)
  }

  remove(modalId: number) {
    const modalIndex = this.modals.indexOf(modalId)

    if (modalIndex === -1) {
      return
    }

    this.modals.splice(modalIndex, 1)
  }

  isTopModal(modalId: number) {
    return (
      this.modals.length > 0 && this.modals[this.modals.length - 1] === modalId
    )
  }

  /** @internal Test-only helper to reset state between specs. */
  reset() {
    this.modals.length = 0
  }
}

// Shared across Picasso overlay components (Modal, Drawer) so the topmost
// overlay's focus mechanism wins and nested overlays don't fight each other.
// See: https://toptal-core.atlassian.net/browse/ER-49165
export const defaultModalManager = new ModalManager()

let modalIdCounter = 0

export const generateModalId = () => ++modalIdCounter
