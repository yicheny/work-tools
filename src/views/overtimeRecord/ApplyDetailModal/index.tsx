import React, {useEffect, useState} from 'react';
import {Modal} from "antd";
import {Api} from "../../../base";
import {tryExecute} from "../../../common/utils";

function ApplyDetailModal(props:{visible:boolean,close:()=>void,query:()=>void}) {
    const {visible,close,query} = props;
    const record = useApplyRecord();

    console.log('record',record)
    return <Modal title='申请记录' visible={visible} onOk={close} onCancel={close} footer={null}>

    </Modal>
}

export default ApplyDetailModal;

function useApplyRecord(){
    const [data,setData] = useState();

    useEffect(()=>{
        tryExecute(async ()=>{
            const res:any = await Api.post('/overtime-apply-record/query');
            setData(res.data);
        })
    },[]);

    return data;
}
