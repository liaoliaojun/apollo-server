import {resolve} from 'path'
import {readFile} from 'fs'

const config: {[key: string]: any} = {}

export async function fetchConfig () {
  const filePath = resolve(__dirname, '../live/config.json')

  const args = await new Promise((resolve, reject) => {
    readFile(filePath, 'utf-8', function(err, data) {
      err ? reject(err) : resolve(data)
    })
  }).then((res) => res)
  Object.assign(config, JSON.parse(args as string))
}

export default config
