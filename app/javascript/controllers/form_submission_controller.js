import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['submitButton', 'missionInput', 'goalInput']

  connect() {
    this.originalButtonHTML = this.submitButtonTarget.innerHTML
    this.ideaButton = document.getElementById('idea-button')

    this.validateForm()
  }

  start() {
    this.submitButtonTarget.disabled = true
    this.submitButtonTarget.innerHTML = `
      Generating...
      <svg class="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `
    this.missionInputTarget.disabled = true
    this.goalInputTarget.disabled = true

    if (this.ideaButton) {
      this.ideaButton.disabled = true
    }
  }

  end() {
    this.submitButtonTarget.disabled = false
    this.submitButtonTarget.innerHTML = this.originalButtonHTML
    this.missionInputTarget.disabled = false
    this.goalInputTarget.disabled = false

    if (this.ideaButton) {
      this.ideaButton.disabled = false
    }
  }

  validateForm() {
    const missionPopulated = this.missionInputTarget.value.trim() !== ''
    const goalPopulated = this.goalInputTarget.value.trim() !== ''

    this.submitButtonTarget.disabled = !(missionPopulated && goalPopulated)
  }
}
