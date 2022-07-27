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
    
    #getFullName(){
        return  `${this.fName} ${this.lName}`;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.#getFullName()}, Address: ${this.address}`;
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
const changePassword = function(newPassword){
    this.password = newPassword;
}
const SUPER_ADMIN = {
    __proto__: User.prototype,
    id: 0,
    fName: 'Default',
    lName: 'Admin',
    address: 'BG',
    username: 'admin',
    password: 'admin',
    role: ADMIN,
    toString() {
        return `SUPERUSER: ${super.toString()}`;
    },
    changePassword 
}


    const p1 = new Person('John', 'Doe', 'London');
    const p2 = new Person('Jane', 'Doe', 'New York');

    const u1 = new User('Ivan', 'Petrov', 'Gabrovo', 'ivan', 'ivan123');
    const u2 = new User('Hristina', 'Petrova', 'Sofia', 'hrisi', 'hrisi123', ADMIN);
    const u3 = new User('Georgi', 'Hristov', 'Plovdiv', 'georgi', 'georgi123', AUTHOR);

    const people = [p1, p2, u1, u2, u3];
    people.forEach(p => console.log(p.toString()));

    console.log(SUPER_ADMIN.toString());
    SUPER_ADMIN.changePassword('admin123');
    console.log(SUPER_ADMIN.toString())

    