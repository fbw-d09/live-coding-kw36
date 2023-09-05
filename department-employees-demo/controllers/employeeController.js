import Employee from "../models/employee.js";

export const createEmployee = async(req, res) => {
    try {
        const {name, email, salary, hireDate, department} = req.body;
        const newEmployee = new Employee({name, email, salary, hireDate, department});
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.log({error});
        res.status(500).json({msg:"Server error!"});
    }
};

export const getAllEmployees = async(req, res) => {
    try {
        const response = await Employee.find();
        res.status(200).json(response);
    } catch (error) {
        console.log({error});
        res.status(500).json({msg:"Server error!"});
    }
};

/* 
In unserem employee-Schema haben wir mit "ref" einen Bezug zu unserem department-Schema
hergestellt. Wenn wir uns jetzt per "findById"-Methode einen Employee anzeigen lassen
sehen wir im Feld "department", welches Department diesem Employee zugewiesen ist.
Problem dabei, wir sehen nur die ObjectId von diesem Department. 

Um uns auch die dazugehörigen Felder anzeigen zu lassen, können wir die "populate"-Methode
benutzen. Wir können populate ein Objekt übergeben, wobei "path" der Name des Feldes 
sein muss, in dem wir die Referenzierung vorgenommen haben. Mit "select" können wir
angeben, welche Felder aus Department wir angezeigt bekommen wollen. Lassen wir select
weg, werden alle Felder zurückgegeben.
Alternativ können wir auch die Kurzschreibweise nutzen. Populate bekommt dann zwei
Argumente als String. Zuerst den Namen (analog zu "path"), danach die Felder, die
wir uns anzeigen lassen wollen (getrennt durch Leerzeichen). Möchten wir Felder wie
die ObjectId explizit ausschließen, dann müssen wir ein Minus (-) davorschreiben.

Wir können "select" auch benutzen, um die Anzeige der Felder für die Employees zu
begrenzen, dazu können wir select an die populate-Methode anhängen:
populate("department", "name").select("name email").
*/

export const getOneEmployee = async(req, res) =>{
    const {id} = req.params;
    try {
        // const response = await Employee.findById(id);
        // const response = await Employee.findById(id).populate({path:"department", select:"name"});
        // const response = await Employee.findById(id).populate({path:"department"});
        // const response = await Employee.findById(id).populate("department", "name");
        // const response = await Employee.findById(id).populate("department", "name location -_id");
        const response = await Employee.findById(id).populate("department", "-_id");
        res.status(200).json(response);
    } catch (error) {
        console.log({error});
        res.status(500).json({msg:"Server error!"});
    }
}

export const deleteEmployees = async(req, res) => {
    try {
        await Employee.deleteMany();
        res.status(200).json({msg:"All departments removed!"});
    } catch (error) {
        console.log({error});
        res.status(500).json({msg:"Server error!"});
    }
};