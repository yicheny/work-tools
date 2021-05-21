import Axios, {AxiosInstance, AxiosRequestConfig, CancelToken, CancelTokenSource, Method} from "axios";
import _ from 'lodash';
import { globalData } from "./index";
import {Exception} from "./index";
import {IRequestResult, Nullable, Voidable} from "../ts-base";

window.extends_settings = {
    api_server:{
        enable:true,
        url:""
        // url:'api' //目前将http-proxy-middleware配置改为了package.json的proxy处理
    }
}

type cancel = CancelToken | true | undefined;

class API{
    static servers:Voidable<AxiosInstance[]> = undefined;

    static init() {
        API.servers = null;
        const settings = window.extends_settings;
        if (_.get(settings,'api_server.enable')) {
            if (_.isArray(settings?.api_server?.url)) {
                API.servers = _.map(settings?.api_server?.url, o => {
                    const server:AxiosRequestConfig = { baseURL: o.trim() };
                    return Axios.create(server);
                })
            } else{
                const server:AxiosRequestConfig = { baseURL: settings?.api_server?.url };
                API.servers = [Axios.create(server)];
            }
        }

    }

    private readonly index:number;
    private axios:Nullable<AxiosInstance>;
    private source:CancelTokenSource

    constructor(index:number) {
        this.index = index;
        this.axios = null;
        this.source = Axios.CancelToken.source();
    }

    private _ensureAxios() {
        if (API.servers === undefined)
            API.init();
        if (API.servers === null || API.servers?.length === 0)
            throw new Exception(Exception.SYSTEM, -2, '服务器未正确设置。');
        if (_.get(API,'servers.length') <= this.index)
            throw new Exception(Exception.SYSTEM, -3, '指定的服务器设置不正确。');
        if (this.index < _.get(API,'servers.length'))
            this.axios = _.get(API.servers,`${this.index}`);
    }

    private static _isStandardData(d:IRequestResult){
        if(!_.isPlainObject(d)) return false;
        return !(!d.hasOwnProperty('code') || !d.hasOwnProperty('message'));
    }

    private _request(method:Method,url:string,data?:any,onUploadProgress?:(progressEvent: any) => void,cancel?:cancel){
        return new Promise(async (resolve,reject)=>{
            const setConfigCancelToken = (config:AxiosRequestConfig) => {
                if (cancel === undefined || cancel === true){
                    config.cancelToken = this.source.token;
                } else {
                    config.cancelToken = cancel;
                }
            }

            try{
                this._ensureAxios();
                const config = { method, url, data, onUploadProgress, headers:{
                        uuid:globalData.User?.uuid,
                        xorigin:window.location.origin
                    } }
                setConfigCancelToken(config);
                const res:IRequestResult = (await _.get(this,'axios.request'))(config).data;
                if(!API._isStandardData(res)) {
                    return reject(new Exception(Exception.API,-1,'返回的数据结构不正确',url))
                }
                if(res.code === 0) {
                    return resolve(res);
                }
                if(res.code === 2007){
                    globalData.User = null;
                    sessionStorage.setItem("user-session-expired", "1");
                    window.location.reload();
                }
                return reject(new Exception(Exception.API,res.code,res.message,url));
            }catch (e){
                reject(new Exception(Exception.API,_.get(e,'request.status'),`HttpRequest Error：${e.message}`,url));
            }
        })
    }

    download(url:string){
        let href = '';
        addPrefix();
        addUuid();

        const link = document.createElement('a');
        link.href = href;
        link.click();

        function addPrefix(){
            if (url.startsWith('/')){
                href = href + url;
            }
            else{
                href = href + '/' + url;
            }
        }

        function addUuid(){
            if (href.indexOf('?') < 0){
                href = href + `?uuid=${globalData.User?.uuid}`;
            }
            else{
                href = href + `&uuid=${globalData.User?.uuid}`;
            }
        }
    }

    get(url:string,cancel?:cancel){
        return this._request('get',url,undefined,undefined,cancel);
    }

    post(url:string,
         params?:any,
         onUploadProgress?:(progressEvent: any) => void,
         cancel?:cancel){
        return this._request('post',url,params,onUploadProgress,cancel)
    }

    put(url:string, params?:any, cancel?:cancel) {
        return this._request('put', url, params, undefined, cancel);
    }

    delete(url:string, params?:any, cancel?:cancel) {
        return this._request('delete', url, params, undefined, cancel);
    }

    cancelTokenSourceFor() {
        return Axios.CancelToken.source();
    }
}

const api = new API(0);
export default api;
