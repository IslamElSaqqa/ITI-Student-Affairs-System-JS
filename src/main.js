import {loadStudents,addStudent, checkDuplicateId} from "./controllers/studentController.js";
import { showMessage } from "./UI/message.js";
import { renderTable } from "./UI/tableRenderer.js";
import { checkNameFormat,searchbyName } from "./utils/helpers.js";

//^  On page load
// loadStudents();

let students = []

async function initialize() {
    students = await loadStudents();
    renderTable(students);
}

//? Render initiallly
initialize();

//^ Adding Jquery handler to search for any value
$('#searchInput').on('keyup', function() {
    var value = $(this).val();
    console.log('Value:', value);

    var filteredData = searchbyName(value, students);
    renderTable(filteredData);
});


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
    const newStudent = addStudent({ id, name, age })
    students.push(newStudent)
    renderTable(students)
});


