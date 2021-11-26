export interface IRegister{
    fullname: string;
    email: string,
    password?: string,
}

export interface Iformat extends IRegister {

        confirmPassword?: string,
   
}