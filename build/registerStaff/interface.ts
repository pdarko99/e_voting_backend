export interface IRegister{
    firstname: string,
    email: string,
    lastname: string,
    password: string,
}

export interface Iformat extends IRegister {
    confirmpassword: string
}