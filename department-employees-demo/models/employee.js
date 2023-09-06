import mongoose from "mongoose";

/* 
Unser Employee Model haben wir mit dem Department Model verknüft, indem wir
der Eigenschaft "department" den type: mongoose.Schema.Types.ObjectId gegeben haben.
D.h. das Feld department wird später mit den ObjectIds der zugehörigen departments
gefüllt. Mit ref: "Department" sagen wir welches Model hier verknüpft werden soll.
Der Name entspricht dem, was wir beim Erstellen des Department Models angegeben haben:

new mongoose.model("Department", departmentSchema)

Hinsichtlich der Beziehung der beiden Collections (Models) sprechen wir hier von
one-to-many, d.h. ein(e) Angestellte(r) ist einer Abteilung zugeordnet, aber
eine Abteilung kann mehrere Angestellte haben.
*/

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: String,
    salary: Number,
    hireDate: Date,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department", 
        required:true
    }
});

const Employee = new mongoose.model("Employee", employeeSchema);

export default Employee;