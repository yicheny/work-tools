import {Nullable} from "../ts-base";

interface IUser{
    uuid?:string,
    authority?:number,
}

export default class User{
    private readonly _authority:number;
    private readonly _uuid:string;
    private readonly _isNull:boolean;

    constructor(props:Nullable<IUser>) {
        this._isNull = props === null;
        this._authority = props?.authority || 0;
        this._uuid = props?.uuid || '';
    }

    get authority(){
        return this._authority;
    }

    get uuid(){
        return this._uuid;
    }

    get isNull(){
        return this._isNull;
    }

    get isManager():boolean{
        return this.authority > 2;
    }
}
