import { Repository, RepositoryInMemoryImpl } from './repository.js';
import { IdType } from "./shared-types.js";

export class User {
    constructor (
        public fName: string,
        public lName: string,
        public content: string,
        public username: string,
        public password: string,
        public gender: string,
        public imageUrl: string,
        public Id: IdType
    ){}
}

export enum roleUser {
    user1 = "User",
    user2 = "Admin"
}

export enum Status {
    stat1 ="ACTIVE",
    stat2 ="SUSPENDED",
    stat3 ="DEACTIVATED"
}