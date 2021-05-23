import {useMemo} from "react";
import {IOptionsItem} from "../../ts-base";

export default function useOptionsAddAll (options:IOptionsItem[]):IOptionsItem[]{
    return useMemo(()=>{
        const head:IOptionsItem[] = [{label:'全部',value:''}];
        return head.concat(options);
    },[options])
}
