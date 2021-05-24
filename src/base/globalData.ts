import User from "./User";

class GlobalData{
    private _user:User = new User(null);
    private _storage = sessionStorage;

    get User():User{
        if (this._user.isNull) {
            const str = this._storage.getItem('current_user');
            if (str) this._user = new User(JSON.parse(str));
        }
        return this._user;
    }

    set User(user) {
        if (user.isNull) {
            this._storage.removeItem('current_user');
            this._user = new User(null);
        }
        else {
            this._storage.setItem('current_user', JSON.stringify(user))
            this._user = new User({ ...user });
        }
    }
}

const globalData = new GlobalData();
export default globalData;
