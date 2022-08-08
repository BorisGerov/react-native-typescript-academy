import { Post } from "./posts.js";
import { Change, FormFieldState, FormState, Status, ValidationConfig, Validators } from "./validate.js";

export interface AppState {
    editedPost: Post | undefined;
    allPosts: Post[],
    postFormValidationConfig: ValidationConfig<Post>,
    postFormErrors: string[],
    postFormState: FormState<Post>
}

export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],
    postFormValidationConfig: {
        title: [Validators.required(), Validators.pattern('^[A-Z a-z]{5}'), Validators.len(4,15)],
        authorId: [Validators.required(), Validators.pattern('^[0-9]{1}'), Validators.len(1,6)],
        content: [Validators.required(), Validators.len(4,25)],
        imageUrl: [Validators.required(), Validators.pattern('^(ftp|http|https):\/\/[^ "]+$')],
        tags: [Validators.required(), Validators.pattern('[a-zA-Z]+([,\s]+[a-zA-Z]+)+')]
    },
    postFormErrors: [],
    postFormState: {}
}