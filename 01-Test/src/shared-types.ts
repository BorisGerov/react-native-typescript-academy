export type IdType = number | undefined

export type formFieldDict<Value> = { 
    [key: string]: string
}
export type Optional<V> = V | undefined