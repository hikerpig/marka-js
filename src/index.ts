import './marka.less'

type MarkaOptions = {
  container?: string | HTMLElement
  imageBaseDir?: string
  extraRules?: MarkaRule[]
  ignore?(ele: Element | HTMLElement, rule: MarkaRule): boolean
}

const defaultOptions: MarkaOptions = {
  container: 'body'
}

const CLASSES = {
  container: 'marka-container',
  link: 'marka-link'
}

type MarkaRule = {
  hostPattern: RegExp
  type: string
  imagePath?: string
}

const RULES = [
  { hostPattern: /github.com$/, type: 'github' },
  { hostPattern: /wikipedia.org$/, type: 'wikipedia' },
  { hostPattern: /youtube.com$/, type: 'youtube' },
  { hostPattern: /facebook.com$/, type: 'facebook' },
  { hostPattern: /google.com$/, type: 'google' },
  { hostPattern: /twitter.com$/, type: 'twitter' },
  { hostPattern: /zhihu.com$/, type: 'zhihu' },
  { hostPattern: /douban.com$/, type: 'douban' },
  { hostPattern: /music.163.com$/, type: 'yunyinyue' }
]

let markaStyleElement: HTMLStyleElement | null
const MARKA_STYLE_ID = 'marka-style'

function init(rawOpts: MarkaOptions) {
  const opts = Object.assign({}, defaultOptions, rawOpts)
  const rules = RULES.slice()
  if (rawOpts.extraRules) {
    rawOpts.extraRules.forEach(rule => rules.push(rule))
  }

  const container =
    opts.container instanceof HTMLElement
      ? opts.container
      : document.querySelector(opts.container as string)
  if (container) {
    container.classList.add(CLASSES.container)
  }
  if (!container) {
    console.warn('[marka] no container found')
    return
  }

  if (!markaStyleElement) {
    markaStyleElement = document.createElement('style')
    markaStyleElement.id = MARKA_STYLE_ID
    document.body.appendChild(markaStyleElement)
  }

  const ignoreFn = opts.ignore || ((ele: any) => false)
  const elements = container.querySelectorAll('a[href]')
  elements.forEach(ele => {
    const href = ele.getAttribute('href')
    if (!href) return
    const result = processUrlByRules(href, rules)
    if (result.type && result.rule) {
      if (ignoreFn(ele, result.rule)) return
      ele.classList.add(CLASSES.link)
      const linkClass = `marka-link--${result.type}`
      ele.classList.add(linkClass)
      const cssString = generateRuleCss({
        rule: result.rule,
        selector: `.${linkClass}`,
        imageBaseDir: opts.imageBaseDir
      })
      markaStyleElement ? markaStyleElement.append(cssString) : null
    }
  })
}

function generateRuleCss(opts: { rule: MarkaRule; selector: string; imageBaseDir?: string }) {
  const { rule, selector } = opts
  const imageBaseDir = opts.imageBaseDir || './image'
  const imagePath = rule.imagePath || `${imageBaseDir}/${rule.type}.svg`
  const cssString = `${selector}::after {
  -webkit-mask-image: url('${imagePath}');
}`
  return cssString
}

function processUrlByRules(url: string, rules: MarkaRule[]) {
  let type = ''
  let matchedRule = null
  const urlObj = new URL(url)
  for (const rule of rules) {
    if (rule.hostPattern.test(urlObj.host)) {
      type = rule.type
      matchedRule = rule
      break
    }
  }

  return {
    type,
    rule: matchedRule
  }
}

const marka = {
  init,
  dispose() {
    if (markaStyleElement) {
      markaStyleElement.parentElement?.removeChild(markaStyleElement)
      markaStyleElement = null
    }
  }
}

export default marka
