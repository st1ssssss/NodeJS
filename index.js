import fs from 'fs'
import path from 'path'
import http from 'http'

const __dirname = path.resolve()
const isFile = (path) => fs.lstatSync(path).isFile()
const server = async () => {
    http.createServer((request, response) => {
        const fullPath = path.join(process.cwd(), request.url)

        if (!fs.existsSync(fullPath)) return response.end('Not found')
        if (isFile(fullPath)) { return fs.createReadStream(fullPath).pipe(response) }

        let linksList = ''

        const urlParams = request.url.match(/[\d\w\.]+/ig)

        if (urlParams) {
            urlParams.pop()
            const previousUrl = urlParams.join('/')
            linksList = urlParams.length ? `<li><a href="/${previousUrl}">..</a></li>` : `<li><a href="/">..</a></li>`
        }


        fs.readdirSync(fullPath).forEach(file => {
            const filePath = path.join(request.url, file)
            linksList += `<li><a href="${filePath}">${file}</a></li>`
        })

        const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('#links', linksList)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        return response.end(HTML)
    }).listen(3000)
}

server()