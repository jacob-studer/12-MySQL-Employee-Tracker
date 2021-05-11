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

const startPage = () => {
    let query = 
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.log('--------------------');
        const table = cTable.getTable(res);
        console.log(table);
    })
        
}



    


const start = () => {
    inquirer
        .prompt({
            name: 'start',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View all Employees by Deparment', 
                'View all Employees by Role',
                'Add a Department',
                'Add a Role',
                'Add a New Employee',
                'Quit'
            ],
        })
        .then((answer) => {
            switch (answer.start) {
                case 'View All Employees':
                    viewEmployees()
                    break;
                case 'View all Employees by Deparment':
                    viewEmployeesByDepartment()
                    break;
                case 'View all Employees by Role':
                    viewEmployeesByRole()
                    break;
                case 'Add a Department':
                    addDepartment()
                    break;
                case 'Add a Role':
                    addRole()
                    break;
                case 'Add a New Employee':
                    addNewEmployee()
                    break;
                case 'Quit':
                    quit()
                    break;
                default :
                    console.log('please choose a value')
            }
        })
    }

        const viewEmployees = () => {
            const query = 
            'SELECT * FROM employee';
            connection.query(query, (err, res) => {
                if (err) throw err
                console.log('--------------------');
                const table = cTable.getTable(res);
                console.log(table);
                start();
            })
        };
            
        

        const viewEmployeesByDepartment = () => {
            let query = 
            'SELECT first_name, last_name, title, name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id'
            connection.query(query, (err, res) => {
                console.log('--------------------');
                const table = cTable.getTable(res);
                console.log(table);
                start();
            })
        }

        const viewEmployeesByRole = () => {
            let query = 
            'SELECT first_name, last_name, title, salary FROM role RIGHT JOIN employee ON role.id = employee.role_id';
            connection.query(query, (err, res) => {
                if (err) throw err
                console.log('--------------------');
                const table = cTable.getTable(res);
                console.log(table);
                start();
            })
        }

        const addDepartment = () => {
            inquirer
            .prompt([
                {
                    name:'addDept',
                    type:'input',
                    message:'Type in a value for the department you would like to add.'
                },
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.addDept,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('New department created successfully.');
                        start();
                    }
                );
            });
        };
        

        const addRole = () => {
            inquirer
            .prompt([
                {
                    name:'addTitle',
                    type:'input',
                    message:'Type in a value for the title of the role you would like to add.'
                },
                {
                    name:'addSalary',
                    type:'input',
                    message:'Type in a value for the salary of this role'
                },
                {
                    name:'addDeptId',
                    type:'input',
                    message:'What is the value of the department Id for the role?'
                }
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.addTitle,
                        salary: answer.addSalary,
                        department_id: answer.addDeptId,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('New role created successfully.');
                        start();
                    }
                );
            });
        };

        const addNewEmployee = () => {
            inquirer
            .prompt([
                {
                    name:'employeeFirstName',
                    type:'input',
                    message:'Type in the new employees first name.'
                },
                {
                    name:'employeeLastName',
                    type:'input',
                    message:'Type in the new employees last name.'
                },
                {
                    name:'employeeRole',
                    type:'input',
                    message:'What is the role id for the new employee?'
                },
                
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.employeeFirstName,
                        last_name: answer.employeeLastName,
                        role_id: answer.employeeRole,
                        manager_id: answer.employeeManager,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('New role created successfully.');
                        start();
                    }
                );
            });
        };

        const quit = () => {
            process.exit()
        }

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    startPage();
    start();
    });

