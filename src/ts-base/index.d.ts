import React from "react";

export type Nullable<T> = T | null;
export type Voidable<T> = T | null | undefined

export interface IComponentBaseProps{
    className?: string;
    style?: React.CSSProperties | undefined;
    onClick?: React.MouseEventHandler<HTMLSpanElement> | undefined;
}

export interface IApiServer{
    url:string[] | string,
    enable:boolean,
}

export interface IOptionsItem{
    label:string,
    value:string | number
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
