import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    setTimeout(() => {
      this.dismiss()
    }, 4000)
  }

  dismiss() {
    this.element.classList.add('animate-fade-out-down', 'animation-forwards')

    setTimeout(() => {
      this.element.remove()
    }, 300)
  }
}
