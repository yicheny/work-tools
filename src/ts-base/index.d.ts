export type Nullable<T> = T | null;
export type Voidable<T> = T | null | undefined

export interface IApiServer{
    url:string[] | string,
    enable:boolean,
}

export interface IExtendsSettings{
    api_server?:IApiServer
}

export interface IRequestResult{
    code:number,
    message:string,
    data:Nullable<Object>
}

declare global {
    interface Window{
        extends_settings:IExtendsSettings
    }
}
