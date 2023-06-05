import fs from 'node:fs/promises'
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

fs.createReadStream = createReadStream

const csv = new URL('../tasks.csv', import.meta.url)
const processFile = async () => {
    let parser = fs
        .createReadStream(csv)
        .pipe(parse({
            columns: ['title', 'description'],
            from_line: 2
        }));

    for await (const record of parser) {
        fetch('http://localhost:3335/tasks',{
            method: 'POST',
            body: JSON.stringify(record)
        })
    }
}
processFile()
