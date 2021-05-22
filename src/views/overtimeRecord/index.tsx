import React, {useCallback, useEffect, useState} from 'react';
import {Button,Table,Card} from 'antd';
import {useOpenInfo} from "../../common/hooks";
import AddModal from "./AddModal";
import {Api} from "../../base";
import {tryExecute} from "../../common/utils";
import moment from 'moment';
import styles from './index.module.scss';

const columns = [
    {title:'姓名',dataIndex:'name'},
    {title:'日期',dataIndex:'date',render:(v:string)=>moment(v).format('YYYY-MM-DD')},
    {title:'时长',dataIndex:'duration',render:(v:number)=>`${v}天`},
    {title:'备注',dataIndex:'memo'},
    {title:'录入时间',dataIndex: 'createdAt',render:(v:string)=>moment(v).format('YYYY-MM-DD HH:MM:SS')}
]

export default function OvertimeRecord() {
   const {openInfo,setOpenInfo,close} = useOpenInfo();
   const {data,query} = useTableData();

    return <div className={styles.main}>
        <div className={styles.options}>
            <Button onClick={query}>查询</Button>
            <Button type='primary' onClick={()=>setOpenInfo({type:'add'})}>新增</Button>
        </div>
        <Table scroll={{ y: 840 }} dataSource={data} columns={columns} pagination={false}/>
        <AddModal visible={openInfo.type==='add'} close={close} query={query}/>
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

    useEffect(()=>query(),[query]);

    return {data,query};
}
