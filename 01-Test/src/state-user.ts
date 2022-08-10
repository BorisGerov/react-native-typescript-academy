import { User } from "./users.js";
import { Change, FormFieldState, FormState, Status, ValidationConfig, Validators } from "./validate.js";

export interface AppState {
    editedPost: User | undefined;
    allPosts: User[],
    postFormValidationConfig: ValidationConfig<User>,
    postFormErrors: string[],
    postFormState: FormState<User>
}

export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],
    postFormValidationConfig: {
        fName: [Validators.required(), Validators.pattern('^[A-Z a-z]{2}'), Validators.len(2,15)],
        lName: [Validators.required(), Validators.pattern('^[A-Z a-z]{2}'), Validators.len(2,15)],
        username: [Validators.required(), Validators.pattern('^[A-Z a-z{5}'), Validators?.len(5,15)],
        password: [Validators.required(), Validators.pattern('^[A-Z a-z]{8}'), Validators.len(2,15)],
        content: [Validators.required(), Validators?.len(4,512)],
        imageUrl: [Validators.required(), Validators.pattern('^(ftp|http|https):\/\/[^ "]+$')],
    },
    postFormErrors: [],
    postFormState: {}
}