export interface User {
    id:number
    name:string
    email:string
    age:number
    city:string
    total:number
    streak:number
    created_date:Date
    praies?: Pray[]
}

export interface Pray {
    id: number
    id_user:number
    user?: User
    date: Date
}