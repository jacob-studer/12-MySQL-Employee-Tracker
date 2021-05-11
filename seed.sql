INSERT INTO department (name)
VALUES ('sales'), ('IT'), ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('sales rep', 50000, 1), ('Developer', 70000, 2), ('Finance', 60000, 3), ('sales manager', 50000, 1), ('lead Developer', 70000, 2), ('Finance manager', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Dalia', 'Becker', 4, NULL), ('Marina', 'Chang', 5, NULL), ('Elsie', 'Hamilton', 6, NULL), ('Velma', 'Butler', 1, 1), ('Philip', 'Romero', 1, 1), ('Whitney', 'Cortez', 2, 2) ,('Chester', 'Martinez', 2, 2), ('Cassandra', 'Goodwin', 3, 3), ('Terence', 'Powell', 3, 3);


