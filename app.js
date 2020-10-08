// Imports
const commands = require('./ToDoListClass').commands;
const ToDoList = require('./ToDoListClass').ToDoList;

// Packages
const chalk = require('chalk');

// Command
let command = process.argv[2];
let taskIndex = process.argv[3];

// Exit if command doesn't exist in the commands array
if (commands.indexOf(command) == -1) {
    console.log(chalk.red('Command is not valid!'));
}

let ToDoListApp = new ToDoList;

switch (command) {
    case 'new':
        ToDoListApp.createNewToDo();
        break;
    case 'list':
        ToDoListApp.printToDos();
        break;
    case 'delete':
        ToDoListApp.deleteToDo(taskIndex);
        break;
    case 'done':
        ToDoListApp.setDone(taskIndex);
        ToDoListApp.printToDos();
        break;
}