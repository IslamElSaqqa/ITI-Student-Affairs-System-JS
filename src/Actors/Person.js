export default class Person {
    //? Private members
    #id=0;
    #name="";
    
    constructor(_id, _name) { 
        //^ Abstraction
        if (new.target === Person)
            throw new Error("Person Cannot be instantiated directly!");

        this.id = _id;
        this.name = _name;
    }

    //? Accessors and mutators
    set name(_name) { 

        const trimmedName = _name.trim()
        if (trimmedName !== "")
            this.#name = _name;
        else
            throw new Error("Name must be filled!");
    }

    set id(_id) { 
        if (_id > 0)
            this.#id = _id;
        else
            throw new Error("Id must be greater than 0");
    }

    get name() { return this.#name }
    get id() { return this.#id}
    

    //? Displaying data
    toString() {
        return `Person Data: Id: ${this.#id}, Name: ${this.#name}`;
    }
}