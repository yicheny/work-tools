export type Nullable<T> = T | null;
export type Voidable<T> = T | null | undefined

export interface IExtendsSettings{
    enable:boolean,
    url:string
}

declare global {
    interface Window{
        extends_settings:IExtendsSettings
    }
}
