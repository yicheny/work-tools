import {useCallback, useEffect, useState} from "react";
import {Api} from "../../base";
import {Nullable} from "../../ts-base";
import _ from 'lodash';

type RequestType = 'get' | 'post';

export function useDoFetch(requestType:RequestType,url?:string,params?:any){
    const [data,setData] = useState<any>();
    const [loading,setLoading] = useState<boolean>(false);

    const doFetch = useCallback(async (url:string,params?:any)=>{
        setLoading(true);
        const result:unknown = await Api[requestType](url,params);
        setData(_.get(result,'data'));
        setLoading(false);
    },[requestType])

    useEffect(()=>{
        url && doFetch(url,params);
    },[url,params,doFetch]);

    return {data,loading,doFetch};
}

export function useGet(url?:string){
    return useDoFetch('get',url);
}

export function usePost(url?:string,params?:any){
    return useDoFetch('post',url,params);
}
