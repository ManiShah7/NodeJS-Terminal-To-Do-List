const commands = ['new', 'done', 'delete', 'list'];
const toDosFileName = 'ToDos.json';

// Packages
const prompt = require('prompt');
const chalk = require('chalk');

// Imports
const fs = require('fs');


class ToDoList {
    toDos = [];

    constructor() {
        this.init();
    }

    init() {
        let toDosFile = this.getOrCreateToDosFile();
        this.toDos = JSON.parse(toDosFile);
    }

    getOrCreateToDosFile() {
        if (!fs.existsSync(toDosFileName)) {
            fs.writeFileSync(toDosFileName, JSON.stringify([]))
        }

        return fs.readFileSync(toDosFileName, "utf-8");
    }

    createNewToDo() {
        prompt.start();
        prompt.get(['todo'], (err, result) => {
            let toDo = {
                title: result.todo,
                timestamp: new Date().getTime(),
                done: false
            };
            this.toDos.push(toDo);
            console.log(chalk.green('To Do Added.'));
            this.updateToDosFile();
        })
    }

    printToDos() {
        this.toDos.map((toDo, index) => {
            if (toDo.done) {
                console.log(chalk.green(index + '- ' + toDo.title));
            } else {
                console.log(chalk.red(index + '- ' + toDo.title));
            }
        })
    }

    deleteToDo(toDoIndex) {
        this.toDos.splice(toDoIndex, 1);
        console.log(chalk.green('To Do Deleted.'));
        this.updateToDosFile();
    }

    setDone(toDoIndex) {
        this.toDos[toDoIndex].done = true;
        console.log(chalk.green('To Do Done.'));
        this.updateToDosFile();
    }

    updateToDosFile() {
        fs.writeFile(toDosFileName, JSON.stringify(this.toDos), function (err) {
            if (!err) console.log(chalk.yellow('To Dos List Updated.'));
        })
    }
}

module.exports = {
    commands,
    ToDoList
}