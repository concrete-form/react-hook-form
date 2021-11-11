import get from './get'

describe('get util', () => {
  it('use dot notation to retrive object properties', () => {
    const data = { foo: { bar: { baz: 'test' } } }
    expect(get(data, 'foo.bar.baz')).toBe('test')
  })

  it('use dot notation to retrive array children', () => {
    const data = { foo: ['a', ['foo', 'bar', 'baz'], 'c'] }
    expect(get(data, 'foo[1].0')).toBe('foo')
  })

  it('returns object', () => {
    const data = { foo: { bar: { baz: 'test' } } }
    expect(get(data, 'foo.bar')).toEqual({ baz: 'test' })
  })

  it('handles properties that contains dot in their key', () => {
    const data = { 'foo.bar': 'baz' }
    expect(get(data, 'foo.bar')).toBe('baz')
  })

  it('returns default value if nothing is found', () => {
    const data = { foo: 'foo' }
    expect(get(data, 'bar', 'baz')).toEqual('baz')
  })

  it('returns undefined when no path is provided', () => {
    const data = { foo: 'bar' }
    expect(get(data, '')).toBeUndefined()
  })

  it('returns undefined when given path is not found', () => {
    const data = { foo: 'bar' }
    expect(get(data, 'foo.baz')).toBeUndefined()
  })

  it('returns undefined when given object is undefined', () => {
    expect(get(undefined, 'foo.baz')).toBeUndefined()
  })

  it('returns undefined when given object is empty', () => {
    expect(get({}, 'foo.baz')).toBeUndefined()
  })
})
