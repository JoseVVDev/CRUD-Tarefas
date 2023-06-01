import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(index => index.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }

        return rowIndex
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(index => index.id === id)

        if(rowIndex > -1) {
            this.#database[table][rowIndex] = {
                id, 
                title: data.title,
                description: data.description,
                created_at: this.#database[table][rowIndex].created_at,
                completed_at: this.#database[table][rowIndex].completed_at,
                updated_at: data.updated_at
            }
            this.#persist()
        }

        return rowIndex
    }

    complete(table, id){
        const rowIndex = this.#database[table].findIndex(index => index.id === id)

        if(rowIndex > -1) {
            this.#database[table][rowIndex].completed_at = new Date()
        }

        return rowIndex

    }
}