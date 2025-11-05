export interface ResponseItem<T>{
    items:T[]
    last:boolean
    totalPages:number
    totalElement:number
}