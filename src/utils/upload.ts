import {createWriteStream} from 'fs'
import {resolve, basename} from 'path'
import {generate} from 'shortid'
import {db} from '../db/'
import request from 'request'

const uploadDir = resolve(__dirname, '../../live/uploads')

// Ensure upload directory exists
export async function storeUpload ({stream, filename}): Promise<{id: string, path: string}> {
  const id = generate()
  const file = `${id}-${filename}`
  const path = `${uploadDir}/${file}`
  const urlPath = `files/${file}`

  return new Promise((resolve, reject) => {
    return stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path: urlPath }))
      .on('error', reject)
  })
}

export const recordFile = file => {
  return db
    .get('uploads')
    .push(file)
    .last()
    .write()
}

export async function processUpload (file) {
  const {stream, filename, mimetype, encoding} = await file
  const {id, path} = await storeUpload({stream, filename})
  return recordFile({id, filename, mimetype, encoding, path})
}


export async function getImage (url: string) {
  if (!url) return new Error ('getImage no first params')
  const filename = basename(url)
  const stream = await request(url)
  const {id, path} = await storeUpload({stream, filename})
  return recordFile({id, filename, mimetype: '', encoding: '', path})
}
