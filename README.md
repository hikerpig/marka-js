# marka.js

Marka is a JavaScript lib that runs in the browser, it will mark anchor elements and add icons according to the href. It is inspired by [https://beepb00p.xyz](https://beepb00p.xyz) and [anchorjs](https://github.com/bryanbraun/anchorjs).

Recognized sites:

- [github.com](https://github.com/)
- [wikipedia.org](https://en.wikipedia.org/)
- [youtube.com](https://youtube.com/)
- [facebook.com](https://facebook.com/)
- [google.com](https://google.com/)
- [twitter.com](https://twitter.com/)
- [zhihu.com](https://zhihu.com/)
- [douban.com](https://douban.com/)
- [music.163.com](https://music.163.com/)

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

### Customize styles

Override css variables:

```css
body {
  --marka-link-color: purple;
}
```