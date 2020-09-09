import marka from '../src/index'

describe('match rules', () => {
  it('get default rules', () => {
    expect(marka.getDefaultRules().length).toBeGreaterThan(0)
  })

})
