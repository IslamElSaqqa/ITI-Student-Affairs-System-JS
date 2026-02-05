import Person from './Person.js';

class Course extends Person {

    #courseCode;
    #description;

    constructor(id, name, code, description) {
        super(id, name);

        this.#courseCode = code;
        this.#description = description;
    }

    get code() {
        return this.#courseCode;
    }

    get description() {
        return this.#description;
    }

    
    set code(value) {
        this.#courseCode = value;
    }

    set description(value) {
        this.#description = value;
    }
}

export default Course;
