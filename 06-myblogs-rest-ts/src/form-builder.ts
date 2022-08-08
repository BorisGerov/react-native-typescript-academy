import { Change, Status } from "./validate";

export type FormComponents<Entity> = {
    [Prop in keyof Entity]?: FormComponent<Prop>
}

export interface FormComponent<State> {
    id: string;
    value: State;
    state: State;
    valid: Status;
    changed: Change
    readonly initialValue?: State;
    reset(): void;
    validate(): string[]; //validation errors, empty [] is no errors
    render(): string;
}

interface FormTextComponentType extends FormComponent<string> {
    multiline: boolean;
}

type FormCheckboxComponent = FormComponent<boolean>;
interface FormNumberComponent extends FormComponent<number> {
    min: number;
    max: number;
}
interface FormUrlComponent extends FormComponent<string> {
    allowRelative: boolean;
    allowInsecure: boolean;
}

export type FormComponentType<Prop> = 
Prop extends string ? FormTextComponentType | FormUrlComponent :
Prop extends boolean ? FormCheckboxComponent :
Prop extends number ? FormNumberComponent : 
never; 

export class FormTextComponent implements FormTextComponentType {
    constructor(
    public id: string,    
    public value: string,
    public multiline: boolean,
    public state: string,
    public valid: Status,
    public changed: Change,
    public initialValue?: string | undefined ){}
    reset(): void {
        throw new Error("Method not implemented.");
    }
    validate(): string[] {
        throw new Error("Method not implemented.");
    }
    render(): string {
        throw new Error("Method not implemented.");
    }
    
}