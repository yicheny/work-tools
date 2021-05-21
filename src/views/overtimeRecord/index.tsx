import React from 'react';
import {Button} from 'antd';
import {useOpenInfo} from "../../common/hooks";
import AddModal from "./AddModal";

export default function OvertimeRecord() {
   const {openInfo,setOpenInfo,close} = useOpenInfo();

    return <div>
        <Button type='primary' onClick={()=>setOpenInfo({type:'add'})}>新增记录</Button>
        <AddModal visible={openInfo.type==='add'} close={close}/>
    </div>
};
