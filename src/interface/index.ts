export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  state: string;
  city: string;
  urlImage: string;
  total: number;
  streak: number;
  created_date: Date;
  praies?: Pray[];
}

export interface Pray {
    id: number
    id_user:number
    user?: User
    date: Date
}