import { editStudent, removeStudent } from "../../controllers/studentController.js";
import { showMessage } from "../message.js";

//^ Passing my custom configuration to student
export const studentTableConfig = {
    tableSelector: "#entityTable",
    actor: "students",
    columns: ["id", "name", "age"],
    

    confirmDeleteMessage: (student) =>
        `Are you sure you want to delete ${student.name}?`,

    onDelete: (student) => removeStudent(student.id),

    onEdit: (student, updatedData) =>
        editStudent(student.id, updatedData),

    editPrompt: (student) => {
        
        //& Name
        const name = prompt("Enter new name:", student.name);
        if (!name)
            return null;

        //& Age
        const age = Number(prompt("Enter new age:", student.age));
        if (!Number.isInteger(age) || age <= 18) {
            showMessage("Age must be greater than 18", "error", 2500);
            return null;
        }

        return {
            id: student.id,
            name: name.trim(),
            age: age
        };
    }
};
