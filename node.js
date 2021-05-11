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
        console.table(res)})
        
}



    


const start = async () => {
    await startPage(); 
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
                'Update an Employees Role',
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
                    break;3
                case 'Add a Role':
                    addRole()
                    break;
                case 'Add a New Employee':
                    addNewEmployee()
                    break;
                case 'Update an Employees Role':
                    updateRole()
                    break;
                case 'Quit':
                    quit()
                    break;
                default :
                    console.log('please choose a value')
            }
        })


        const viewEmployees = () => {
            //employees table
            //loop through employees [i]=template literal injection
            const query = 
            'SELECT * FROM employee';
            connection.query(query, (err, res) => {
                if (err) throw err
                console.table(res)})
                start();
        }
            
        

        const viewEmployeesByDepartment = () => {
        }

        const viewEmployeesByRole = () => {
            let query = 
            'SELECT first_name, last_name, title, salary, FROM employee LEFT JOIN role ON employee.role_id = role.id';
            connection.query(query, (err, res) => {
                if (err) throw err
                console.log(err)
                console.table(res)})
                start();
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
                        department: answer.addDept,
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
                }
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.addTitle,
                        salary: answer.addSalary,
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
                {
                    name:'employeeManager',
                    type:'input',
                    message:'What is the manager id for the manager of this employee?'
                }
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
        }

        const updateRole = () => {
            const allEmployees = [];
            connection.query (
                'SELECT first_name, last_name, id FROM employee', (err, res) => {
                    if (err) throw err;
                    console.log(res);
                    res.forEach(({id, first_name, last_name}) => {
                        allEmployees.push(id+ '. ' + first_name + ' ' + last_name)
                    })
                    inquirer
            .prompt([
                {
                    name:'chooseEmployee',
                    type:'list',
                    message:'Select the employee.',
                    choices: allEmployees,
                },
                {
                    name:'updateTitle',
                    type:'input',
                    message:'Type in the title of the new role for the employee.'
                },
                {
                    name:'updateSalary',
                    type:'input',
                    message:'Type in a value for the new salary of the employee'
                },
                {
                    name:'updateDeparmentId',
                    type:'input',
                    message:'What is the department ID?'
                }
            ])
            .then((answer) => {
                connection.query(
                    'UPDATE role SET ? WHERE id=?',
                    [{
                        title: answer.updateTitle,
                        salary: answer.updateSalary,
                        department_id: answer.updateDepartmentId, 
                    },
                    
                    ],
                    (err) => {
                        if (err) throw err;
                        console.log('New role created successfully.');
                        start();
                    }
                );
            });
                }
            ) 
        }

        const quit = () => {
            return
        }

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
    });

