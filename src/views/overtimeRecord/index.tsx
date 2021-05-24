import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card} from 'antd';
import {useOpenInfo} from "../../common/hooks";
import AddModal from "./AddModal";
import {Api, globalData} from "../../base";
import {tryExecute} from "../../common/utils";
import styles from './index.module.scss';
import Selects from "./Selects";
import {IQueryParams} from "./ts-define";
import ApplyDetailModal from "./ApplyDetailModal";
import {RecordTable} from "./RecordTable";

export default function OvertimeRecord() {
    const {openInfo, setOpenInfo, close} = useOpenInfo();
    const {data, request} = useTableData();
    const [params, setParams] = useState<IQueryParams>({});

    const query = useCallback(() => request(params), [request, params]);

    useEffect(() => query(), [query]);

    return <div className={styles.main}>
        <div className={styles.options}>
            <Selects setParams={setParams}/>
            <AddButton setOpenInfo={setOpenInfo}/>
        </div>
        <Card title='记录' extra={<ApplyDetailButton setOpenInfo={setOpenInfo}/>}>
            <RecordTable data={data}/>
        </Card>
        <AddModal visible={openInfo.type === 'add'} close={close} refresh={query}/>
        <ApplyDetailModal visible={openInfo.type === 'applyDetail'} close={close} refresh={query}/>
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

function ApplyDetailButton(props: { setOpenInfo: (arg0: { type: string; }) => void; }) {
    return <Button onClick={() => props.setOpenInfo({type: 'applyDetail'})}>申请记录</Button>
}

function AddButton(props: { setOpenInfo: (arg0: { type: string; }) => void; }) {
    return <Button type='primary' onClick={() => props.setOpenInfo({type: 'add'})}>
        {globalData.User.isManager ? '新增' : '申请'}
    </Button>
}
