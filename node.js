const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',


    port: 3306,


    user: 'root',


    password: 'jake',
    database: 'employee_trackerDB',
});


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
    });


const start = () => {
    inquirer
        .prompt({
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View all Employees by Deparment', 
                'View all Employees by Role'
            ],
        })
        .then((answer) => {
            switch (answer.start) {
                case 'View All Employees':
                    console.log('chose View All Employees')
                    break;
                case 'View all Employees by Deparment':
                    console.log('chose View all Employees by Deparment')
                    break;
                case 'View all Employees by Role':
                    console.log('chose View all Employees by Role')
                    break;
                default :
                    console.log('please choose a value')
            }
        })
}

//functions for each case

