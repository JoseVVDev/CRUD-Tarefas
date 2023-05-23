import http from 'node:http'

const server = http.createServer((req, res) => {
    return res.end('completo')
})

server.listen(3335)