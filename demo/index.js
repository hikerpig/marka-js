console.log('marka demo index')

marka.init({
  imageBaseDir: '/dist/images',
  extraRules: [
    { type: 'miniflux', hostPattern: /miniflux\.app/, imagePath: 'https://raw.githubusercontent.com/miniflux/logo/master/icon.svg' }
  ],
})
