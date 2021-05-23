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
        if (user) {
            this._storage.setItem('current_user', JSON.stringify(user))
            this._user = new User({ ...user });
        }
        else {
            this._storage.removeItem('current_user');
            this._user = new User(null);
        }
    }
}

const globalData = new GlobalData();
export default globalData;
