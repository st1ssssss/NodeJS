import fs from 'fs/promises'
import { lstatSync } from 'fs'
import inquirer from 'inquirer'
import yargs from 'yargs'
import path from 'path'


let currentDirectory = process.cwd();
const options = yargs()
    .positional('d', {
        describe: 'Path to directory',
        default: process.cwd(),
    })
    .positional('p', {
        describe: 'Pattern',
        default: '',
    }).argv;

console.log(options)


class List {
    constructor(path, fileName) {
        this.path = path
        this.fileName = fileName
    }
    get isDir() {
        return lstatSync(this.path).isDirectory()
    }
}

const init = async () => {
    const list = await fs.readdir(currentDirectory)
    const items = list.map(fileName =>
        new List(path.join(currentDirectory, fileName), fileName)
    )
    const item = await inquirer.prompt([{
        name: 'fileName',
        message: `Choose ${currentDirectory}`,
        type: 'list',
        choices: items.map(item => ({ name: item.fileName, value: item }))
    }]).then(answer => answer.fileName)

    if (item.isDir) {
        currentDirectory = item.path;
        return await run();
    } else {
        const data = await fs.readFile(item.path, 'utf-8');

        if (options.p == null) console.log(data);
        else {
            const regExp = new RegExp(options.p, 'igm');
            console.log(data.match(regExp));
        }
    }
}

init()