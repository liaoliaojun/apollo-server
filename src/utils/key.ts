import {createHash} from 'crypto'
import config from '../config'

const encrypted = (key) => {
  return createHash('md5').update(key).update('liaoliaojun').digest('hex')
}

export default function (key) {
  return encrypted(config.password) === encrypted(key)
}
