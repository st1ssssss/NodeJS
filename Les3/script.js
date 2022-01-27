import fs from 'fs'
import readline from 'readline'

const regIp1 = /89.123.1.41/g
const regIp2 = /34.48.240.111/g

const readStream = fs.createReadStream('./access.log', 'utf8')
const rl = readline.createInterface({
    input: readStream
})
const writeStreamIp1 = fs.createWriteStream('./%89.123.1.41%_requests.log', {
    flags: 'a',
    encoding: 'utf8'
})
const writeStreamIp2 = fs.createWriteStream('./%34.48.240.111%_requests.log', {
    flags: 'a',
    encoding: 'utf8'
})

rl.on('line', (line) => {
    if (regIp1.test(line)) writeStreamIp1.write(`${line} \r\n`)
    else if (regIp2.test(line)) writeStreamIp2.write(`${line} \r\n`)
})

