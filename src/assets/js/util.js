export function shuffle (source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(arr.length)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt (max) {
  return Math.floor(Math.random() * max)
}

function swap (arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime (inertval) {
  inertval = inertval | 0
  const minute = ((inertval / 60 | 0) + '').padStart(2, '0')
  const second = (inertval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}
