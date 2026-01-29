
import Person from "./Person.js";

export default class Employee extends Person {
    #position;
    #office;
    #age;
    #startDate;
    #salary;

    constructor(_id, _name, _position, _office, _age, _startDate, _salary) {
        super(_id, _name);

        this.position = _position;
        this.office = _office;
        this.age = _age;
        this.startDate = _startDate;
        this.salary = _salary;
    }

    //^ Position
    set position(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Position must be a non-empty string");
        }
        this.#position = value.trim();
    }

    get position() {
        return this.#position;
    }

    //^ Office
    set office(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Office must be a non-empty string");
        }
        this.#office = value.trim();
    }

    get office() {
        return this.#office;
    }

    //^ Age
    set age(value) {
        //? Safety Check on age Type
        if (typeof value !== "number" || value < 18) {
            throw new Error("Age must be a number greater than or equal to 18");
        }
        this.#age = value;
    }

    get age() {
        return this.#age;
    }

    //^ Start Date
    set startDate(value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid start date");
        }
        this.#startDate = date;
    }

    get startDate() {
        return this.#startDate;
    }

    //^ Salary
    set salary(value) {
        if (typeof value !== "number" || value <= 0) {
            throw new Error("Salary must be a positive number");
        }
        this.#salary = value;
    }

    get salary() {
        return this.#salary;
    }

    toString() {
        return `Employee → Id: ${this.id}, Name: ${this.name}, Position: ${this.#position}, Office: ${this.#office}, Age: ${this.#age}, Start Date: ${this.#startDate.toDateString()}, Salary: ${this.#salary}`;
    }
}
