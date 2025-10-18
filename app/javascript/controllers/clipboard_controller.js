import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['source', 'icon']
  static values = { proposalId: String }

  connect() {
    const button = this.element.querySelector('button')

    this.originalButtonHTML = button.innerHTML
  }

  copy(event) {
    event.preventDefault()

    const text = this.sourceTarget.textContent

    navigator.clipboard.writeText(text).then(() => {
      this.showConfirmation()
      this.trackCopyEvent()
    })
  }

  showConfirmation() {
    const button = this.element.querySelector('button')

    button.disabled = true
    button.innerHTML = 'Copied!'

    setTimeout(() => {
      button.disabled = false
      button.innerHTML = this.originalButtonHTML
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
