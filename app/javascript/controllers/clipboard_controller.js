import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['source', 'icon']
  static values = { proposalId: String }

  connect() {
    this.buttonStates = new Map()
  }

  copy(event) {
    event.preventDefault()

    const button = event.currentTarget
    const text = this.sourceTarget.textContent

    if (!this.buttonStates.has(button)) {
      this.buttonStates.set(button, button.innerHTML)
    }

    navigator.clipboard.writeText(text).then(() => {
      this.showConfirmation(button)
      this.trackCopyEvent()
    })
  }

  showConfirmation(button) {
    const originalHTML = this.buttonStates.get(button)

    button.disabled = true
    button.innerHTML = 'Copied!'

    setTimeout(() => {
      button.disabled = false
      button.innerHTML = originalHTML
    }, 2000)
  }

  trackCopyEvent() {
    const proposalId = this.proposalIdValue
    const csrfToken = document.querySelector("[name='csrf-token']").content

    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        proposal_id: proposalId,
        event: { name: 'draft_copied' }
      })
    })
  }
}
