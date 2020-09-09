console.log('marka demo index')

const readmeContainer = document.getElementById('readme-container')

fetch('/README.md')
  .then(r => r.text())
  .then(readmeText => {
    const html = marked(readmeText)
    readmeContainer.innerHTML = html
    highlightCode()

    initMarka()
  })

function highlightCode() {
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightBlock(block)
  })
}

function initMarka() {
  marka.init({
    imageBaseDir: '/dist/images',
    extraRules: [
      {
        type: 'miniflux',
        hostPattern: /miniflux\.app/,
        imagePath: 'https://raw.githubusercontent.com/miniflux/logo/master/icon.svg'
      }
    ]
  })
}
