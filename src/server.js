import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    await json(req, res)

    if (method) {
        routes.find(route => {
            route.method === method && route.url === url ? route.handler(req, res) : {}
        }) 
    } else {
        return res.writeHead(404).end('não encontrado')
    }
})

server.listen(3335)