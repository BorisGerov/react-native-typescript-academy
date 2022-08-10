import { User } from "./users.js";

export type ValidationConfig<T> = {
    [P in keyof T]?: Validator | Validator[]
}

export type ValidationResult<T> = {
    [P in keyof T]?: string[]
}


export type FormState<T> = { 
    [P in keyof T]?: FormFieldState
}

export class FormFieldState  {
    constructor (
        public valid: Status,
        public changed: Change
    ){}
    
}

export enum Status {
    VALID,
    INVALID
}

export enum Change {
    PRISTINE,
    DIRTY
}

export type Validator = (value: string, field: string) => void;


export type ValidatorFactory = (...args: any) => Validator

type PostValidationConfig = ValidationConfig<User>

type PostValidationResult = ValidationResult<User>


// Standad validators
export class Validators {
    static required: ValidatorFactory = () => (value: string, field: string) => {
        if(value.trim().length === 0) {
            throw `The field '${field}' is required`
        }
    }
    static pattern: ValidatorFactory = (validationPattern: RegExp) => (value: string, field: string) => {
        if(!value.match(validationPattern)) {
            throw `The field '${field}' does not match pattern '${validationPattern}'`
        }
    }
    static len: ValidatorFactory = (min: number = 0, max: number = 20) => (value: string, field: string) => {
        if(value.length < min) {
            throw `The field '${field}' should be at least ${min} characters long`
        } else if (value.length > max) {
            throw `The field '${field}' should be no more tan ${max} characters long`
        }
    }
}

