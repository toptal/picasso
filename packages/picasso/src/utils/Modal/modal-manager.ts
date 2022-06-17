import { isBrowser } from '@toptal/picasso-shared'

export class ModalManager {
  modals: number[] = []
  scrollLock: { prevBodyOverflow: string } | undefined

  add(modalId: number) {
    if (this.modals.includes(modalId)) {
      return
    }

    this.modals.push(modalId)
    this.dropScrollLock()
  }

  remove(modalId: number) {
    const modalIndex = this.modals.indexOf(modalId)

    if (modalIndex === -1) {
      return
    }

    this.modals.splice(modalIndex, 1)
    this.liftScrollLock()
  }

  isTopModal(modalId: number) {
    return (
      this.modals.length > 0 && this.modals[this.modals.length - 1] === modalId
    )
  }

  private dropScrollLock() {
    if (!isBrowser()) {
      return
    }

    if (!this.scrollLock) {
      this.scrollLock = {
        prevBodyOverflow: window.getComputedStyle(document.body).overflow,
      }
      document.body.style.overflow = 'hidden'
    }
  }

  private liftScrollLock() {
    if (!isBrowser()) {
      return
    }

    if (this.scrollLock && this.modals.length === 0) {
      document.body.style.overflow = this.scrollLock.prevBodyOverflow
      this.scrollLock = undefined
    }
  }
}
