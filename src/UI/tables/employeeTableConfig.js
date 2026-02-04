import { editEmployee, removeEmployee } from "../../controllers/employeeController.js";
import { showMessage } from "../message.js";

export const employeeTableConfig = {
    tableSelector: "#entityTable",
    actor: "employees",
    columns: ["id", "name", "position", "office", "age", "startDate", "salary"],
    
    confirmDeleteMessage: (employee) =>
        `Are you sure you want to delete ${employee.name}?`,

    onDelete: (employee) => removeEmployee(employee.id),

    onEdit: (employee, updatedData) =>
        editEmployee(employee.id, updatedData),

    editPrompt: (employee) => {
        //& Name
        const name = prompt("Enter new name:", employee.name);
        if (!name)
            return null;

        //& Position
        const position = prompt("Enter new position:", employee.position);
        if (!position || position.trim() === "") {
            showMessage("Position must be filled", "error", 2500);
            return null;
        }

        //& Office
        const office = prompt("Enter new office:", employee.office);
        if (!office || office.trim() === "") {
            showMessage("Office must be filled", "error", 2500);
            return null;
        }

        //& Age
        const age = Number(prompt("Enter new age:", employee.age));
        if (!Number.isInteger(age) || age < 18) {
            showMessage("Age must be at least 18", "error", 2500);
            return null;
        }

        //& Start Date
        const startDate = prompt("Enter new start date (YYYY-MM-DD):", 
            employee.startDate instanceof Date ? 
            employee.startDate.toISOString().split('T')[0] : 
            employee.startDate);
        if (!startDate) {
            showMessage("Start date must be filled", "error", 2500);
            return null;
        }

        //& Salary
        const salary = Number(prompt("Enter new salary:", employee.salary));
        if (!Number.isFinite(salary) || salary <= 0) {
            showMessage("Salary must be a positive number", "error", 2500);
            return null;
        }

        return {
            id: employee.id,
            name: name.trim(),
            position: position.trim(),
            office: office.trim(),
            age: age,
            startDate: startDate,
            salary: salary
        };
    }
};
