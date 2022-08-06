import AsyncScheme from '../dist/index'


describe('AsyncScheme', () => {
  test('addKey', () => {
    const asyncScheme = new AsyncScheme()
    expect(() => asyncScheme.addKey('key')).not.toThrow()
    expect(() => asyncScheme.addKey('key')).toThrow()
  })

  test('setKeyValue', () => {
    const asyncScheme = new AsyncScheme()
    asyncScheme.addKey('existKey')
    expect(() => asyncScheme.setKeyValue('noExistKey', 1)).toThrow('【setKeyValue】：该 key: noExistKey 没有注册，请检查 key 值')
    expect(() => asyncScheme.setKeyValue('existKey', 1)).not.toThrow()
  })
  
})