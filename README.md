# marka.js

Marka will mark anchor elements and add icons according to the href. It is inspired by [https://beepb00p.xyz](https://beepb00p.xyz).

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

## Usage

### marka.init(MarkaOptions)

example:

```
marka.init({
  container: 'body',
})
```

#### MarkaOptions:

All fields are optional.

| Name      | Type   | Description                                                              |
|-----------|--------|----------------------------------------------------------------------------|
| container | `string | HTMLElement` | marka container, marking will only affect elements inside it |
| imageBaseDir | `string` | Base directory for images, default is `./images` |
| ignore | `(ele: Element | HTMLElement, rule: MarkaRule): boolean` | If returned `true`, the element will be ignored |
