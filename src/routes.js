import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
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
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params.groups

            const deleteStatus = database.delete('tasks', id)

            if (deleteStatus > -1) {
                return res.writeHead(200).end()
            }

            return res.writeHead(400).end('provided ID was not found')

        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params.groups
            const { title, description } = req.body

            if (title && description) {
                const task = {
                    title: title,
                    description: description,
                    updated_at: new Date()
                }
    
                const updateStatus = database.update('tasks', id, task)

                if (updateStatus > -1) {
                    return res.writeHead(200).end()
                }
                
                return res.writeHead(400).end('provided ID was not found')
            }

            return res.writeHead(400).end('missing data')
            
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params.groups

            const completeStatus = database.complete('tasks', id)

            if (completeStatus > -1) {
                return res.writeHead(200).end()
            }

            return res.writeHead(400).end('provided Id was not found')
        }
    }

]