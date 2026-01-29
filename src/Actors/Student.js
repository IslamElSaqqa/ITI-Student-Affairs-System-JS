import Person from "./Person.js";

export default class Student extends Person { 
    
    #age;
    constructor(_id, _name, _age) { 
        super(_id, _name);
        this.age = _age;
    }

    set age(_age) { 
        if (_age > 18) {
            this.#age = _age;
        }
        else
            throw Error("Age must be greater than 18");
    }

    get age() { return this.#age };

    //^ Override toString Conscise 
    toString() {
        return `Student: name: ${this.name}, id: ${this.id}, age: ${this.#age}`
    }
}