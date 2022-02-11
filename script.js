import { Server } from 'socket.io'
import http from 'http'
import path from 'path'
import fs from 'fs'

const __dirname = path.resolve()
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const filePath = path.join(__dirname, 'index.html')
        const readStream = fs.createReadStream(filePath)

        readStream.pipe(res)
    } else if (req.method === 'POST') {
        let data = ''

        req.on('data', chunk => {
            data += chunk
        })

        req.on('end', () => {
            const parsedData = JSON.parse(data)
            console.log(data)
            res.writeHead(200, { 'Content-Type': 'json' })
            res.end(data)
        })
    } else {
        res.statusCode = 405
        res.end()
    }
})

const socket = new Server(server)

socket.on('connection', (client) => {
    let randomNick = `visitor#${Math.floor(Math.random() * 1000)}`

    client.broadcast.emit('SERVER_MSG', { msg: 'Welcome to the chatroom!', name: randomNick })
    console.log(`Hello ${randomNick}`)


    client.on('CLIENT_MSG', (data) => {
        socket.emit('SERVER_MSG', {
            msg: data.msg,
            name: randomNick

        })
    })
    client.on('disconnect', () => {
        console.log(`Bye ${randomNick}`)
        clientCount--
        client.broadcast.emit('SERVER_MSG', {
            msg: 'See you soon!',
            name: randomNick,

        })
    })
})


server.listen(8888)