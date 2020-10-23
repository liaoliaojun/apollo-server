import {basename} from 'path'
import request from 'request'
import {storeUpload, recordFile} from './upload'

export async function getImage (url = '') {
  const filename = basename(url)
  const stream = await request(url)
  const {id, path} = await storeUpload({stream, filename})
  return recordFile({id, filename, mimetype: '', encoding: '', path})
}
