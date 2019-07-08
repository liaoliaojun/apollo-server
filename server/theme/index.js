// const fs = require('fs')
// const path = require('path')
// const et = require('element-theme')

// const symbolsParser = require('scss-symbols-parser')
// const file = fs.readFileSync(path.resolve(__dirname, './element-variables.scss'), {encoding: 'utf8'})

// const fileList = symbolsParser.parseSymbols(file)
// // const {variables = [] } = fileList
// // const len = variables.length
// // let str = ''
// console.log(fileList)
// for (let i = 0; i < len; i++) {
//     const item = variables[i]
//     str += `\r\n ${item.name}:`
//     if (name)
//     // if (item.name === '$--button-small-border-radius') {
//     //     console.log(item)
//     // }
//     // if (item.name === '$--color-primary') {
//     //     str += ` red !default;`
//     // } else {
//     //     str += ` ${item.value};`
//     // }
// }

// fs.writeFile(path.resolve(__dirname, './test.scss'), str, 'utf8', function(error) {
//     if (error) {
//         console.log(error)
//         return false
//     }
//     console.log('写入成功')
// })

// et.run({
//     config: path.resolve(__dirname, './test.scss'),
//     out: 'server/theme/output',
//     minimize: true,
//     components: ['index'],
// })



const fs = require('fs')
const os = require('os')
const path = require('path')
const et = require('element-theme')

let file = fs.readFileSync(path.resolve(__dirname, './element-variables.scss'), {encoding: 'utf8'})
file = file.replace(/\/\*[\w\W]*?\*\//gm, '').replace(/\/\/.*/gi, '').split(';')

let str = ''
const len = file.length

// const sign = '$--color-primary'
export default async function (sign) {
    const signLen = sign.length

    for (let i = 0; i < len - 1; i++) {
        const item = file[i].split(':')
        const key = item[0]
        const keyLen = key.length
        const keyIndex = key.lastIndexOf(sign)
        let value = item[1]
        str += `${key}:`

        // 有‘:’的特殊情况
        for (let j = 2; j < item.length; j++) {
            value = value.concat(`:${item[j]}`)
        }

        // 核对身份
        if (keyIndex === keyLen - signLen && keyIndex !== -1) {
            str += `#234567 !default;`
        } else {
            str += `${value};`
        }
        str += os.EOL
    }

    fs.writeFile(path.resolve(__dirname, './test.scss'), str, 'utf8', function(error) {
        if (error) {
            console.log(error)
            return false
        }

        et.run({
            config: path.resolve(__dirname, './test.scss'),
            out: 'server/theme/output',
            minimize: false,
            components: [
                'input',
            ],
        })
    })
}

// for (let i = 0; i < len; i++) {
//     const item = variables[i]
//     str += `\r\n ${item.name}:`
//     if (name)
//     // if (item.name === '$--button-small-border-radius') {
//     //     console.log(item)
//     // }
//     // if (item.name === '$--color-primary') {
//     //     str += ` red !default;`
//     // } else {
//     //     str += ` ${item.value};`
//     // }
// }

// const input = fs.createReadStream(file)
// const rl = readline.createInterface({input})

// let str = ''
// rl.on('line', (line) => {
//     if (line.indexOf('$--breakpoints-spec') === 0) {
//         str += `${line}${os.EOL}` // os.EOL行换
//     }
// });
// rl.on('close', (line) => {
// fs.writeFile(path.resolve(__dirname, './test.scss'), str, 'utf8', function(error) {
//     if (error) {
//         console.log(error)
//         return false
//     }
//     console.log('写入成功')
// })
// });