/* eslint-env node, mocha */
import { nearestSync } from '../lib'
import { join } from 'path'
import { expect } from 'chai'

const path = join(__dirname, 'a/b/c/d')

describe('nearestSync()', () => {
  it('finds the nearest file', () =>
    expect(nearestSync('a.txt', path))
      .to.equal(join(__dirname, 'a/a.txt'))
  )
  it('finds the nearest directory', () =>
    expect(nearestSync('a', path))
      .to.equal(join(__dirname, 'a'))
  )
  it('finds the nearest relative path', () =>
    expect(nearestSync('./a.txt', path))
      .to.equal(join(__dirname, 'a/a.txt'))
  )
  it('finds the nearest relative sub-path', () =>
    expect(nearestSync('a/a.txt', path))
      .to.equal(join(__dirname, 'a/a.txt'))
  )
  it('returns the deepest match', () =>
    expect(nearestSync('dupe.txt', path))
      .to.equal(join(__dirname, 'a/b/c/dupe.txt'))
  )
  it('blows up when no path is specified', () =>
    expect(() => nearestSync(undefined, path))
      .to.throw(Error)
  )
  it('searches the current working directory by default', () =>
    expect(nearestSync('package.json'))
      .to.equal(join(__dirname, '..', 'package.json'))
  )
})
