const READER = 0;
const AUTHOR = 1;
const ADMIN= 2;

const Role = ['READER', 'AUTHOR', 'ADMIN'];

class Person {
    static nextId = 0;
    id = ++Person.nextId ;
    constructor(fName, lName, address){
        this.fName = fName;
        this.lName = lName; 
        this.address = address;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.fName + ' ' + this.lName}, Address: ${this.address}`;
    }
}
class User extends Person {
    constructor(fName, lName, address, username, password, role = READER ){
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }
    toString(){
        return `${super.toString()} , Username: ${this.username}, Password: ${this.password}, Role: ${Role[this.role]} `;
    }
}

    const p1 = new Person('John', 'Doe', 'London');
    const p2 = new Person('Jane', 'Doe', 'New York');

    const u1 = new User('Ivan', 'Petrov', 'Gabrovo', 'ivan', 'ivan123');
    const u2 = new User('Hristina', 'Petrova', 'Sofia', 'hrisi', 'hrisi123', ADMIN);
    const u3 = new User('Georgi', 'Hristov', 'Plovdiv', 'georgi', 'georgi123', AUTHOR);

    const people = [p1, p2, u1, u2, u3];
    people.forEach(p => console.log(p.toString()));

    