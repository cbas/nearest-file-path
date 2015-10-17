/* eslint-env node, mocha */
import nearest from '../lib'
import { join } from 'path'
import { expect } from 'chai'

describe('nearest()', () => {
  const path = join(__dirname, 'a/b/c/d')

  it('finds the nearest file', () =>
    expect(nearest('a.txt', path))
      .to.eventually.equal(join(__dirname, 'a/a.txt'))
  )
  it('finds the nearest directory', () =>
    expect(nearest('a', path))
      .to.eventually.equal(join(__dirname, 'a'))
  )
  it('finds the nearest relative path', () =>
    expect(nearest('./a.txt', path))
      .to.eventually.equal(join(__dirname, 'a/a.txt'))
  )
  it('finds the nearest relative sub-path', () =>
    expect(nearest('a/a.txt', path))
      .to.eventually.equal(join(__dirname, 'a/a.txt'))
  )
  it('returns the deepest match', () =>
    expect(nearest('dupe.txt', path))
      .to.eventually.equal(join(__dirname, 'a/b/c/dupe.txt'))
  )
  it('blows up when no path is specified', () =>
    expect(nearest(undefined, path))
      .to.eventually.be.rejectedWith(Error)
  )
  it('searches the current working directory by default', () =>
    expect(nearest('package.json'))
      .to.eventually.equal(join(__dirname, '..', 'package.json'))
  )
})
