import { loadStudents, addStudent, editStudent, removeStudent } from "./controllers/studentController.js";

//^  On page load
loadStudents();

//^ Add a student 
document.querySelector("#studentForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = parseInt(e.target.age.value);
    const id = parseInt(e.target.id.value);
    addStudent({ name, age, id });
});


