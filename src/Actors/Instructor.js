import Person from "./Person";
export default class Instructor extends Person{ 
    #salary;
    #department
    constructor(_id, _name, _salary, _department) {
        super(_id, _name);
        this.salary = _salary;
        this.department = _department;
    }

    set salary(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Salary must be a positive number");
        }
        this.#salary = value;
    }

    set department(value) {
        if (typeof value !== "string") {
            throw new Error("Department must be a string");
        }

        const trimmedDept = value.trim();
        if (trimmedDept === "") {
            throw new Error("Department must be filled");
        }

        this.#department = trimmedDept;
    }

    get salary() { return this.#salary }
    get department() { return this.#department }
    
    toString() {
        return `Instructor Id: ${this.id}, Name: ${this.name}, Department: ${this.#department}, Salary: ${this.#salary}`;
    }
}