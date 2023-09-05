import {Router} from "express";
/* 
Mit dem Sternchen (*) importieren wir alles, was in unserem Controller exportiert wurde
und speichern es in dem Object "departmentController". Danach können wir, wie bei
Objekten üblich, mit einem Punkt vor dem Funktionsnamen auf unsere Controller-Funktionen
zugreifen.
*/
import * as departmentController from "../controllers/departmentController.js";

const departmentRouter = Router();

departmentRouter
    .post("/department", departmentController.createDepartment)
    .get("/departments", departmentController.getAllDepartments)
    .get("/department/:id", departmentController.getOneDepartment)
    .delete("/department", departmentController.deleteDepartments)

export default departmentRouter;