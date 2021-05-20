export type Nullable<T> = T | null;
export type Voidable<T> = T | null | undefined

export interface IApiServer{
    url:string[]
}

export interface IExtendsSettings{
    enable:boolean,
    url:string,
    api_server?:IApiServer
}

declare global {
    interface Window{
        extends_settings:IExtendsSettings
    }
}
