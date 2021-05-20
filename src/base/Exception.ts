import {Voidable} from "../ts-base";

export default class Exception{
    static SYSTEM = "SYSTEM";
    static API = "API";

    _type:string;
    _code:number;
    _message:string;
    _url:Voidable<string>;

    constructor(type:string,code:number,message:string,url?:Voidable<string>) {
        this._type = type;
        this._code = code;
        this._message = message;
        this._url = url;
    }

    get Url(){
        return this._url;
    }

    get Code(){
        return this._code;
    }

    get Message(){
        return this._message;
    }

    get Type(){
        return this._type;
    }

    get Text(){
        return `[${this._code} ${this._message}`;
    }
}
