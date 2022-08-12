import { string } from "yargs";

export enum UserStatus {
    Active = 1, Suspended, Deactivated
}

export class User {
    static nextId = 0;
    id = ++User.nextId;
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public comfirmPassword: string,
        public gender: string,
        public status: UserStatus.Active,
        public url: string,
    ) {}
}