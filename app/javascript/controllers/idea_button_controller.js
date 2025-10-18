import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['button', 'buttonContent', 'spinner']

  connect() {
    this.missionInput = document.getElementById('proposal_mission')
    this.goalInput = document.getElementById('proposal_goal')
    this.generateDraftButton = document.getElementById('generate-draft-button')
  }

  start() {
    this.buttonTarget.disabled = true
    this.buttonContentTarget.classList.add('hidden')
    this.spinnerTarget.classList.remove('hidden')

    if (this.missionInput) this.missionInput.disabled = true
    if (this.goalInput) this.goalInput.disabled = true
    if (this.generateDraftButton) this.generateDraftButton.disabled = true
  }

  end() {
    this.buttonTarget.disabled = false
    this.buttonContentTarget.classList.remove('hidden')
    this.spinnerTarget.classList.add('hidden')

    if (this.missionInput) {
      this.missionInput.disabled = false
      this.missionInput.dispatchEvent(new Event('input', { bubbles: true }))
    }

    if (this.goalInput) {
      this.goalInput.disabled = false
      this.goalInput.dispatchEvent(new Event('input', { bubbles: true }))
    }

    if (this.generateDraftButton) this.generateDraftButton.disabled = false
  }
}
