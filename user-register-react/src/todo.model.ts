import { string } from "yargs";
import { IdType } from "./shared-types";

export enum UserStatus {
    Active = 1, Completed, Canceled
}
export enum UserGender {
    Male, Female, Other
}
export class User {
    // static nextId = 0;
    // id = ++User.nextId;
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public comfirmPassword: string,
        public gender: UserGender,
        public status: UserStatus =  UserStatus.Active,
        public url: string,
        public id: IdType = undefined
    ) {}
}