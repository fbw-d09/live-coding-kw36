import {faker} from "@faker-js/faker";
import {fakerDE} from "@faker-js/faker";
import "./lib/connect_db.js";
import Department from "./models/department.js";
import Employee from "./models/employee.js";
import dotenv from "dotenv";
dotenv.config();

const deleteDepartments = async ()=>{
    return await Department.deleteMany();
};

const deleteEmployees = async () => {
    return await Employee.deleteMany();
};

const departmentNames = ["HR", "IT", "Marketing", "Engineering", "Support"];

const generateDepartments = () => {
    const departments = [];

    departmentNames.forEach((name)=>{
        const location = fakerDE.location.city();
        departments.push(new Department({name, location}))
    });
    return departments;
};

const generateEmployees = (departments, amount=10)=>{
    const employees = [];

    for (let i = 0; i < amount; i++){
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const salary = faker.number.int({min:25000, max:90000});
        const hireDate = faker.date.past({years:30});
        const randomDepartment = departments[faker.number.int({min:0, max:4})]

        employees.push(new Employee({name, email, salary, hireDate, department:randomDepartment}));
    };
    return employees;
};

try {
    if (!process.argv.includes("delete")){
        const departments = generateDepartments();
        await Department.insertMany(departments);

        const employees = generateEmployees(departments, process.argv[2]);
        await Employee.insertMany(employees);
    } else {
        await deleteDepartments();
        await deleteEmployees();
        console.log("All documents removed!");

        const departments = generateDepartments();
        await Department.insertMany(departments);

        const employees = generateEmployees(departments, process.argv[3]);
        await Employee.insertMany(employees);
    }
    console.log("Database has been updated!");
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
};

/* 
Wir haben uns eine Seed-Datei erstellt um unsere Datenbank flexibel und schnell
befüllen zu können. process.argv benutzen wir dabei um bereits beim Aufrufen unseres
Skripts (mit npm run seed) festlegen zu können, a) ob wir bestehene Einträge aus der
Datenbank löschen wollen und b) wie viele neue Employees wir generieren wollen.
Beispiel: Wir wollen die Datenbank löschen und 10 neue Employees erzeugen, dann
starten wir unser Skript mit: npm run seed delete 10
Wollen wir lediglich neue Daten hinzufügen könnten wir starten mit:
npm run seed 10

Zum Befüllen der Daten nutzen wir das npm-Paket faker-js. Damit können wir 
pseudorealistische Daten generieren. Installiert haben wir das Paket mit:
npm i @faker-js/faker. Zusätzlich haben wir fakerDE importiert (aus demselben Paket),
das hat uns erlaubt länderspezifische Daten zu erzeugen (hier: nur deutsche Städtenamen).
*/
