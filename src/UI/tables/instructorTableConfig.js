import { editInstructor, removeInstructor } from "../../controllers/instructorController.js";
import { showMessage } from "../message.js";

export const instructorTableConfig = {
    tableSelector: "#entityTable",
    actor: "instructors",
    columns: ["id", "name", "department", "salary"],
    
    confirmDeleteMessage: (instructor) =>
        `Are you sure you want to delete ${instructor.name}?`,

    onDelete: (instructor) => removeInstructor(instructor.id),

    onEdit: (instructor, updatedData) =>
        editInstructor(instructor.id, updatedData),

    editPrompt: (instructor) => {
        //& Name
        const name = prompt("Enter new name:", instructor.name);
        if (!name)
            return null;

        //& Department
        const department = prompt("Enter new department:", instructor.department);
        if (!department || department.trim() === "") {
            showMessage("Department must be filled", "error", 2500);
            return null;
        }

        //& Salary
        const salary = Number(prompt("Enter new salary:", instructor.salary));
        if (!Number.isFinite(salary) || salary <= 0) {
            showMessage("Salary must be a positive number", "error", 2500);
            return null;
        }

        return {
            id: instructor.id,
            name: name.trim(),
            department: department.trim(),
            salary: salary
        };
    }
};
