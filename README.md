# marka-js

![](https://badgen.net/badgesize/normal/https/unpkg.com/marka-js/dist/marka-js.es5.js)
![](https://badgen.net/jsdelivr/v/npm/marka-js)

Marka is a JavaScript lib that runs in the browser, it will mark anchor elements and add icons according to the href. It is inspired by [https://beepb00p.xyz](https://beepb00p.xyz) and [anchorjs](https://github.com/bryanbraun/anchorjs).

See the [demo on vercel](https://marka-js.vercel.app/).

It has some pre-defined recognized sites as below.

- [github.com](https://github.com/)
- [wikipedia.org](https://en.wikipedia.org/)
- [youtube.com](https://youtube.com/)
- [facebook.com](https://facebook.com/)
- [google.com](https://google.com/)
- [twitter.com](https://twitter.com/)
- [medium.com](https://medium.com/)
- [zhihu.com](https://zhihu.com/)
- [douban.com](https://douban.com/)
- [music.163.com](https://music.163.com/)

 You can also add your own rules, see the [#Usage](#usage) section.

## Install

Import style and script to your html:

```html
<link rel="stylesheet" href="https://unpkg.com/marka-js@latest/dist/marka.css" />

<script src="https://unpkg.com/marka-js@latest/dist/marka-js.umd.js"></script>
```

You can also add an `onload` callback as below and marka will inspect default `imageBaseDir` by script's src.

```html
<script src="https://unpkg.com/marka-js@latest/dist/marka-js.umd.js" onload="marka.onScriptLoaded(this)"></script>
```

## Usage

### marka.init(MarkaOptions)

example:

```js
window.addEventListener('DOMContentLoaded', function() {
  marka.init({
    container: 'body',
    imageBaseDir: 'https://unpkg.com/marka-js@latest/dist/images',
    extraRules: [
      { type: 'miniflux', hostPattern: /miniflux\.app/, imagePath: 'https://raw.githubusercontent.com/miniflux/logo/master/icon.svg' },
    ]
  })
})
```

#### MarkaOptions:

All fields are optional.

| Name      | Type   | Description                                                              |
|-----------|--------|----------------------------------------------------------------------------|
| container | `string` or `HTMLElement` | marka container, marking will only affect elements inside it |
| imageBaseDir | `string` | Base directory for images, default is `./images` |
| ignore | `(ele: Element, rule: MarkaRule): boolean` | If returned `true`, the element will be ignored |
| rules | `MarkaRule[]` | rules used to match anchor elements |
| extraRules | `MarkaRule[]` | extra rules besides default rules |

#### MarkaRule

A rule for matching and generating css rule for anchor elements.

```ts
type MarkaRule = {
  /** a regex pattern to match against url host */
  hostPattern: RegExp
  /** will affect generated css selector, e.g. 'github'/'twitter' */
  type: string
  /** the url of image, e.g. 'https://unpkg.com/marka-js@0.1.0/dist/images/github.svg' */
  imagePath?: string
}
```

### Customize styles

Override css variables:

```css
body {
  --marka-link-color: purple;
}
```
