import {message} from "antd";

export default async function tryExecute(callback: () => any){
    try{
        return await callback();
    }catch (e){
        message.error(e.Message || e.message)
    }
}
