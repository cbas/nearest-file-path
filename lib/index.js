import { promisify } from 'bluebird'
import { join, dirname } from 'path'
import { stat } from 'fs'

export default async function find (subpath, basepath = process.cwd()) {
  if (subpath === undefined) throw Error('Must specify a relative path to match')
  if (basepath === '') throw Error('Subpath not found')
  const filepath = join(basepath, subpath)
  try {
    await promisify(stat)(filepath)
    return filepath
  } catch (error) {
    const nextpath = dirname(basepath)
    return await find(subpath, nextpath === basepath ? '' : nextpath)
  }
}
