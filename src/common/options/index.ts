import {useMemo} from "react";

export function useWorkerNameOptions(){
    return useMemo(()=>['杨吕锋','李培锋','王少辉','朱培宇','田运通'].map(x=>({label:x,value:x})),[]);
}

export function useWorkDurationOptions(){
    return useMemo(()=>{
        return  [
            {label:'整天(8小时以上)',value:1},
            {label:'半天(4小时以上)',value:0.5},
        ]
    },[])
}
