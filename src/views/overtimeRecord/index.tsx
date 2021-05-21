import React, {useCallback, useState} from 'react';
import {Button} from 'antd';
import {useOpenInfo} from "../../common/hooks";
import AddModal from "./AddModal";
import {Api} from "../../base";
import {tryExecute} from "../../common/utils";

export default function OvertimeRecord() {
   const {openInfo,setOpenInfo,close} = useOpenInfo();
   const {data,query} = useTableData();

    console.log('data',data);
    return <div>
        <Button onClick={query}>查询</Button>
        <Button type='primary' onClick={()=>setOpenInfo({type:'add'})}>新增</Button>
        <AddModal visible={openInfo.type==='add'} close={close}/>
    </div>
};

function useTableData(){
    const [data,setData]  = useState([]);

    const query = useCallback(()=>{
        tryExecute(async ()=>{
           const result:any = await Api.get(`/overtime-record/query`);
           setData(result?.data);
        })
    },[])

    return {data,query};
}
