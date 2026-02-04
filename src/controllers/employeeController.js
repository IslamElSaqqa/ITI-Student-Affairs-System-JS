import { 
    getEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee, 
    getEmployeeById,
} from "../services/employeeServices.js";
import { showMessage } from "../UI/message.js";
import { sortEntities } from "../utils/helpers.js";
import Employee from "../Actors/Employee.js";

export const loadEmployees = async () => {
    try {
        const employeeObjects = await getEmployees();
        //^ Converting objects to Employee instances
        const employees = employeeObjects.map(
            e => new Employee(
                e.id, 
                String(e.name), 
                String(e.position), 
                String(e.office), 
                Number(e.age), 
                e.startDate, 
                Number(e.salary)
            )
        ).filter(e => e != null);
        return employees;
    } catch (err) {
        showMessage(err.message, "error", 2000);
        return [];
    }
};

export const addEmployee = async (employeeData) => {
    try {
        const { id, name, position, office, age, startDate, salary } = employeeData;

        //? Create the employee
        const newEmployee = await createEmployee({id, name, position, office, age, startDate, salary});
        showMessage(`Employee "${newEmployee.name}" added successfully!`, "success", 3000);

        console.log("Employee created:", newEmployee);
        return newEmployee;
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const editEmployee = async (id, employeeData) => {
    try {
        const updatedEmployee = await updateEmployee(id, employeeData);
        showMessage(`Employee updated successfully!`, "success", 3000);
        console.log("Employee updated:", updatedEmployee);
        return updatedEmployee;
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const removeEmployee = async (id) => {
    try {
        await deleteEmployee(id); 
        showMessage(`Employee deleted successfully!`, "success", 3000);        
        return true;
    } catch (err) {
        showMessage(err.message, "error", 2000);
    }
};

export const loadEmployeeById = async (id) => {
    try {
        const employee = await getEmployeeById(id);
        return new Employee(
            employee.id, 
            employee.name, 
            employee.position, 
            employee.office, 
            employee.age, 
            employee.startDate, 
            employee.salary
        );
    } catch (err) {
        showMessage(err.message, "error", 2000);
        return null;
    }
};

//^ Check for data duplication
export async function checkDuplicateId(_id) {
    const employees = await getEmployees();
    return employees.some((emp) => emp.id === _id);
}

//^ Loading employees sorted by {name || id || position || office || age || startDate || salary} and order {asc || desc}
export const loadSortedEmployees = async (column, order) => {
    if (!column) return [];
    const data = await sortEntities("employees", column, order);
    return data.map(e => new Employee(e.id, e.name, e.position, e.office, e.age, e.startDate, e.salary));
};
