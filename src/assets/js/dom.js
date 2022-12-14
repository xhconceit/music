export function removeClass (el, className) {
  el.classList.remove(className)
}

export function addClass (el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}
