import { 
    getStudents, 
    createStudent, 
    updateStudent, 
    deleteStudent, 
    getStudentById,
    sortStudents
} from "../services/studentServices.js";
import { showMessage } from "../UI/message.js";

import Student from "../Actors/Student.js";

export const loadStudents = async () => {
    try {

        const studentObjects = await getStudents();
        //^ Converting objects to Student instances
        const students = studentObjects.map(
            s => new Student(s.id, String(s.name), Number(s.age))
        ).filter(s=>s!= null) //? Filtering data from null values
        return students;
        // renderTable(students);
    } catch (err) {
        showMessage(err.message, "error", 2000)
        return []
    }
};

export const addStudent = async (studentData) => {
    try {
        
        const { id, name, age } = studentData;

        //? Create the student
        const newStudent = await createStudent({id, name, age});
        showMessage(`Student "${newStudent.name}" added successfully!`, "success",3000);

        console.log("Student created:", newStudent);

        return newStudent(newStudent.id, newStudent.name, newStudent.age);
        //?  Reloading the table
        // loadStudents();
    } catch (err) {
        showMessage(err.message, "error", 2000)
    }
};

export const editStudent = async (id, studentData) => {
    try {
        const updatedStudent = await updateStudent(id, studentData);
        showMessage(`Student updated successfully!`, "success",3000);
        console.log("Student updated:", updatedStudent);
        //? Reloading the table
        loadStudents();
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const removeStudent = async (id) => {
    try {
        await deleteStudent(id); 
        showMessage(`Student deleted successfully!`, "success",3000);        
        return true;
        //? Reloading the table
        // loadStudents();
    } catch (err) {
        showMessage(err.message, "error",2000)
    }
};

export const loadStudentById = async (id) => {
    try {

        const student = await getStudentById(id);
        //^ recalling the student actor's constuctor 
        return new Student(student.id, student.name, student.age);

    } catch (err) {
        showMessage(err, "error", 2000);
        return null;
    }
};

//^ Check for data duplication
export async function checkDuplicateId (_id)  {
    //^ get All students
    const students = await getStudents();
    return students.some((std) => std.id === _id)
}

export const loadSortedStudents = async (sortColumn = null, sortOrder = "asc") => {
    try {
        let students;
        if (sortColumn) {
            //^ Custom Sort endpoints
            students = await sortStudents(sortColumn, sortOrder);
        } else {
            //^ Otherwise fallback to my initial load
            students = await getStudents(); 
        }

        return  students.map(
            s => new Student(s.id, String(s.name), Number(s.age))
        ).filter(s => s != null);

        // renderTable(students);
    } catch (err) {
        showMessage(err.message, "error", 2000);
        return [];
    }
};



