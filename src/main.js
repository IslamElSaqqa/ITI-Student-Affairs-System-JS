import {loadStudents,addStudent, checkDuplicateId} from "./controllers/studentController.js";
import { showMessage } from "./UI/message.js";
import { checkNameFormat } from "./utils/helpers.js";

//^  On page load
loadStudents();

//^ Add a student 
document.querySelector("#studentForm").addEventListener("submit", async e => {
    e.preventDefault();
    const id = parseInt(e.target.id.value);
    const name = e.target.name.value;
    const age = parseInt(e.target.age.value);

    if (!id) { 
        showMessage("Id is required and should be a number");
        return;
    }

    if (!checkNameFormat(name)) { 
        showMessage("Name should be like this: John Doe");
        return;
    }
    if (age <= 18) { 
        showMessage("Age must be greater than 18!");
        return;
    }
   

     //& Check for id duplication
    if (await checkDuplicateId(id)) {
        showMessage("sorry, Id is duplicated!");
        return;
    }
    //^ If all validation matches, so it will create the student
    addStudent({id, name, age })
});


