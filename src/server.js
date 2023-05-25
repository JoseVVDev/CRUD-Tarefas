import http from 'node:http'
import { json } from './middlewares/json.js'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    await json(req, res)

    if (method === 'POST' && url === '/tasks') {
        const { title, description } = req.body

        const task = {
            id: randomUUID(),
            title: title,
            description: description,
            created_at: new Date(),
            completed_at: null,
            updated_at: null
        }

        database.insert('tasks', task)
        return res.writeHead(201).end()
    }

    if (method === 'GET' && url === '/tasks') {

        const tasks = database.select('tasks')
        return res
            .end(JSON.stringify(tasks))
    }

    return res.writeHead(404).end('não encontrado')
})

server.listen(3335)