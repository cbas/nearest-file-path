import { promisify } from 'bluebird'
import { join, dirname } from 'path'
import { stat, statSync } from 'fs'

export default async function nearest (subpath, basepath = process.cwd()) {
  if (subpath === undefined) throw Error('Must specify a relative path to match')
  if (basepath === '') throw Error('Subpath not found')
  const filepath = join(basepath, subpath)
  try {
    await promisify(stat)(filepath)
    return filepath
  } catch (error) {
    const nextpath = dirname(basepath)
    return await nearest(subpath, nextpath === basepath ? '' : nextpath)
  }
}

export function nearestSync (subpath, basepath = process.cwd()) {
  if (subpath === undefined) throw Error('Must specify a relative path to match')
  if (basepath === '') throw Error('Subpath not found')
  const filepath = join(basepath, subpath)
  try {
    statSync(filepath)
    return filepath
  } catch (error) {
    const nextpath = dirname(basepath)
    return nearestSync(subpath, nextpath === basepath ? '' : nextpath)
  }
}
