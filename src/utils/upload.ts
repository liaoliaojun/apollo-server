import {createWriteStream} from 'fs'
import {resolve} from 'path'
import {generate} from 'shortid'
import {db} from '../db/'

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
