import { useCallback, useState } from "react";

interface IOpenInfo{
    type?:string,
    data?:any
}

export default function useOpenInfo(defaultValue:IOpenInfo={}){
    const [openInfo,setOpenInfo] = useState(defaultValue);

    const close =  useCallback(()=>{
        setOpenInfo({});
    },[]);

    return {openInfo,setOpenInfo,close};
}
