import { Questions } from "./posts.model";
import { Todo } from "./todo.model";

export type IdType = number | undefined

export type Identifiable<K> = { id: K }

export interface ImageData {
  uri: string;
  localUri?: string;
  format?: string;
  width?: number;
  height?: number;
}

export enum StatusForQuestion {
  MultipleChoice = 1, MultipleResponse , DragAndDrop
}

export type FormFieldDict<Value> = {
  [field: string]: Value
};

export type Optional<V> = V | undefined

export interface TodoListener {
  (todo: Todo): void;
}

export interface PostListener {
  (post: Questions): void;
}

export type FilterType = StatusForQuestion | undefined;

export interface FilterChangeListener {
  (filter: FilterType): void;
}




