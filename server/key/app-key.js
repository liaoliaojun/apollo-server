import {createHash} from 'crypto'

const PASSWORD_MD5 = 'f40a80dc6e7aa63c2ade7f06eee4c088'

export default function (key) {
  return createHash('md5').update(key).update('liaoliaojun').digest('hex') === PASSWORD_MD5
}
