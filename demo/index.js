console.log('marka demo index')

const readmeContainer = document.getElementById('readme-container')

fetch('/README.md')
  .then(r => r.text())
  .then(readmeText => {
    const html = marked(readmeText)
    readmeContainer.innerHTML = html

    enhanceMarkdownHtml()
    highlightCode()

    initMarka()
  })

function enhanceMarkdownHtml() {
  readmeContainer.querySelectorAll('table').forEach((ele) => {
    const newContainer = document.createElement('div')
    newContainer.classList.add('markdown-body')
    ele.parentElement.insertBefore(newContainer, ele)
    ele.parentElement.removeChild(ele)
    newContainer.appendChild(ele)
  })

}

function highlightCode() {
  document.querySelectorAll('pre code').forEach(block => {
    hljs.highlightBlock(block)
  })
}

function initMarka() {
  marka.init({
    container: readmeContainer,
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
