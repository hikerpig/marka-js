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

const RULES: MarkaRule[] = [
  { hostPattern: /github.com$/, type: 'github' },
  { hostPattern: /wikipedia.org$/, type: 'wikipedia' },
  { hostPattern: /wikiwand.org$/, type: 'wikipedia' },
  { hostPattern: /youtube.com$/, type: 'youtube' },
  { hostPattern: /facebook.com$/, type: 'facebook' },
  { hostPattern: /google.com$/, type: 'google' },
  { hostPattern: /twitter.com$/, type: 'twitter' },
  { hostPattern: /medium.com$/, type: 'medium' },
  { hostPattern: /zhihu.com$/, type: 'zhihu' },
  { hostPattern: /douban.com$/, type: 'douban' },
  { hostPattern: /music.163.com$/, type: 'yunyinyue' }
]

let markaStyleElement: HTMLStyleElement | null
const MARKA_STYLE_ID = 'marka-style'
// avoid duplicate rules
const markaStyleMap = new Map<string, string[]>()

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
      const { selectorText, identifier, cssString } = generateRuleCss({
        rule: result.rule,
        selector: `.${linkClass}`,
        imageBaseDir: opts.imageBaseDir
      })
      if (markaStyleElement) {
        const oldIdentifiers = markaStyleMap.get(selectorText) || []
        if (!oldIdentifiers.includes(identifier)) {
          oldIdentifiers.push(identifier)
          markaStyleMap.set(selectorText, oldIdentifiers)
          markaStyleElement.append(cssString)
        }
      }
    }
  })
}

function generateRuleCss(opts: { rule: MarkaRule; selector: string; imageBaseDir?: string }) {
  const { rule, selector } = opts
  const imageBaseDir = opts.imageBaseDir || './image'
  const imagePath = rule.imagePath || `${imageBaseDir}/${rule.type}.svg`
  const selectorText = `${selector}::after`
  const identifier = `${selector}_${imagePath}`
  const cssString = `${selectorText} {
  mask-image: url('${imagePath}');
  -webkit-mask-image: url('${imagePath}');
}`
  return { cssString, selectorText, identifier }
}

function processUrlByRules(url: string, rules: MarkaRule[]) {
  let type = ''
  let matchedRule = null

  try {
    const urlObj = new URL(url)
    for (const rule of rules) {
      if (rule.hostPattern.test(urlObj.host)) {
        type = rule.type
        matchedRule = rule
        break
      }
    }
  } catch (error) {
    console.info('[marka] error', error)
  }

  return {
    type,
    rule: matchedRule
  }
}

const marka = {
  init,
  getDefaultRules() {
    return RULES
  },
  onScriptLoaded(ele: HTMLScriptElement) {
    const src = ele.getAttribute('src')
    if (!defaultOptions.imageBaseDir) {
      try {
        const urlObj = new URL(src as string)
        const pathSegs = urlObj.pathname.split('/')
        const imagesDirPath = pathSegs
          .slice(0, -1)
          .concat(['images'])
          .join('/')
        defaultOptions.imageBaseDir = `${urlObj.protocol}//${urlObj.host}/${imagesDirPath}`
      } catch (error) {
        // do nothing
        console.debug(error)
      }
    }
  },
  dispose() {
    if (markaStyleElement) {
      markaStyleElement.parentElement?.removeChild(markaStyleElement)
      markaStyleElement = null
      markaStyleMap.clear()
    }
  }
}

export default marka
