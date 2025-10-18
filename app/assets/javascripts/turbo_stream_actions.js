// Access StreamActions from the global Turbo object
Turbo.StreamActions.reload = function () {
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}
