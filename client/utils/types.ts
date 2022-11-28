export interface Address{
  house: string,
  street: string,
  area: string,
  city: string,
  state: string,
  country: string,
}

export interface CreateUser{
  email: string,
  name: string,
  password: string,
  passwordConfirm: string,
}

export interface LogIn{
  email: string,
  password?: string,
  name?: string,
  oAuth?: boolean,
  img?: string
}

export interface User extends CreateUser{
  createdAt: Date,
  img: string,
  isAdmin: boolean,
  updatedAt: Date,
  _id: string,
  address: Address
}

export interface Product{
  category: string[],
  color: string[],
  createdAt?: Date,
  desc: string,
  img: string,
  inStock?: boolean,
  price: number,
  size: string[],
  title: string,
  updatedAt?: Date,
  user?: User,
  _id?: string,
}

export interface Products{
  product: Product,
  _id: string
}[]

export interface ProductWithDetails{
  product: Product,
  id: string
}

export interface ProductWithQuantity{
  product: Product,
  _id: string,
  quantity: number
}

export interface ProductsWithQuantity extends Products{
  quantity: number
}[]

export interface Cart{
  _id : string,
  userId: string,
  products: Products[]
}

export interface AuthState{
    cart: null |  Cart,
    user: null | User,
    products: null | Products[],
    total: null | number,
    accessToken: null | string,
}

export interface State{
  auth: AuthState
}

export interface Order{
  address: Address,
  amount: number,
  createdAt: Date,
  products: Products[],
  status: string,
  updatedAt: Date,
  user: User,
  _id: string
}

export interface UpdateUser{
  name: string,
  email: string,
  password: string, 
  img: string,
}

export interface UpdateAddress{
  address: Address
}