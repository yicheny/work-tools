import React, {useCallback, useEffect, useState} from 'react';
import {Button, Table, Card} from 'antd';
import {useOpenInfo} from "../../common/hooks";
import AddModal from "./AddModal";
import {Api} from "../../base";
import {tryExecute} from "../../common/utils";
import moment from 'moment';
import styles from './index.module.scss';
import Selects from "./Selects";
import {IQueryParams} from "./ts-define";
import ApplyDetailModal from "./ApplyDetailModal";

const columns = [
    {title: '姓名', dataIndex: 'name'},
    {title: '日期', dataIndex: 'date', render: (v: string) => moment(v).format('YYYY-MM-DD')},
    {title: '时长', dataIndex: 'duration', render: (v: number) => `${v}天`},
    {title: '备注', dataIndex: 'memo'},
    {title: '录入时间', dataIndex: 'createdAt', render: (v: string) => moment(v).format('YYYY-MM-DD HH:MM:SS')}
]

export default function OvertimeRecord() {
    const {openInfo, setOpenInfo, close} = useOpenInfo();
    const {data, request} = useTableData();
    const [params,setParams] = useState<IQueryParams>({});

    const query = useCallback(()=>request(params),[request,params]);

    useEffect(()=>query(),[query]);

    return <div className={styles.main}>
        <div className={styles.options}>
            <Selects setParams={setParams}/>
            <Button type='primary' onClick={() => setOpenInfo({type: 'add'})}>新增</Button>
        </div>
        <Card title='记录'
              extra={<Button  onClick={() => setOpenInfo({type: 'approvalDetail'})}>申请记录</Button>}>
            <Table scroll={{y: 840}} dataSource={data} columns={columns} pagination={false}/>
        </Card>
        <AddModal visible={openInfo.type === 'add'} close={close} query={query}/>
        <ApplyDetailModal visible={openInfo.type === 'approvalDetail'} close={close} query={query}/>
    </div>
};

function useTableData() {
    const [data, setData] = useState([]);

    const request = useCallback((values?: IQueryParams) => {
        tryExecute(async () => {
            const result: any = await Api.post(`/overtime-record/query`, values);
            setData(result?.data);
        })
    }, [])

    return {data, request};
}
