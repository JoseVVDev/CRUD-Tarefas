import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        url: '/tasks',
        handler(req, res) {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        url: '/tasks',
        handler(req, res) {
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
    }
]