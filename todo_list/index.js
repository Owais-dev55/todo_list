#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
let todos = [];
let condition = true;
while (condition) {
    let mytask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add in your todos?",
        },
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more?",
            default: false,
        },
    ]);
    todos.push(mytask.todo);
    condition = mytask.addMore;
    console.log(todos);
}
let dropdown = await inquirer.prompt([
    {
        name: "menu",
        type: "list",
        message: "What do you want to do",
        choices: ["view your todolist", "update your todolist", "delete a task", "quit"],
    },
]);
if (dropdown.menu === "view your todolist") {
    console.log(todos);
}
else if (dropdown.menu === "quit") {
    if (todos.length === 0) {
        console.log(chalk.green("No tasks for the day. \nNow exiting..."));
    }
    else {
        console.log(chalk.green("Tasks added successfully. \nNow exiting..."));
    }
}
else if (dropdown.menu === "delete a task") {
    let deleteTask = await inquirer.prompt([
        {
            name: "taskIndex",
            type: "list",
            message: "Select task to delete",
            choices: todos,
        },
    ]);
    todos.splice(todos.indexOf(deleteTask.taskIndex), 1);
    console.log(chalk.redBright("Task deleted successfully."));
    console.log(todos);
}
else if (dropdown.menu === "update your todolist") {
    let update = await inquirer.prompt([
        {
            name: "oldtask",
            type: "list",
            message: "Select the task to update",
            choices: todos,
        },
        {
            name: "newTask",
            type: "input",
            message: "Enter the new task",
        },
    ]);
    let taskIndex = todos.indexOf(update.oldtask);
    todos[taskIndex] = update.newTask;
    console.log(chalk.magentaBright("Task updated successfully."));
    console.log(todos);
}
