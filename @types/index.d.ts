declare function JQ(name:string):{
    name:string,
    age:number,
    haha:string
}
declare global{
    interface String{
        haha():string
    }
}
declare const fn:number
export  = fn
// export const haha:string
// export interface hehe{}
// export function heihei(name:string):void