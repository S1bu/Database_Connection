class Person{
    #firstName = "";
    constructor(firstName){
        this.#firstName = firstName
    }
    walk(){
        console.log(`${this.#firstName}`);
    }
    dancing(){
        console.log(`${this.#firstName}`);
    }
};

// console.log(Person1.#firstName)
const Person1 = new Person('Joel')
const Person2 = new Person('Ryan')

Person1.walk()
Person2.dance()