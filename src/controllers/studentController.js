import { 
    getStudents, 
    createStudent, 
    updateStudent, 
    deleteStudent, 
    getStudentById 
} from "../services/studentServices.js";
import { showMessage } from "../UI/message.js";

import Student from "../Actors/Student.js";
import { renderTable } from "../UI/tableRenderer.js";

export const loadStudents = async () => {
    try {

        const studentObjects = await getStudents();

        //^ Converting objects to Student instances
        const students = studentObjects.map(
            s => new Student(s.id, String(s.name), Number(s.age))
        ).filter(s=>s!= null) //? Filtering data from null values

        renderTable(students);
    } catch (err) {
        console.error("Error  loadingstudents:", err);
    }
};

export const addStudent = async (studentData) => {
    try {
        
        //? Create the student
        const newStudent = await createStudent(studentData);
        showMessage(`Student "${newStudent.name}" added successfully!`, "success");

        console.log("Student created:", newStudent);

        //?  Reloading the table
        loadStudents();
    } catch (err) {
        console.error("Error adding student:", err);
    }
};

export const editStudent = async (id, studentData) => {
    try {
        const updatedStudent = await updateStudent(id, studentData);
        showMessage(`Student updated successfully!`, "success");
        console.log("Student updated:", updatedStudent);
        //? Reloading the table
        loadStudents();
    } catch (err) {
        console.error("Error updating student:", err);
    }
};

export const removeStudent = async (id) => {
    try {
        
        await deleteStudent(id);
        showMessage(`Student deleted successfully!`, "success");
        console.log("Student deleted:", id);
        
        //? Reloading the table
        loadStudents();
    } catch (err) {
        console.error("Error deleting student:", err);
    }
};

export const loadStudentById = async (id) => {
    try {

        const student = await getStudentById(id);
        //^ recalling the student actor's constuctor 
        return new Student(student.id, student.name, student.age);

    } catch (err) {
        console.error("Error loading student:", err);
    }
};
