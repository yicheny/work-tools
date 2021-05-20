import {Nullable} from "../ts-base";

interface IUser{
    uuid?:string,
}

class GlobalData{
    private _user:Nullable<IUser> = null;
    private _storage = sessionStorage;

    get User():Nullable<IUser>{
        if (this._user === null) {
            const str = this._storage.getItem('current_user');
            if (str) this._user = JSON.parse(str);
        }
        return this._user;
    }

    set User(user) {
        if (user) {
            this._storage.setItem('current_user', JSON.stringify(user))
            this._user = { ...user };
        }
        else {
            this._storage.removeItem('current_user');
            this._user = null;
        }
    }
}

const globalData = new GlobalData();
export default globalData;
