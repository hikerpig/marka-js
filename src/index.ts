type MarkaOptions = {
  container?: string | HTMLElement
}

const defaultOptions: MarkaOptions = {
  container: 'body'
}

const CLASSES = {
  container: 'marka-container'
}

function init(rawOpts: MarkaOptions) {
  const opts = Object.assign({}, defaultOptions, rawOpts)

  const container =
    opts.container instanceof HTMLElement
      ? opts.container
      : document.querySelector(opts.container as string)
  if (container) {
    container.classList.add(CLASSES.container)
  }
}

const marka = {
  init
}

export default marka
