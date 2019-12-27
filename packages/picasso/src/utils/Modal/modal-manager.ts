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
}
